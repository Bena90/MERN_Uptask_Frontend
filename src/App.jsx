import {BrowserRouter, Routes, Route} from 'react-router-dom';

//Context
import { AuthProvider } from './context/AuthProvider';
import { ProjectsProvider } from './context/ProjectsProvider';

//Layouts
import AuthLayout from './layouts/AuthLayout';
import PrivateRoute from './layouts/PrivateRoute';

//Pages:
import Login from './pages/Login.jsx';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import Project from './pages/Project';
import EditProject from './pages/EditProject';
import NewCollaborator from './pages/NewCollaborator';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>} />
              <Route path='register' element={<Register/>} />
              <Route path='forget-password' element={<ForgetPassword/>} />
              <Route path='forget-password/:token' element={<NewPassword/>} />
              <Route path='confirm/:id' element={<ConfirmAccount/>} />
            </Route>
            <Route path='/projects' element={<PrivateRoute/>}>
              <Route index element={<Projects/>} />
              <Route path='create-project' element={<CreateProject/>} />
              <Route path='new-collaborator/:id' element={<NewCollaborator/>} />
              <Route path=':id' element={<Project/>} />
              <Route path='edit/:id' element={<EditProject/>} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
