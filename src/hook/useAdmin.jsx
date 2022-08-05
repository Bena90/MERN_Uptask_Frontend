import React from 'react';
import useProjects from './useProjects';
import useAuth from './useAuth';

const useAdmin = () => {
    const { currentProject } = useProjects();
    const { auth } = useAuth(); 

  return currentProject.creator === auth._id
}

export default useAdmin;