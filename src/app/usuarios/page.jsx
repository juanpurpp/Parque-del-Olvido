"use client";

import CrudTable from '@/components/CrudTable'
import useCrud from '@/hooks/useCrud'
import InviteUser from '@/components/InviteUser'
import api from '@/services/api'
import { useMutation, useQuery } from 'react-query';
import LoadingSpinner from '@/components/LoadingSpinner';
const initialItems = [
	{email: 'primero@gmail.com', rol: 'Administrador'},
	{email: 'segundo@gmail.com', rol: 'Lector'}

]
const headers = ['Correo electrónico','Rol']
const keys = ['email', 'rol']
const {POST, GET, DELETE, PUT} = api('/api/usuarios')
const page = () => {

  const {data,isLoading} = useQuery(['get-usuarios'],GET)
  const post = useMutation(POST)
  const put = useMutation(PUT)
  const del = useMutation(DELETE)
  if(isLoading) return <LoadingSpinner/>
  return (
    <div>
      <CrudTable title="Usuarios" description="Usuarios con permisos"
        items={data.data} headers={headers} keys={keys} id="email" disableAdd
        onAdd={(added)=>{
          post.mutate({document:added})
        }}
        onDeleteSelected ={(selected)=>{
          selected.map(item=>del.mutate({target:item.email }))
        }}
        onEditSelected = {(selected)=>{
          console.log('selected:',selected)
        }}
        onEdit = {(updated,old)=>{
          put.mutate({target:old, document:updated})
        }}
       />
      <InviteUser></InviteUser>
    </div>
  )
}

export default page