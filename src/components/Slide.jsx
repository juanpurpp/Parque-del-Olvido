import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import { useFormik} from "formik";
import * as Yup from "yup";
export default function Slide({open, setOpen, fields, keys, onSubmit}) {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)

  console.log(rem,'rem')
  const formik = useFormik({
    initialValues: fields.reduce((o, field,index) => ({ ...o, [keys[index]]: ''}), {}) ,
    validationSchema: Yup.object(
      fields.reduce((o, field,index) => ({ ...o, [keys[index]]: Yup.string().required('No puede haber campos vacios')}), {}) 
    ),
    onSubmit:(values, {resetForm})=>{
      resetForm()
      onSubmit(values)
      
    },
    
  })
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="span" className="relative  overflow-auto z-50" onClose={setOpen}>
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
                
                  <div className="flex  h-full flex-col divide-y divide-gray-200 bg-gray-100  shadow-xl">
                    <form onSubmit={formik.handleSubmit} >
                      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto  py-6">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              Añadir
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
                              <div className='m-2' key={field}>
                                <label htmlFor={keys[index]} className="block text-sm font-medium leading-6 text-gray-900">
                                  {field}
                                </label>
                                <div className="mt-1" key={field}>
                                  <input
                                    type="text"
                                    name={keys[index]}
                                    id={keys[index]}
                                    onChange={formik.handleChange}
                                    value={formik.values[keys[index]]}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder={ 'Rellene para '+ field }
                                  />
                                </div> 
                              </div> 
                          )}
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
                          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          Agregar
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

