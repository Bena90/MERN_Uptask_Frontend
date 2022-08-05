import React from 'react'
import { Outlet } from 'react-router-dom';
import useAuth from '../hook/useAuth';

const AuthLayout = () => {
  const {isLoading} = useAuth();

  if (isLoading){
    return (
      <h2>Cargando...</h2>
    )
  }else {
    return (
      <>
          <main className='container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center'>
              <div className='md:w-2/3 lg:w-2/5'>
                  <Outlet/>
              </div>
          </main>
      </>
    );
  };
};

export default AuthLayout;