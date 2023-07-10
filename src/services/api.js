import axios from 'axios'
const api = (route) =>{
    return{
        POST: async (document, params) => await axios.post(route, {document},{params}),
        PUT: async (target, document,params) => await axios.put(route, {target:target, document:document}, {params}),
        GET: async (params) => await axios.get(route,{params}),
        DELETE: async (params) => await axios.delete(route,{params}),
        
    }
}
export default api