import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useRef, useState, useLayoutEffect} from 'react'
import Slide from './Slide.jsx'
import BulkEditSlide from './BulkEditSlide.jsx'
const Headers = ({titles, items, checkbox, checked, toggleAll, action, lector}) => {
	const cols=titles.map( (title,index) =>
		<th key={index} scope="col" className="min-w-[4rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
			{title}
		</th>
	)
	cols.unshift(
    <th key="first" scope="col" className="relative px-5 sm:w-12 sm:px-3">
    <input
      type="checkbox"
      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      ref={checkbox}
      checked={checked}
      onChange={toggleAll}
    />
  </th>
	)
	cols.push(
		<th key="last" scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
			<span  className="sr-only">Editar</span>
		</th>
	)
  return(
    <thead>
      <tr>
        {cols}
      </tr>
    </thead>
  )
}
const Items = ({items, id, selectedItems, setSelectedItems,old,action,setOpen, lector}) => {
    const rows = items.map(
      (item) =>{ //item is one item that correspond to one row of the table
        const row = Object.entries(item).map(
          (entries, index) => //entries are [key, value] of the current ite
            index===0  ? 
              <td key={entries[0]}
                className={classNames(
                  'whitespace-nowrap py-3 pr-2 text-sm font-medium',
                  selectedItems.includes(item) ? 'text-indigo-600' : 'text-gray-900'
                )}
              >
              {entries[1]}
              </td> :
              <td key={entries[0]} className="whitespace-nowrap px-3 py-3 text-sm text-gray-500">{entries[1]}</td>
        )
        row.unshift(
          <td key="first" className="relative px-7 sm:w-12 sm:px-6">
              {selectedItems.includes(item) && (
                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
              )}
              
              <input
                data-testid={"checkbox-"+item[id]}
                id={"checkbox-"+item[id]}
                type="checkbox"
                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                value={item[id]}
                checked={selectedItems.includes(item)}
                onChange={(e) =>
                  setSelectedItems(
                    e.target.checked
                      ? [...selectedItems, item]
                      : selectedItems.filter((p) => p !== item)
                  )
                }
              />
            </td>
        )
        row.push(
          <td key="last" className="whitespace-nowrap py-2 pl-2 pr-2 text-right text-sm font-medium sm:pr-1 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">
            <button disabled={lector} 
            onClick={()=>{
              action.current='Editar'
              old.current=item
              setOpen(true)
              
            }} 
            className="link text-indigo-600 hover:text-indigo-900 hover:bg-blue-50 rounded-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
            >
              <div className="flex flex-row  ">
                <PencilSquareIcon className="h-5 mx-1 aspect-square" />
                <p>Editar</p>
              </div>
              <span className="sr-only">, {item[Object.keys(item)[0]]}</span>
            </button>
          </td>
        )
        return  <tr className="hover:bg-indigo-50 hover:ring-indigo-100 hover:ring-[1px]" key={item[id]}>{row}</tr>
                
      }
    )
    
    return(
        <tbody className='overflow-x-auto'>
            {rows}
        </tbody> 
    )
}
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
export default function CrudTable ({title, description, items, disableAdd=false, headers, keys=headers, id, onAdd, onEdit, onEditSelected, onDeleteSelected, lector}) {
    const [open, setOpen] = useState(false)
    const [bulkEditOpen, setBulkEditOpen] = useState(false) 
    const checkbox = useRef()
    const [checked, setChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const action = useRef('Añadir')
    const old = useRef({})
    useLayoutEffect(() => {
      const isIndeterminate = selectedItems.length > 0 && selectedItems.length < items.length
      setChecked(items.length === 0 ? false :selectedItems.length === items.length)
      setIndeterminate(isIndeterminate)
      checkbox.current.indeterminate = isIndeterminate
    }, [selectedItems])
  
    function toggleAll() {
      setSelectedItems(checked || indeterminate ? [] : items)
      setChecked(!checked && !indeterminate)
      setIndeterminate(false)
    }
  return (
   
    
    <div className="px-4 sm:px-6 lg:px-8 ">
      
      <div className="sm:flex sm:items-center ">
        
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {description}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          {!disableAdd&&
            <button
            data-testid="add-button"
              type="button" disabled={lector} 
              className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white
              text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={()=>{
                
                action.current='Añadir'
                old.current={}
                setOpen(true)
              }}
            >
              Añadir
            </button>
          }
        </div>
      </div>
      <Slide open={open} setOpen={setOpen} fields={headers} keys={keys}
      onSubmit={action.current==='Añadir'?onAdd:onEdit} action={action.current} old={old.current} id={id}
      setIndeterminate={setIndeterminate} setChecked={setChecked} checkbox={checkbox} setSelectedItems={setSelectedItems} selectedItems={selectedItems}/>
      <BulkEditSlide open={bulkEditOpen} setOpen={setBulkEditOpen} fields={headers} keys={keys}
      onSubmit={onEditSelected} old={selectedItems} id={id}
      setIndeterminate={setIndeterminate} setChecked={setChecked} checkbox={checkbox} setSelectedItems={setSelectedItems} selectedItems={selectedItems} />
      <div className="mt-8 flow-root">
        <div className="-mx-3 -my-2  sm:-mx-5 lg:-mx-7">
          <div className="inline-block min-w-full py-2 align-middle sm:px-3 lg:px-5">
            <div className="relative">
              {selectedItems.length > 0 && (
                <div className="absolute left-14 top-0 flex h-12 items-center space-x-1 bg-white sm:left-12">
                  <button
                    data-testid="edit-button" disabled={lector} 
                    type="button"
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-indigo-700
                    shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    onClick={()=>setBulkEditOpen(true)}
                  >
                    <PencilIcon className="mr-1 w-[0.875rem] h-[0.875rem]"/>
                    Editar seleccionados
                  </button>
                  <button
                      data-testid="delete-button" disabled={lector} 
                      type="button"
                      className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-red-600
                       shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      onClick={()=>{
                        setSelectedItems([])
                        onDeleteSelected(selectedItems)
                      }}
                  >
                      <TrashIcon className="mr-1 w-[0.875rem] h-[0.875rem]"/>
                      Borrar seleccionados
                  </button>

                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300 my-4 bg-gray-50 border-2 rounded-md border-gray-100 overflow-x-auto">
                <Headers lector={lector}titles={headers} items={items}
                  checkbox={checkbox} checked={checked} toggleAll={toggleAll}/>
                <Items lector={lector} items={items} selectedItems={selectedItems} setSelectedItems={setSelectedItems}
                  id={id} action={action} old={old} setOpen={setOpen}/>
              </table>
              {items.length === 0
                ? <div className=' flex border-2 justify-center items-center m-2'>
                    <p className="place-self-center my-6 text-center text-indigo-950">No hay nada para mostrar
                    </p>
                  </div>
                : <></>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
