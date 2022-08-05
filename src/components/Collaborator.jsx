import React from 'react';
import useProjects from '../hook/useProjects';

const Collaborator = ({collaborator}) => {

  const { handleModalDeleteCollab } = useProjects();

  const {name, email} = collaborator;
  
  return (
    <div className='border-b p-5 flex justify-between items-center '>
      <div>
        <p>{name}</p>
        <p className='text-sm'>{email}</p>
      </div>
      <div>
        <button 
          type='button'
          className='bg-red-600 px-4 py-1 text-white uppercase font-bold text-sm rounded-lg'
          onClick={()=>handleModalDeleteCollab(collaborator)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Collaborator;