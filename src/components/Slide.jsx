import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon , plus} from '@heroicons/react/24/outline'
import { useFormik} from "formik";
import * as Yup from "yup";
import { PencilIcon, PlusIcon } from '@heroicons/react/20/solid';
import Datepicker from "react-tailwindcss-datepicker";
const fieldInputs=(index, keys, formik, field)=>

 ({
    'rol':  
      <select
        name={keys[index]}
        id={keys[index]}
        onChange={formik.handleChange}
        value={formik.values[keys[index]]}
        className="mt-2 
        block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option></option>
        <option>Administrador</option>
        <option>Lector</option>
      </select>,
    'religion':  
      <select
        name={keys[index]}
        id={keys[index]}
        onChange={formik.handleChange}
        value={formik.values[keys[index]]}
        className="mt-2 
        block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option></option>
        <option>Católico</option>
        <option>Evángelico</option>
        <option>Judaismo</option>
        <option>Islam</option>
        <option>Hindú</option>
        <option>Budista</option>
        <option>Otro</option>
      </select>,
    'service':
      <select
        name={keys[index]}
        id={keys[index]}
        onChange={formik.handleChange}
        value={formik.values[keys[index]]}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option></option>
        <option>Completo</option>
        <option>Parcial</option>
      </select>,
    'ceremony_type':
    <select
      name={keys[index]}
      id={keys[index]}
      onChange={formik.handleChange}
      value={formik.values[keys[index]]}
      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option></option>
      <option>Funeral directo</option>
      <option>Funeral con velorio</option>
      <option>Cremación</option>
      <option>Cremación hindú</option>
      <option>བྱ་གཏོར་ (bya gtor o entierro celestial)</option>
      <option>ososhiki (budismo japonés)</option>
      <option>Otro</option>
    </select>,
    'ceremony_date': 
    <Datepicker
      i18n={"es"}
      useRange={false} 
      asSingle={true} 
      name={keys[index]}
      id={keys[index]}
      onChange={(val)=>formik.handleChange({target:{id:keys[index], keys: keys[index], value:val.startDate.toString()}})}
      value={{startDate:formik.values[keys[index]], endDate:formik.values[keys[index]]}}
      inputClassName="w-full rounded-md border-gray-300 focus:ring-0 font-normal bg-gray-50 text-gray-950"

    />,
    'civil_status':
    <select
      name={keys[index]}
      id={keys[index]}
      onChange={formik.handleChange}
      value={formik.values[keys[index]]}
      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option></option>
      <option>Soltero</option>
      <option>Casado</option>
      <option>Viudo</option>
    </select>,
    'age':
    <input
      type="number"
      name={keys[index]}
      id={keys[index]}
      onChange={formik.handleChange}
      value={formik.values[keys[index]]}
      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
    ,
    'gender':
    <select
      name={keys[index]}
      id={keys[index]}
      onChange={formik.handleChange}
      value={formik.values[keys[index]]}
      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option></option>
      <option>Masculino</option>
      <option>Femenino</option>
      <option>Otro</option>
      <option>Juan</option>
    </select>,
    'default':<input
      type="text"
      name={keys[index]}
      id={keys[index]}
      onChange={formik.handleChange}
      value={formik.values[keys[index]]}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder={ 'Rellene para '+ field }
  />
  })
export default function Slide({open, setOpen, fields, keys, onSubmit, action, old, id, setIndeterminate,setChecked,checkbox,setSelectedItems, selectedItems}) {

  //console.log(old)
  //console.log(rem,'rem')
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: keys.reduce((o, key) => ({ ...o, [key]: ''} ), {}) ,
    validationSchema: Yup.object(
      keys.reduce((o, key) => ({ ...o, [key]: Yup.string().required('No puede haber campos vacios')}), {}) 
    ),
    onSubmit:(values, {resetForm})=>{
      //console.log('dando', old)
      onSubmit(values,old)
      resetForm()
      
      if(action==='Editar'){
        setIndeterminate(true)
        setChecked(false)
        checkbox.current.indeterminate=true
        setSelectedItems(selectedItems.filter((p) => p !== old))
        setOpen(false)
        
      }

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
                
                  <div  className="flex h-screen overflow-y-auto  flex-col divide-y divide-gray-200 bg-gray-100  shadow-xl">
                    <form onSubmit={formik.handleSubmit} >
                      <div className="flex min-h-0 flex-1 flex-col  py-6">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className=" inline-flex text-base font-semibold leading-6 text-gray-900">

                              { action==='Añadir'?
                                  <>
                                  <PlusIcon className="self-center mx-1 h-[1rem]"/>
                                  {action}
                                  </>
                                  :
                                  <>
                                  <PencilIcon className="self-center mx-1 h-[1rem]"/>
                                  {`${action} ${old[id]}`}
                                  </>
                              }
                  
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
                        <div className="relative flex flex-col mt-6 flex-1 px-4 sm:px-6  p-2d">							
                          {fields.map(
                            (field, index) => 
                              <div className='m-2' key={field}>
                                <label htmlFor={keys[index]} className="block text-sm font-medium leading-6 text-gray-900">
                                  {field}
                                </label>
                                <div className="mt-1">
                                  { fieldInputs(index, keys, formik, field)[keys[index]] ?? fieldInputs(index, keys, formik, field)['default']}
                                </div> 
                              </div> 
                          )}
                        </div>
                        <div className="flex p-2 items-center justify-center">
                          {Object.keys(formik.errors).length 
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
                          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                          {action}
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

