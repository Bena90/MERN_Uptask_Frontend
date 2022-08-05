import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAuth from '../hook/useAuth';

const PrivateRoute = () => {
    const { auth, isLoading } = useAuth();
    console.log(auth._id !== undefined)

    if (isLoading) {
        return (
            <>
                <div>Cargando...</div>
            </>
        )

    } else {
        return (
            <div>
                {auth._id ? (
                    <div className='bg-gray-100'>
                        <Header/>
                        <div className='md:flex md:min-h-screen'>
                            <Sidebar />
                            <main className='flex-1 p-10'>
                                <Outlet />
                            </main>
                        </div>

                    </div>
                ) : <Navigate to='/' />}
            </div>
        )
    }
}

export default PrivateRoute