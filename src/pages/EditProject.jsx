import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProjects from '../hook/useProjects';
import ProjectForm from '../components/ProjectForm'
import LogoDelete from '../utils/LogoDelete';

const EditProject = () => {
    const { currentProject, getProject, loading, handleDelete } = useProjects();
    const { id } = useParams();
    const {name} = currentProject
  
    useEffect(() => {
      getProject(id);
    }, []);

    if (loading){
        return 'Cargando...'
    }

    return (
        <div>
            <div className='flex justify-between '>
                <h1 className="font-black text-4xl"> {name} </h1>
                <div className='flex item-center gap-2 pt-2 text-gray-400 hover:text-red-600 transition-colors'>
                        <LogoDelete/>
                    <button
                        onClick={()=> handleDelete(id)}
                        className='font-bold align-middle flex'
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className='text-zinc-700 mt-10 flex justify-center'>
                <ProjectForm/>
          </div>
        </div>
    )
}

export default EditProject