import { useEffect } from "react";
import { useParams, Link,  } from 'react-router-dom';
import useProjects from '../hook/useProjects';
import useAdmin from "../hook/useAdmin";
import Spinner from '../utils/Spinner';
import LogoEdit from "../utils/LogoEdit.jsx";
import LogoPlus from "../utils/LogoPlus";
import ModalFormTask from "../components/ModalFormTask";
import ModalDeleteTask from "../components/ModalDeleteTask";
import ModalDeleteCollab from "../components/ModalDeleteCollab";
import Task from "../components/Task";
import Collaborator from '../components/Collaborator';
import io from 'socket.io-client';

let socket

const Project = () => {
  const { id } = useParams();
  const { getProject, currentProject, loading, handleModalTask, submitTaskProject, deleteTaskProject, updateTaskProject, changeTaskProject } = useProjects();
  const admin = useAdmin();

  useEffect(() => {
    getProject(id);

  }, []);
  

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    console.log(currentProject)
    socket.emit('Open Project', id)
  }, []);
  
  useEffect(() => {
    socket.on('taskAdded', (newTask) => {
      if(newTask.project === currentProject._id){
        submitTaskProject(newTask);
      }
    })

    socket.on('taskDeleted', (taskDeleted) => {
      if (taskDeleted.project === currentProject._id){
        deleteTaskProject(taskDeleted);
      }
    })

    socket.on('taskUpdated', (taskUpdated) => {
      if (taskUpdated.project._id === currentProject._id){
        updateTaskProject(taskUpdated)
      }
    })

    socket.on('stateChanged', taskModified => {
      if (taskModified.project._id === currentProject._id){
        changeTaskProject (taskModified)
      }
    })

  })

  const { name } = currentProject;

  if (loading){
    return <Spinner/>
  }

  return (
        <>
          <div className='flex justify-between '>
            <h1 className="font-black text-4xl"> {name} </h1>.

            {
              admin && (
                <div className='flex item-center gap-2 text-gray-400 hover:text-gray-800'>
                  <LogoEdit/>
                  <Link
                    to={`/projects/edit/${id}`}
                    className='font-bold'
                  >
                    Edit
                  </Link>
                </div>
            )}

          </div>

          {
            admin && (
              <button
                type="button"
                className='flex gap-2 text-sm px-3 py-2 w-full md:w-auto rounded-lg uppercase font-bold bg-emerald-500 text-white text-center mt-5 items-center justify-center shadow-md'
                onClick={handleModalTask}
              >
                <LogoPlus/>
                New Task
              </button>
          )}
          <p className='font-bold text-xl mt-10'> Project tasks </p>
          <div className="bg-white shadow mt-10 rounded-lg">
            {
            currentProject?.tasks?.length ? 
              currentProject?.tasks?.map (task => <Task key={task._id} task={task}/>)
              : 
              <p className='text-center my-5 p-10 font-bold'> There are no tasks in the project yet </p>
            }
          </div>
          {
              admin && (
                <>
                  <div className='flex items-center justify-between mt-10'>
                    <p className='font-bold text-xl'> Collaborators  </p>
                    <Link
                      className='flex items-center text-gray-400 font-bold hover:text-gray-800'
                      to={`/projects/new-collaborator/${currentProject._id}`}
                      >
                      <LogoPlus/> Add
                    </Link>
                  </div>
                  <div className="bg-white shadow mt-10 rounded-lg">
                    {
                    currentProject?.collaborators?.length ? 
                      currentProject?.collaborators?.map (collaborator => <Collaborator key={collaborator._id} collaborator={collaborator}/>)
                      : 
                      <p className='text-center my-5 p-10 font-bold'> There are no collaborators in the project yet </p>
                    }
                  </div>
                </>
            )}

          <ModalFormTask/>
          <ModalDeleteTask/>
          <ModalDeleteCollab/>
        </>  
  )
}

export default Project;