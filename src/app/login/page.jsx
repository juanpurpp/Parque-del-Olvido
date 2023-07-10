"use client";

import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
export default function Page() {
  const formik = useFormik({
    initialValues: {
      password:'',
      email: '',
    },
    validationSchema:Yup.object().shape({
      email:Yup.string().email('Debe ser un email válido')
      .required('Se necesita una correo electrónico.') ,
      password: Yup.string()
      .required('Se necesita una contraseña.') 
      .min(4, 'Debe ser una contraseña de almenos 4 carácteres'),
    }),
    onSubmit:(values, actions) => { console.log(values)}
  });
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20"
            src="/Logo_black.svg"
            alt="Parque del Olvido"
          />Cruz
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresar a la aplicación
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo eléctronico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Olvidó la contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {Object.keys(formik.errors).length > 0 && <p className='text-red-600'>{formik.errors[Object.keys(formik.errors)[0]]}</p>}
            <div>
              <a href="/">
              <button
                disabled={Object.keys(formik.errors).length > 0}
                type="submit"
                className="flex w-full disabled:bg-red-400 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
  