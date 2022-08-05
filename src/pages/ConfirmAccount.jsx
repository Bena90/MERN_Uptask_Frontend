import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alert from '../components/Alert.jsx'
import axiosClient from '../config/axiosClient.jsx'

const ConfirmAccount = () => {
  const [ alert, setAlert ] = useState({})
  const [ confirmAccount, setConfirmAccount ] = useState(false)

  const params = useParams();
  const { id } = params;

  useEffect(()=>{
    const confirmAccount = async () => {
      try {
        const {data} = await axiosClient ('/users/confirm/${id}')
        setAlert({
          msg: data.msg,
          error: false
        })
        setConfirmAccount(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    confirmAccount();

  },[id])
  

  return (
    <>
    <h1 className='text-emerald-600 font-black text-6xl'>
      Confirm your account and create your <span className='text-stone-700'>projects</span>
    </h1>
    <div className='mt-20 md:mt-20 shadow-lg px-5 py-10 rounded-xl bg-white'>
      {alert.msg && <Alert alert={alert}/>}
      {confirmAccount && (!alert.error) && (
        <Link
          to='/'
          className='block text-center my-5 text-slate-500 text-sm'
        >
          LOG IN
        </Link>
      ) }

    </div>
  </>
  )
}

export default ConfirmAccount