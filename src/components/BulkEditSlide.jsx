import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon , plus} from '@heroicons/react/24/outline'
import { useFormik} from "formik";
import * as Yup from "yup";
import { PencilIcon, PlusIcon } from '@heroicons/react/20/solid';
export default function BulkEditSlide({open, setOpen, fields, keys, onSubmit, old, id, setIndeterminate,setChecked,checkbox,setSelectedItems, selectedItems}) {
  const [activated, setActivated] = useState([])
  const formik = useFormik({
    initialValues: keys.reduce((o, key) => key!==id ? { ...o, [key]: ''} : {...o}, {}) ,
    validationSchema: Yup.object(
      keys.reduce((o, key) => !activated.includes(key) ? { ...o, [key]: Yup.string().test("", 'No pueden haber campos vacios', value=> activated.includes(key) ? value!=="" : true )} : {...o}, {}) 
    ),
    onSubmit:(values, {resetForm})=>{
      const cleaned = Object.entries(values).reduce((o, value)=> value[1]!=="" ? {...o, [value[0]]: value[1]} : o, {}) // clean non-changed fields
      onSubmit(cleaned,old)
      resetForm()

			setSelectedItems(selectedItems.filter(item => !old.includes(item)))
			setIndeterminate(selectedItems.length > 0 )		
			checkbox.current.indeterminate= selectedItems.length > 0
			setChecked(false)
			setOpen(false) 
      setActivated([])
    },
  })
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative  overflow-auto z-50" onClose={setOpen}>
        <div className="fixed inset-0 overflow-auto">
          <div className="absolute inset-0 overflow-auto">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                
                <Dialog.Panel className={`pointer-events-auto w-screen max-w-md  border-2 border-l-gray-200 relative )}`}>
                
                  <div  className="flex  h-full flex-col divide-y divide-gray-200 bg-gray-100  shadow-xl">
                    <form onSubmit={formik.handleSubmit} >
                      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto  py-6">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className=" inline-flex text-base font-semibold leading-6 text-gray-900">
                                  <PencilIcon className="self-center mx-1 h-[1rem]"/>
                                  Editar seleccionados          
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only">Cerrar</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex flex-col mt-6 flex-1 px-4 sm:px-6  p-2">							
                          {fields.map(
                            (field, index) => 
                            keys[index] !== id 
															?
																<div className='m-2' key={field}>
                                  <div className="flex flex-row items-center">
                                    <input
                                      type="checkbox"
                                      onChange={
                                        (event)=> event.target.checked 
                                          ? setActivated(activated.concat(keys[index]))
                                          : setActivated(activated.filter(key=>key!==keys[index]))
                                      }
                                      className="ml-1 mr-2 rounded-sm border-gray-300 text-indigo-600"
                                    />
                                    <label htmlFor={keys[index]} className="block text-sm font-medium leading-6 text-gray-900">
                                      {field}
                                    </label>
                                  </div>
																	<div className="mt-1">
                                    {
                                    activated.includes(keys[index])
                                      ? <input
                                        type="text"
                                        name={keys[index]}
                                        id={keys[index]}
                                        onChange={formik.handleChange}
                                        value={formik.values[keys[index]]}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder={ 'Rellene para '+ field }
                                        />
                                      : <></>
                                      
                                    } 
																	</div> 
																</div> 
															:
															<div key={field}></div>
                          )}
                        </div>
                        <div className="flex p-2 items-center justify-center">
                          {activated.includes(Object.keys(formik.errors)[0])
                          ? <p className='text-red-900'> No pueden haber campos vacios</p>
                          : <></>} 
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                          onClick={() => setOpen(false)}
                        >
                          Salir
                        </button>
                        <button
                          type="submit"
                          disabled={activated.length===0}
                          className="disabled:bg-zinc-300 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          Editar seleccionados
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

