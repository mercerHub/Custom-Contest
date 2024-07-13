import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className='bg-gray-900 h-fit'>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout
