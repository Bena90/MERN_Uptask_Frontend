import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Alert from '../components/Alert.jsx';
import useAuth from '../hook/useAuth.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logIn, alert, token } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(email, password)
  }

  if (token){
    return <Navigate to='/projects'/>
  }
  return (
    <>
      <h1 className='text-emerald-600 font-black text-6xl'>
        Log in and manage your <span className='text-stone-700'>projects</span>
      </h1>
      {
        alert.msg && <Alert alert={alert} />
      }
      <form 
        className='my-10 bg-white shadow rounded-lg py-10 px-10'
        onSubmit={handleSubmit}
      >
        <div className=''>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type='submit'
          className='bg-emerald-600 hover:bg-emerald-800 hover:cursor-pointer transition-colors w-full py-3 text-white uppercase font-bold rounded-xl'
          value='Log In'
        />
        <div className='mt-3'>
              <Link 
                className='text-gray-500'
                to='forget-password'
              >
                Forgot password?
              </Link>
        </div>
      </form>
      <div className='my-10 bg-white shadow rounded-lg py-5 px-10'>
        <nav className='lg:flex lg:justify-between'>
          <p>
            Don't have an account? {''}
            <Link 
              className='text-emerald-600 font-bold'
              to='register'
            >
              Sign up
            </Link>
          </p>
        </nav>
      </div>
    </>
  )
}

export default Login