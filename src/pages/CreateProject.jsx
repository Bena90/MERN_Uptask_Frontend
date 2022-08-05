import React from 'react'
import ProjectForm from '../components/ProjectForm'


const CreateProject = () => {
    return (
        <>
          <h1 className='text-zinc-700 text-4xl font-black'>
            Create Project
          </h1>
          <div className='text-zinc-700 mt-10 felx justify-center'>
            <ProjectForm/>
          </div>
        </>
      )
}

export default CreateProject