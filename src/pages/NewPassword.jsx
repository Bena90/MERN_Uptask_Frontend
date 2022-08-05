import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../config/axiosClient.jsx'
import Alert from '../components/Alert.jsx';

const NewPassword = () => {
  const [ alert, setAlert ] = useState({});
  const [ password, setPassword ] = useState('');
  const [ validToken, setValidToken ] = useState(false);
  const [ isDisabled, setIsDisabled] = useState(false);
  const {token} = useParams();

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`/users/forget-password/${token}`)
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    checkToken();

  }, [])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (password.length < 6){
      setAlert({
        msg: 'Too short.',
        error: true,
      })
      return
    }

    try {
      const url = `/users/forget-password/${token}`;
      const { data } = await axiosClient.post(url, {password});
      setIsDisabled(true)
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
        Reset your password and manage your <span className='text-stone-700'>projects</span>
      </h1>
      {alert.msg && <Alert alert={alert}/>}
      {validToken &&
        <form
        className='my-10 bg-white shadow rounded-lg py-10 px-10'
        onSubmit ={handleSubmit}
        >
          <div className='my-5'>
            <label
              className='uppercase text-gray-600 block text-xl font-bold'
              htmlFor='password'
            >
              new password
            </label>
            <input 
              id='password'
              type="password"
              placeholder='Write your new password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50  focus:outline-none focus:border-emerald-500 focus:ring-1'
              value={password}
              onChange ={(e)=> setPassword(e.target.value)}
            />
          </div>
          <input
            disabled={isDisabled}
            type='submit'
            className={`${isDisabled ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-800'} hover:cursor-pointer transition-colors w-full py-3 text-white uppercase font-bold rounded-xl`}
            value='Reset Password'
          />
        </form>
      }
      {isDisabled && (
        <div className='my-10 bg-white shadow rounded-lg py-5 px-10'>
          <nav className='lg:flex lg:justify-between'>
            <p>
              Now, you can log in: {''}
              <Link 
                className='text-emerald-600 font-bold'
                to='register'
              >
                Sign up
              </Link>
            </p>
          </nav>
        </div>
      )}
    </>
  )
}

export default NewPassword