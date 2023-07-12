"use client";
import {useState} from  'react'
import {Formik} from 'formik'
import * as Yup from 'yup';
import {useSearchParams, useRouter} from 'next/navigation'
import api from '@/services/api'
import {useMutation} from 'react-query'
const {POST} = api('/api/usuarios')
const page = () => {
	const router = useRouter()
	const token = useSearchParams().get('token')
	const email = useSearchParams().get('email')
	const {mutate} =useMutation(async (values)=> await POST(values, {token:token}),
		{
			onSuccess:(data)=>{
				router.push('/login')
			},
			onError:(err)=>console.log(err)
		}
	)
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrate con una contraseña
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<Formik
						initialValues={{ password:'', email:email}}
						validationSchema={Yup.object().shape({
							password: Yup.string()
							.required('Se necesita una contraseña.') 
							.min(4, 'Debe ser una contraseña de almenos 4 carácteres'),
						})}
						onSubmit={(values, actions) => { mutate(values)}}
					>
					{props =>(
						<form className="space-y-6" action="#" method="POST" onSubmit={props.handleSubmit}>
							<div>

								<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
									Correo electrónico
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										disabled
										placeholder={email}
										className="block w-full rounded-md border-0 py-1.5 disabled:bg-slate-300 placehoder:text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
									>
									</input>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
										Contraseña
									</label>
								</div>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										value={props.values.password}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							{props.errors.password && <div id="feedback" className="text-red-600">{props.errors.password}</div>}
							<div>
								<button
									type="submit"
									className="flex w-full disabled:bg-red-300 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									disabled= {props.values.password.length===0 || props.errors.password}
								>
									Registrarse
								</button>
							</div>
						</form>
						)}
						</Formik>
				</div>
      </div>
  )
}

export default page