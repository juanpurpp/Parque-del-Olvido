import {useReducer} from 'react'

import { CrudTable } from '../components/CrudTable';
const initialItems = [
    {
      nombre: 'Acme Corporation',
      codigo: 'A1',
      estado: 'Disponible'
    },
    {
      nombre: 'BigCo',
      codigo: 'B2',
      estado: 'Pausa'
    },
    {
      nombre: 'Innovative Solutions',
      codigo: 'C3',
      estado: 'Activo'
    },
    {
      nombre: 'TechGurus',
      codigo: 'D4',
      estado: 'Disponible'
    },
    {
      nombre: 'Global Enterprises',
      codigo: 'E5',
      estado: 'Pausa'
    },
    {
      nombre: 'FutureTech',
      codigo: 'F6',
      estado: 'Activo'
    },
    {
      nombre: 'Digital Vision',
      codigo: 'G7',
      estado: 'Pausa'
    },
    {
      nombre: 'Creative Minds',
      codigo: 'H8',
      estado: 'Disponible'
    },
    {
      nombre: 'NexGen Solutions',
      codigo: 'I9',
      estado: 'Activo'
    },
    {
      nombre: 'Infinity Technologies',
      codigo: 'J10',
      estado: 'Disponible'
    }
  ];
const headers=['Nombre', 'Código', 'Estado']
const keys=['nombre', 'codigo', 'estado']
const itemsReducer = (state, action) =>{
    switch(action.type){
        case 'ADD':
          const found= state.some(item=> item.codigo===action.new.codigo)
          if(found) alert('El elemento ya está en la lista'); 
          return found ? state : state.concat(action.new)
        case 'DELETE':
            return state.filter((item)=>!action.selected.some((deleted) =>item.codigo ===deleted.codigo ))
        case 'EDIT':
            return state.map((item)=> item.codigo === action.new.codigo?action.new :item)
        case 'EDIT_MULTIPLE':
            return state.map((item)=> action.selected.reduce((prev, current) => item.codigo === current.codigo ? current : prev ,item))
    }
}
const CrudTableExample = () =>{
    const [items, dispatchItems] = useReducer(itemsReducer, initialItems)
    return <CrudTable title="Empresas" description="Empresas que funcionan con nosotros."
        items={items} headers={headers} keys={keys} id="codigo"
        onAdd={(added)=>{
            console.log('added', added)
            dispatchItems({
              type:'ADD',
              new: added
            })
        }}
        onDeleteSelected ={(selected)=>{
            dispatchItems({
                type:'DELETE',
                selected:selected
            })
        }}
        onEditSelected = {(selected)=>{
            selected.forEach((item,index) => item.nombre += index )
            dispatchItems({
                type:'EDIT_MULTIPLE',
                selected:selected
            })
        }}
        onEdit = {(item)=>{
            const newItem = {
                nombre : item.nombre + " edited ",
                codigo: item.codigo,
                estado: item.estado + " editedd "
            }
            dispatchItems({
                type:'EDIT',
                new: newItem,
            })
        }}
        />
}

export default CrudTableExample