"use client";

import { CrudTable } from '@/components/CrudTable'
import useCrud from '@/hooks/useCrud'
import React from 'react'

const initialItems = [
	{email: 'primero@gmail.com', rol: 'Administrador'},
	{email: 'segundo@gmail.com', rol: 'Lector'}

]
const headers = ['Correo electrónico','Rol']
const keys = ['email', 'rol']
const page = () => {
	const [items, add,edit,deleteSelected] = useCrud(initialItems,'email')
  return (
    <CrudTable title="Usuarios" description="Usuarios con permisos"
        items={items} headers={headers} keys={keys} id="email"
        onAdd={(added)=>{
          add(added)
        }}
        onDeleteSelected ={(selected)=>{
          deleteSelected(selected)
        }}
        onEditSelected = {(selected)=>{
          console.log('selected:',selected)
        }}
        onEdit = {(updated,old)=>{
            edit(updated,old)
        }}
        />
  )
}

export default page