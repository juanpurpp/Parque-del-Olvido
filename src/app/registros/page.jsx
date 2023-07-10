"use client";
import  CrudTable  from '@/components/CrudTable'
import { useQuery } from "react-query";
import api from '@/services/api'
import useCrud from '@/hooks/useCrud';
import LoadingSpinner from '@/components/LoadingSpinner';

const headers=['Nombre', 'Edad', 'Género', 'Dirección', 'Causa de muerte', 'Estado Civil', 'Fecha de ceremonia', 'Tipo de ceremonia','Tipo de servicio',  'Religión']
const keys=   ['name', 'age', 'gender', 'address', 'death_cause', 'civil_status', 'ceremony_date','ceremony_type', 'service',  'religion'];

const {POST, GET, DELETE, PUT} = api('/api/registros')
export default function page () {
  const GETquery= async ()=> (await GET()).data
  const {data, isLoading, refetch, } = useQuery("registros", GETquery);
  if(isLoading) return <LoadingSpinner/>
  //const [items, add,edit,deleteSelected, editSelected] = useCrud(initialItems, 'name');
  return <CrudTable title="Difuntos" description="Difuntos que han pasado a un mejor lugar"
      items={data} headers={headers} keys={keys} id="name"
      onAdd={async (added)=>{
        POST(added).then(refetch)
      }}
      onDeleteSelected ={(selected)=>{
        selected.forEach(item=> DELETE({target: item.name}).then(refetch))
      }}
      onEditSelected = {(changes,oldValues)=>{
      }}
      onEdit = {(updated,old)=>{
        PUT(old,updated).then(refetch)
      }}
      />
}
