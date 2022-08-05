import React from 'react';
import {Link} from 'react-router-dom';
import useAuth from '../hook/useAuth';


const CardProject = ({project}) => {
  const { auth } = useAuth();

  const { name, _id, client, creator } = project;

  return (
    <div className="border-b p-5 flex flex-col justify-between md:flex-row ">
      <div className='flex item-center gap-2'>
        <p className='flex-1'>
          {name}
          <span className='text-sm text-gray-500 uppercase'>
            {' '}{client}
          </span>
        </p>

        {auth._id !==  creator && (
          <p className='p-1 mx-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>Collaborator</p>
        )}
      </div>
      <Link
        className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
        to={`${_id}`}>
          More
      </Link>
    </div>
  )
}

export default CardProject