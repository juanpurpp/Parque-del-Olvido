import axios from 'axios'
import { getCookie } from 'cookies-next'
const api = (route) =>{
    
    //axios.defaults.headers.common['token'] =getCookie('token') ?? 'no token'
    const getToken=()=>getCookie('token') ?? 'no token'
    return{
        POST: async (body, params) => await axios.post(route, body,{params, headers:{token: getToken()}}),
        PUT: async (body,params) => await axios.put(route, body, {params,headers:{token: getToken()}}),
        GET: async (params) => await axios.get(route,{params, headers:{token: getToken()}}),
        DELETE: async (params) => await axios.delete(route,{params, headers:{token: getToken()}}),
        
    }
}
export default api