import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert.jsx';
import axiosClient from '../config/axiosClient.jsx'

const Register = () => {
  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [confirm, setConfirm ] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault ();
    if([name, email, password, confirm].includes('')){
      setAlert({
        msg: 'Please complete all required fields',
        error: true
      })
      return;
    }

    if(password !== confirm){
      setAlert({
        msg: 'Passwords are different',
        error: true
      })
    }

    if(password.length < 6){
      setAlert({
        msg: 'Password too short',
        error: true
      })
    }
    setAlert({})

    try {
      const {data} = await axiosClient
        .post(`/users`,
          {name, email, password})
      console.log(data)
      setAlert({
        msg: data.msg,
        error: false
      })
      setName('');
      setEmail('');
      setPassword('');
      setConfirm('');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-emerald-600 font-black text-6xl'>
        Sign up and manage your <span className='text-stone-700'>projects</span>
      </h1>
      {alert.msg && <Alert alert={alert}/>}
      <form 
        onSubmit={handleSubmit}
        className='my-10 bg-white shadow rounded-lg py-10 px-10'>
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='name'
          >
            Your Name
          </label>
          <input 
            id='name'
            type="text"
            placeholder='Name'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50  focus:outline-none focus:border-emerald-500 focus:ring-1'
            value={name}
            onChange={e=>setName(e.target.value)}
          />
        </div>
        <div className='my-5'>
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
            onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='password'
          >
            password
          </label>
          <input 
            id='password'
            type="password"
            placeholder='Password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50  focus:outline-none focus:border-emerald-500 focus:ring-1'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </div>
        <div className='my-5'>
          <label
            className='uppercase text-gray-600 block text-xl font-bold'
            htmlFor='repeatPassword'
          >
            confirm
          </label>
          <input 
            id='confirm'
            type="password"
            placeholder='Confirm your password'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50  focus:outline-none focus:border-emerald-500 focus:ring-1'
            value={confirm}
            onChange={e=>setConfirm(e.target.value)}
          />
        </div>
        <input
          type='submit'
          className='bg-emerald-600 hover:bg-emerald-800 hover:cursor-pointer transition-colors w-full py-3 text-white uppercase font-bold rounded-xl'
          value='Sign up'
        />
      </form>
      <div className='my-10 bg-white shadow rounded-lg py-5 px-10'>
        <nav className='lg:flex lg:justify-between'>
          <p>
            Have an account? {''}
            <Link 
              className='text-emerald-600 font-bold'
              to='/'
            >
              Log in
            </Link>
          </p>
        </nav>
      </div>
    </>
  )
}

export default Register