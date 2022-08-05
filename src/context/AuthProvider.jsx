import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../config/axiosClient.jsx'

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [alert, setAlert ] = useState({})
    const [ auth, setAuth ] = useState({});


    const navigate = useNavigate();

    useEffect(()=>{
        const authUser = async ( ) => {
          const token = localStorage.getItem ('token')
            if (!token){
                setIsLoading(false)
                return;
            };

            const config = {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/users/profile', config)
                setAuth(data)
                //navigate('/projects', {replace: true})
            } catch (error) {
                setAuth({});
            } finally{
                setIsLoading(false)
            }
        }
        authUser();
    }, [])

    const logIn = async (email, password) => {
      if([email, password].includes('')){
        setAlert({
          msg: 'Please enter your email and password',
          error: true
        })        
        return
      }
  
      try {
        const {data} = await axiosClient.post ('/users/login' ,{email, password })
        window.localStorage.setItem('token', data.token)
        setAuth(data)
        navigate('/projects')
      } catch (error) {
          console.log(error)
        setAlert({
          msg: 'Hola',
          error: true
        })
      }    
    }
    
    const logOutAuth = () => {
      setAuth({})
    }

  return (
    <AuthContext.Provider 
        value={{
            auth,
            setAuth,
            isLoading,
            logIn,
            alert,
            logOutAuth
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;