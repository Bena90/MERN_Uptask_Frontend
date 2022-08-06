import { createContext, useState, useEffect } from 'react';
import axiosClient from '../config/axiosClient';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import io from 'socket.io-client';

let socket

const ProjectsContext = createContext({})

export const ProjectsProvider = ({children}) => {
  const [ projects , setProjects ] = useState([]);
  const [ alert, setAlert ] = useState({});
  const [ currentProject, setCurrentProject ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ modalFormTask, setModalFormTask ] = useState(false);
  const [ modalDeleteTask, setModalDeleteTask ] = useState(false);
  const [ modalDeleteCollab, setModalDeleteCollab ] = useState(false);
  const [ task, setTask ] = useState({});
  const [ collaborator, setCollaborator ] = useState({});
  const [ searcher, setSearcher ] = useState(false);

  const { auth } = useAuth(); 
  
  const navigate = useNavigate();

  
// API Configuration
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`
    }
  };

  useEffect(()=>{
    setLoading(true)
    const getProjects = async () =>{

      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config1 = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };

        const {data} = await axiosClient('projects', config1);
        setProjects(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getProjects();
  }, [auth]);

  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])

// Funtions:
  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() =>{
      setAlert({})
    }, 4000 );
  };

// Project functions:

  const getProject = async ( id ) => {
    setLoading(true)
    try {
      const { data } = await axiosClient(`/projects/${id}`, config);
      setCurrentProject(data);
      setAlert({});
    } catch (error) {
        navigate('/projects', {replace: true});
        setAlert({
          msg: error.response.data.msg,
          error: true
        })

        setTimeout(() =>{
          setAlert({});
        }, 3000);
        
    } finally {
      setLoading(false)
    }
  }

  const submitProject = async ( project ) => {
    if(project.id){
      await updateProject(project);
    } else {
      await newProject(project);
    }
  };
  
  const newProject = async (project) => {
    try {
      const {data} = await axiosClient.post('/projects', project, config)
      
      setProjects([...projects, data]);
      
      showAlert({
        msg: 'Project saved successfully',
        error: false,
      })
      
      setTimeout(()=>{
        setAlert({});
        navigate ('/projects')
      }, 3000)
      
    } catch (error) {
      console.log(error)
    }
  }
  
  const updateProject = async ( project ) => {
    try {
      const {data} = await axiosClient.put(`/projects/${project.id}`, project, config);
      const projectsUpdated = projects.map (project => project._id === data._id? data : project);
      setProjects(projectsUpdated);
    } catch (error) {
      console.log(error);
    }

    showAlert({
      msg: 'Project update successfully',
      error: false,
    })

    setTimeout(()=>{
    setAlert({});
    navigate ('/projects')
    }, 3000)
  }
    
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete?')){
      await deleteProject(id);
    } else {
      console.log('No')
    }
  }

  const deleteProject = async (id) => {
    try {
      const {data} = await axiosClient.delete(`/projects/${id}`, config);
      const projectsUpdated = projects.filter (project => project._id !== id);
      setProjects(projectsUpdated);
    } catch (error) {
      console.log(error)
    }

    showAlert({
      msg: 'Project delete successfully',
      error: false,
    })

    setTimeout(()=>{
    setAlert({});
    navigate ('/projects')
    }, 3000)
  };

// Task functions:

  const handleModalTask = () =>{
    setModalFormTask(!modalFormTask);
    setTask({})
  };
  
  const handleModalUpdateTask = (task) => {
    setTask(task);
    setModalFormTask(true);
  };

  const handleModalDeleteTask = (task) => {
    setTask (task);
    setModalDeleteTask(!modalDeleteTask); 
  };

  const submitTask = async (task) => {
    if (task?.id){
      await editTask (task)
    } else{
      await createTask (task)
    }
    return 
  };

  const createTask = async (task) => {
    try {
      const { data } = await axiosClient.post(`/tasks`, task, config);

      setAlert({});
      setModalFormTask(false);;
      
      // Socket.io:
      socket.emit('newTask', data)

    } catch (error) {
      console.log(error.response.data.msg)
    }
  };

  const editTask = async(task) => {
    try {
      const {data} = await axiosClient.put(`/tasks/${task.id}`, task, config)
      setAlert({});
      setModalFormTask(false);
      
      //Socket.io:
      socket.emit('updateTask', data)

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (task) => {
    try {
      const {data} = await axiosClient.delete(`tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false
      })
      
      //Socket.io:
      socket.emit('deleteTask', task)
      
      setModalDeleteTask(false);
      setTask({});
      setTimeout(() =>{
        setAlert({});
      }, 3000)

    } catch (error) {
      console.log(error);
    }
  };

// Collaborators function:

  const submitCollaborator = async (email) => {
    setLoading(true);
    try {
      const { data } = await axiosClient.post(`/projects/collaborator`, {email}, config);
      setAlert({});
      setCollaborator(data);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  const addCollaborator = async (email) => {

    try {
      const {data} = await axiosClient.post(`/projects/collaborator/${currentProject._id}`, email, config);
      console.log(data);
      setAlert({
        msg: data.msg,
        error: false
      })
      setCollaborator('');

      setTimeout(() => {
        setAlert({})
      },3000);

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      });

    };
  };

  const handleModalDeleteCollab = (collaborator) => {
    setCollaborator (collaborator);
    setModalDeleteCollab(!modalDeleteCollab); 
  };

  const deleteCollab = async (collaborator) => {
    try {
      const {data} = await axiosClient.post(`/projects/delete-collaborator/${currentProject._id}`, {id: collaborator._id} , config);
      setAlert({
        msg: data.msg,
        error: false,
      })

      const updateProject = {...currentProject}
      updateProject.collaborators = updateProject.collaborators.filter( collab => collaborator._id !== collab._id)

      setCurrentProject(updateProject);
      setCollaborator({});
      handleModalDeleteCollab(false);

      setTimeout(() => {
        setAlert({})
      },3000);
      
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id_task) => {
    try {
      const {data} = await axiosClient.post(`/tasks/state/${id_task}`, {}, config);
      setTask({});
      setAlert({});

      //Socket.io:
      socket.emit('changeState', data)

    } catch (error) {
      console.log(error);
    }
  };
    
// Search for tasks
  const handleSearcher = () => {
    setSearcher(!searcher);
  }

// Socket.io:
  const submitTaskProject = (newTask) =>{
    const updatedProject = {...currentProject};
    updatedProject.tasks = [...currentProject.tasks, newTask];
    setCurrentProject(updatedProject);
  }

  const deleteTaskProject = (task) => {
    const updatedProject = {...currentProject}
    updatedProject.tasks = updatedProject.tasks.filter(taskState => taskState._id !== task._id)
    setCurrentProject(updatedProject);
  }

  const updateTaskProject = (task) => {
    const updatedProject = {...currentProject}
    updatedProject.tasks = updatedProject.tasks.map( taskState => taskState._id === task._id ? task : taskState)
    setCurrentProject(updatedProject);
  }

  const changeTaskProject = (task) => {
    const updatedProject = {...currentProject}
    updatedProject.tasks = updatedProject.tasks.map(taskState => taskState._id === task._id ? task : taskState)  
    setCurrentProject(updatedProject);
  }

  const logOutProjects = () => {
    setCurrentProject({})
    setProjects ([])
    setAlert({})
  }

  return (
    <ProjectsContext.Provider 
    value ={{
      projects,
            showAlert,
            alert,
            submitProject,
            getProject,
            currentProject,
            loading,
            handleDelete,
            deleteProject,
            handleModalTask,
            modalFormTask,
            submitTask,
            handleModalUpdateTask,
            task,
            handleModalDeleteTask,
            modalDeleteTask,
            deleteTask,
            submitCollaborator,
            collaborator,
            addCollaborator,
            handleModalDeleteCollab,
            modalDeleteCollab,
            deleteCollab,
            completeTask,
            handleSearcher,
            searcher,
            submitTaskProject,
            deleteTaskProject,
            updateTaskProject,
            changeTaskProject,
            logOutProjects
        }}
    >
        {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext