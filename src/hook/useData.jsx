import { useState, useEffect } from 'react'
import axiosClient from '../config/axiosClient'

const useData = (url, data, ) => {
    const [ loading, setLoading ] = useState (false)
    const [ token, setToken] = useState(
        () => window.localStorage.getItem('token') ?? '',
      )

    const config = {
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    
    const callApi = async () => {
        setLoading (true)
        if (!token){
            setLoading(false)
            return;
        };

        try {
            const { data } = await axiosClient(url, config)
            setAuth(data)
            navigate('/projects', {replace: true})
        } catch (error) {
            setAuth({});
        } finally{
            setLoading(false)
        }
    }

    authUser();



  return { loading, data }
}

export default useData