import useProjects from "../hook/useProjects.jsx";
import CardProject from "../components/CardProject.jsx";
import Alert from "../components/Alert.jsx";
                                                                                                                                                                                                                                                    
const Projects = () => {
  const { projects, alert } = useProjects();

  const { msg } = alert;

  return (
    <>
      <h1 className='font-black text-4xl'> Proyectos </h1>
      {msg && <Alert alert={alert} />}
      <div className='bg-white shadow mt-10 rounded-lg'>
        {projects.length ? (
          projects.map( project => 
            <CardProject
              key={project._id} 
              project={project} />
          )
        ) : (

          <p className='mt-5 p-5 text-center text-gray-600 uppercase'> No hay Proyectos </p>
        
        )}
      </div>
    </>
  )
}

export default Projects;