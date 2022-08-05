import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import CollaboratorForm from '../components/CollaboratorForm'
import useProjects from '../hook/useProjects';
import SpinnerCol from '../utils/SpinnerCol'

const NewCollaborator = () => {
    const { currentProject, getProject, loading, collaborator, addCollaborator, alert } = useProjects(); 

    const { id } = useParams();
  
    useEffect(() => {
      getProject(id);
  
    }, []);

    if(!currentProject?._id) return <Alert alert={alert}/>

    return (
        <>
            <h1 className='font-black text-4xl'>
                Add Collaborator to {currentProject.name} project
            </h1>
            <div className='mt-10 flex justify-center'>
                <CollaboratorForm/>
            </div>
            {
                loading ? 
                    <div className='flex justify-center mt-10'>
                        <SpinnerCol/>
                    </div>
                     :
                    collaborator?._id && (
                        <div className='flex justify-center mt-10'>
                            <div className='bg-white py-6 px-5 md:w-1/2 rounded-lg shadow-lg'>
                                <h2 className='text-center mb-10 text-2xl font-bold'>
                                    Result:
                                </h2>
                                <div className='flex justify-between items-center'>
                                    <p>{collaborator.name}</p>
                                    <button
                                        onClick={()=> addCollaborator({email:collaborator.email})}
                                        className='bg-emerald-600 hover:bg-emerald-700 mx-2 px-5 py-1 rounded-lg uppercase text-white font-bold text-sm'
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default NewCollaborator;