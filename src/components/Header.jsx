import { useState } from 'react';
import { Link } from 'react-router-dom';
import useProjects from '../hook/useProjects';
import useAuth from '../hook/useAuth';
import ModalSearch from './ModalSearch';

const Header = () => {
  const [search, setSearch ] = useState(false)
  const { handleSearcher, searcher, logOutProjects  } = useProjects();
  const { logOutAuth  } = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem('token')
    logOutAuth();
    logOutProjects();
  }
  
  return (
    <header className="px-4 py-3 bg-white border-b">
      <div className="md:flex md:justify-between items-center">
        <h2 className="text-4xl mb-5 md:mb-0 text-emerald-600 font-black text-center"
        >
          UpTask
        </h2>
        <div className='flex items-center justify-around gap-5'>
          <button
            type="button"
            className='text-white text-sm bg-emerald-600 p-2 rounded-md uppercase font-bold shadow-md hover:bg-emerald-700'
            onClick={handleSearcher}
          >
            Search
          </button>
          <Link 
            to='/projects'
            className='text-white text-sm bg-indigo-600 p-2 rounded-md uppercase font-bold shadow-md hover:bg-indigo-700'
          >
            Projects
          </Link>
          <div className='border-l pl-5'>
            <button 
              type='button'
              className='text-white text-sm bg-red-500 p-2 rounded-md uppercase font-bold shadow-md hover:bg-red-600'
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
          <ModalSearch />
        </div>
      </div>

    </header>
  )
}

export default Header