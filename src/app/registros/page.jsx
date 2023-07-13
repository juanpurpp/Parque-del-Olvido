"use client";
import  CrudTable  from '@/components/CrudTable'
import { useQuery, useMutation } from "react-query";
import api from '@/services/api'
import useCrud from '@/hooks/useCrud';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState } from 'react';
import Filters from '@/components/Filters';

const headers=['Nombre', 'Edad', 'Género', 'Dirección', 'Causa de muerte', 'Estado Civil', 'Fecha de ceremonia', 'Tipo de ceremonia','Tipo de servicio',  'Religión']
const keys=   ['name', 'age', 'gender', 'address', 'death_cause', 'civil_status', 'ceremony_date','ceremony_type', 'service',  'religion'];

const {POST, GET, DELETE, PUT} = api('/api/registros')
const filtered = api('/api/registros/byFilter')
export default function page () {
  const [filters, setFilters] = useState({})
  const {data, isLoading } = useQuery( ['get-registros',filters],async()=>{
    console.log(filters)
    return await filtered.POST(filters)
  }
  );
  const create = useMutation(POST)
  const del = useMutation(DELETE)
  const update = useMutation(PUT)
  if(isLoading) return <LoadingSpinner/>
  //const [items, add,edit,deleteSelected, editSelected] = useCrud(initialItems, 'name');
  return (<>
    <CrudTable title="Difuntos" description="Difuntos que han pasado a un mejor lugar"
      items={data.data} headers={headers} keys={keys} id="name"
      onAdd={async (added)=>{
        create.mutate({document: added})
      }}
      onDeleteSelected ={(selected)=>{
        selected.forEach(item=> del.mutate({target: item.name}))
      }}
      onEditSelected = {(changes,oldValues)=>{
      }}
      onEdit = {(updated,old)=>{
        update.mutate({target:old, document:updated})
      }}
      />
      <Filters titles={headers} fields={keys} setFilters={setFilters} filters={filters}></Filters>
    </>
   ) 
}
