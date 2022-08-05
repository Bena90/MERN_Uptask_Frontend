import { useState } from 'react';
import {Link} from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import axiosClient from '../config/axiosClient.jsx'

const ForgetPassword = () => {
  const [email, setEmail ] = useState ('');
  const [alert, setAlert] = useState ({});
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e)=> {
    e.preventDefault();
    if (email === ''){
      setAlert({
        msg: 'Please enter your email',
        error: true,
      })
    }
    try {
      const {data} = await axiosClient.post(`/users/forget-password`, {email})
      setIsDisabled(true);
      setAlert({
        msg: data.msg,
        error: false,
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  return (
      <>
      <h1 className='text-emerald-600 font-black text-6xl'>
        Recover your password and don't lose your <span className='text-stone-700'>projects</span>
      </h1>
      {alert.msg && <Alert alert={alert}/>}
      <form
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg py-10 px-10'
      >
        <div className='mb-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='email'
          >
            Your Email
          </label>
          <input 
            id='email'
            type="email"
            placeholder='Email'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50  focus:outline-none focus:border-emerald-500 focus:ring-1'
            value={email}
            onChange={( (e)=> setEmail(e.target.value) )}
          />
        </div>
        <input
          type='submit'
          className={`${isDisabled ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-800'} hover:cursor-pointer transition-colors w-full py-3 text-white uppercase font-bold rounded-xl`}
          value='SEND'
        />
      </form>
      <div className='my-10 bg-white shadow rounded-lg py-5 px-10'>
        <nav className='lg:flex lg:justify-between'>
          <p>
            Don't have an account? {''}
            <Link 
              className='text-emerald-600 font-bold'
              to='/register'
            >
              Sign up
            </Link>
          </p>
        </nav>
      </div>
    </>
  )
}

export default ForgetPassword