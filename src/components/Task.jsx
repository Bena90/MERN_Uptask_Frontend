import React from 'react';
import date from '../helpers/date';
import useProjects from '../hook/useProjects';
import useAdmin from '../hook/useAdmin';

const Task = ({task}) => {
    const { handleModalUpdateTask, handleModalDeleteTask, completeTask } = useProjects();
    const { name, description, deliveryDate, priority, state, completed } = task;
    const admin = useAdmin();

  return (
    <div className='border-b p-5 flex justify-between'>
        <div>
            <p className='mb-1 text-xl'>{name}</p>
            <p className='mb-1 text-sm text-gray-500 uppercase'>{description}</p>
            <p className='mb-1 text-base'>{date (deliveryDate)}</p>
            <p className='mb-1 text-sm text-gray-600'>Prioridad: {priority}</p>
            {state && <p className='text-xs bg-green-600 uppercase p-1 rounded-lg text-white font-bold'>Completed by: {completed?.name}</p>}
        </div>

        <div className='flex flex-col gap-2'>
            { admin && (
                <button
                    className='bg-indigo-600/50 hover:bg-indigo-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg'
                    onClick= {()=>handleModalUpdateTask(task)}>
                    Edit
                </button>
            )}
                <button
                    className={`${state ? 'bg-emerald-400/70 hover:bg-emerald-600': 'bg-gray-400/70 hover:bg-gray-600'} px-4 py-2 text-white uppercase font-bold text-sm rounded-lg`}
                    onClick={()=> completeTask(task._id)}
                >
                    { state ? 'Complete' : 'Incomplete' }
                </button>

            { admin && (
                <button
                className='bg-red-600/70 hover:bg-red-600 px-4 py-2 text-white uppercase font-bold text-sm rounded-lg'
                onClick={()=> handleModalDeleteTask(task)}
                >
                    Delete
                </button>
            )}
        </div>
    </div>
  )
}

export default Task