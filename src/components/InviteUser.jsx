import React, { useState } from 'react'
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { useMutation, useQuery } from 'react-query'
import api from '@/services/api'
const {POST} = api('/api/invite')
const InviteUser = () => {
	const [url, setUrl] = useState('')
	const [email, setEmail]= useState('')
	const {mutate} = useMutation(POST,{
		onSuccess:(data)=> setUrl(window.location.origin+"/register?token="+data.data.token+"&email="+email),
		onError:(err)=>console.error(err)
	})
  return (
    <div className='text-black sm:w-full md:w-2/3'>
			<h2 className="block text-lg font-medium py-2 leading-6 text-indigo-950">
				Añadir un usuario
			</h2>
			<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Correo electrónico
      </label>
			<div className='flex flex-row'>
				<div className="relative m-1 rounded-md shadow-sm basis-3/5">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
					</div>
					<input
						type="email"
						name="email"
						id="email"
						className=" w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="usuario@ejemplo.com"
						onChange={event=> setEmail(event.target.value)}
					/>
				</div>
				<button
        type="button"
        className="inline-flex justify-self-end items-center border-2 border-indigo-200 rounded-md my-1 bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
				onClick={()=>mutate({email:email})}
				>
					<PaperAirplaneIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
					Invitar usuario
				</button>
			</div>
			{
				url || url!==''
					? <label htmlFor='invite ' className='h-fit' >
							<div className='max-w-full flex flex-wrap '>
								<a id="invite" target="_blank" href={url} rel="noopener noreferrer" className="h-fit flex flex-wrap break-all w-fit flex-wrap justify-self-end items-center border-2 border-indigo-200 rounded-md my-1 bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
									{url}
								</a>
							</div>
						</label>
					: <></>
			}
    </div>
  )
}

export default InviteUser