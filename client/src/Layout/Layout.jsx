import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
<<<<<<< HEAD
        <div className='bg-gray-900 h-fit'>
=======
        <div className='bg-gray-900 h-full min-h-screen'>
>>>>>>> 8e07386 (Initial commit)
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout
