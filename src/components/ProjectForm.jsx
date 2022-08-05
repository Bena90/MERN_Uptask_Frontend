import { useState, useEffect } from 'react';
import useProjects from '../hook/useProjects';
import Alert from './Alert';
import { useParams } from 'react-router-dom'


const ProjectForm = () => {
    const [ name, setName] = useState('');
    const [ description, setDescription] = useState('');
    const [ deliveryDate, setDeliveryDate] = useState('');
    const [ client, setClient] = useState('');

    const { showAlert, alert, submitProject, currentProject } = useProjects();
    const {msg} = alert;
    const {id} = useParams();
    console.log(id)
    
    useEffect(() =>{
        if (id){
            setName (currentProject.name);
            setDescription (currentProject.description);
            setDeliveryDate (currentProject.deliveryDate?.split('T')[0]);
            setClient (currentProject.client);
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const project = {
            id,
            name,
            description,
            deliveryDate,
            client
        }

        if([name, description, deliveryDate, client].includes('')){
            showAlert({
                msg: 'All fields are required!',
                error: true,
            })
            return;
        }

        await submitProject(project);

        setName ('');
        setDescription ('');
        setDeliveryDate ('');
        setClient ('');
    }

  return (
    <form 
        onSubmit={ handleSubmit }
        className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md'>
        {msg && <Alert alert={alert} />}
        <div className='mb-5'>
            <label
                htmlFor="name"
                className='text-gray-700 uppercase font-bold text-sm'
            >
                Project Name
            </label>
            <input
                id="name"
                type="text" 
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500 '
                placeholder='Project Name'
                value={name}
                onChange={ (e) => setName(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                htmlFor="description"
                className='text-gray-700 uppercase font-bold text-sm'
            >
                Description
            </label>
            <textarea
                id="description"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500 '
                placeholder='Description...'
                value={description}
                onChange={ (e) => setDescription(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                htmlFor="delivery-date"
                className='text-gray-700 uppercase font-bold text-sm'
            >
                Delivery Date
            </label>
            <input
                id="delivery-date"
                type="date"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500 '
                value={deliveryDate}
                onChange={ (e) => setDeliveryDate(e.target.value)}
            />
        </div>

        <div className='mb-5'>
            <label
                htmlFor="client"
                className='text-gray-700 uppercase font-bold text-sm'
            >
                Client Name
            </label>
            <input
                id="client"
                type="text" 
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md focus:outline-none focus:border-emerald-500 '
                placeholder='Client Name'
                value={client}
                onChange={ (e) => setClient(e.target.value)}
            />
        </div>

        <input
            type='submit'
            value={(id) ? 'Update Project' : 'Create Project'}
            className='bg-emerald-600 hover:bg-emerald-700 w-full p-2 uppercase font-bold text-sm text-white rounded-lg shadow-md cursor-pointer transition-colors'
        />

    </form>
  )
}

export default ProjectForm