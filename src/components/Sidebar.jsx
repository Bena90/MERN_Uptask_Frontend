import {Link} from 'react-router-dom'
import useAuth from '../hook/useAuth'


const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10'>
      <p className="text-xl font-bold"> Hello: {auth.name}</p>
      <Link 
        to='create-project'
        className='bg-emerald-600 w-full rounded-lg px-3 py-2 text-white text-center uppercase font-bold block mt-5 shadow-lg hover:bg-emerald-700 transition-colors'
      > 
        New Project
      </Link>
    </aside>
  )
}

export default Sidebar