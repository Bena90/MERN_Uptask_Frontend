import { useState } from 'react';
import useProjects from '../hook/useProjects';
import Alert from './Alert';

const CollaboratorForm = () => {
    const [ email, setEmail ] = useState ('');

    const {alert, showAlert, submitCollaborator } = useProjects();
    const {msg} = alert

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email === '') {
            showAlert({
                msg: 'Please enter an email',
                error: true
            })
            return;
        }
        submitCollaborator(email)
    }

  return (
    <form
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md'
        onSubmit={handleSubmit}
    >
        {
            msg && <Alert alert={alert}/>
        }
        <div className='mb-5'>
            <label
                htmlFor="email"
                className='text-gray-700 uppercase font-bold text-sm'
            >
                Email
            </label>
            <input
                id="email"
                type="email" 
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500 '
                placeholder='Collaborator Email'
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
            />
        </div>
        <input
            type='submit'
            value='Search'
            className='bg-emerald-600 hover:bg-emerald-700 w-full p-2 uppercase font-bold text-sm text-white rounded-lg shadow-md cursor-pointer transition-colors'
        />
    </form>
  )
}

export default CollaboratorForm