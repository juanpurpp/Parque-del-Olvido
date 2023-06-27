import {useReducer} from 'react'

import { CrudTable } from '../components/CrudTable';
import useCrud from '@/hooks/useCrud';
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

const CrudTableExample = () =>{
    const [items, add,edit,deleteSelected, editSelected] = useCrud(initialItems, 'codigo');
    return <CrudTable title="Empresas" description="Empresas que funcionan con nosotros."
        items={items} headers={headers} keys={keys} id="codigo"
        onAdd={(added)=>{
          add(added)
        }}
        onDeleteSelected ={(selected)=>{
          deleteSelected(selected)
        }}
        onEditSelected = {(changes,oldValues)=>{
          editSelected(changes, oldValues)
        }}
        onEdit = {(updated,old)=>{
          edit(updated,old)
        }}
        />
}

export default CrudTableExample