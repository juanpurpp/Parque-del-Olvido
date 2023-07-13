import React from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { useFormik } from 'formik'
import { ArrowDownTrayIcon, FunnelIcon, TrashIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
const input = (field, titles, index, formik) =>({
	'rol':  
		<select
			name={field}
			id={field}
			onChange={formik.handleChange}
			value={formik.values[field]}
			className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
	>
			<option></option>
			<option>Administrador</option>
			<option>Lector</option>
		</select>,
	'religion': 
	<><label
	htmlFor={field}
	
	className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
> {titles[index]}</label>
		<select
			name={field}
			id={field}
			onChange={formik.handleChange}
			value={formik.values[field]}
			className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
	>
			<option></option>
			<option>Católico</option>
			<option>Evángelico</option>
			<option>Judaismo</option>
			<option>Islam</option>
			<option>Hindú</option>
			<option>Budista</option>
			<option>Otro</option>
		</select>
		</> ,
	'service':
	<>			
	<label
		htmlFor={field}
		
		className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
	> {titles[index]}</label>
		<select
			name={field}
			id={field}
			onChange={formik.handleChange}
			value={formik.values[field]}
			className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
	>
			<option></option>
			<option>Completo</option>
			<option>Parcial</option>
		</select>
		</>,
	'ceremony_type':
	<>
			<label
			htmlFor={field}
			
			className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
		> {titles[index]}</label>
	<select
		name={field}
		id={field}
		onChange={formik.handleChange}
		value={formik.values[field]}
		className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		>
		<option></option>
		<option>Funeral directo</option>
		<option>Funeral con velorio</option>
		<option>Cremación</option>
		<option>Cremación hindú</option>
		<option>བྱ་གཏོར་ (bya gtor o entierro celestial)</option>
		<option>ososhiki (budismo japonés)</option>
		<option>Otro</option>
	</select>
	</>,
	'ceremony_date':
	<>
		<label
			htmlFor={field}
			
			className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
		> {titles[index]}</label>
		<Datepicker
			i18n={"es"}
			useRange={false} 
			asSingle={true} 
			name={field}
			id={field}
			onChange={(val)=>formik.handleChange({target:{id:field, keys: field, value:val.startDate.toString()}})}
			value={{startDate:formik.values[field], endDate:formik.values[field]}}
			inputClassName=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		
		/>
	</>,
	'civil_status':
	<>
	<label
	htmlFor={field}
	
	className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
> {titles[index]}</label>
	<select
		name={field}
		id={field}
		onChange={formik.handleChange}
		value={formik.values[field]}
		className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		>
		<option></option>
		<option>Soltero</option>
		<option>Casado</option>
		<option>Viudo</option>
	</select>
	</>,
	'age':
	<>
		<label
			htmlFor={field}
			
			className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
		> {titles[index]}</label>
		<input
			type="number"
			name={field}
			id={field}
			onChange={formik.handleChange}
			value={formik.values[field]}
			className="max-w-sm w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		/>
	</>
	,
	'gender':
	<>
			<label
			htmlFor={field}
			
			className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
		> {titles[index]}</label>
	<select
		name={field}
		id={field}
		onChange={formik.handleChange}
		value={formik.values[field]}
		className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
	>
		<option></option>
		<option>Masculino</option>
		<option>Femenino</option>
		<option>Otro</option>
		<option>Juan</option>
	</select>
	</>,
	'default':<>
		<label
			htmlFor={field}
			
			className="absolute -top-2 truncate break-all left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
		>
			{titles[index]}
		</label>
		<input
			type="text"
			name={field}
			id={field}
			onChange={formik.handleChange}
			value={formik.values[field]}
			className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			placeholder={titles[index]}
		/>
	</>
})
const Filters = ({titles, fields,setFilters,filters}) => {
	const formik = useFormik({
		initialValues: fields.reduce((o, key) => ({ ...o, [key]: ''} ), {}) ,
		onSubmit: (values)=> {
			console.log('antes', values)
			console.log('despues',Object.entries(values).reduce((prev,entry)=>entry[1]===''?{...prev}:{...prev, [entry[0]]:entry[1]},{}))
			setFilters( Object.entries(values).reduce((prev,entry)=>entry[1]===''?{...prev}:{...prev, [entry[0]]:entry[1]},{}))
			
		}
		})

  return (
    <div className='my-6 '>
			<h2 className="my-4 text-indigo-950 text-lg text-bold">Filtros</h2>
			<form onSubmit={formik.handleSubmit}>
				<button type="submit" className="inline-flex justify-self-end items-center border-2 border-indigo-200 rounded-md my-2 bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
					>Filtrar
					<FunnelIcon className=" h-4 w-4 mx-1" aria-hidden="true" />	
				</button>
				<button
					type="button"
					className="inline-flex justify-self-end items-center ml-2 border-2 border-red-200 rounded-md my-1 bg-red-50 px-2 py-1 text-xs font-semibold text-red-900 shadow-sm hover:bg-red-100"
					onClick={()=>{setFilters({})
						formik.resetForm()
					}}
					>
						Limpiar filtros
					<TrashIcon className=" h-4 w-4 mx-1" aria-hidden="true" />
				</button>
				<button
					type="button"
					className="inline-flex justify-self-end items-center ml-2 border-2 border-green-500 rounded-md my-1 bg-green-150 px-2 py-1 text-xs font-semibold text-green-900 shadow-sm hover:bg-green-300"
					onClick={()=>axios.post('/api/registros/asExcel',filters, {responseType: 'blob'}).then((response) => {
								// create file link in browser's memory
								const href = URL.createObjectURL(response.data);
						
								// create "a" HTML element with href to file & click
								const link = document.createElement('a');
								link.href = href;
								link.setAttribute('download', 'Registros.xlsx'); //or any other extension
								document.body.appendChild(link);
								link.click();					
								// clean up "a" element & remove ObjectURL
								document.body.removeChild(link);
								URL.revokeObjectURL(href);
						})}
					>
						Descargar excel
					<ArrowDownTrayIcon className=" h-4 w-4 mx-1" aria-hidden="true" />
				</button>
				<div className="relative flex flex-col w-1/3">
					{
						fields.map((field,index)=>
						<div className="relative my-1" key={field}>
							{Object.keys(input(field, titles, index, formik)).includes(field)?input(field, titles, index, formik)[field]:input(field, titles, index, formik)['default']}
						</div>)
					}
				</div>
			</form>
    </div>
  )
}

export default Filters

 