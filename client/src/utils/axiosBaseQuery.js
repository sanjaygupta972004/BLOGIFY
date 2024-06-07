import axios from 'axios';

export const axiosBaseQuery =  ({baseUrl}={baseUrl:""})=>{
return async({
        url,
        method,
        data,
        headers,
        params,
        ...rest
 }) => {
 
       try {
        const response = await axios({
                url: baseUrl + url,
                method,
                data,
                headers,
                params,
                ...rest,
                withCredentials: true,
        })
        return {
                 data: response.data,
                 status: response.status,
                 statusText: response.statusText
         }
 } catch (error) {
        let message = error.response?.data?.message || error.message
        return {
                data: null,
                error: message,
                status: error.response?.status, 
        }
}}
}
  

