import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import useAuth from '../contexts/UserContext';
import axios from 'axios';
import { server } from '../constants';

function Navbar() {
    const { user, logout } = useAuth();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(user ? true : false);

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${server}/user/logout`, {}, {
                withCredentials: true
            });
            console.log(response.data);
            logout();
        } catch (error) {
            console.error('Logout error:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        setIsUserLoggedIn(user ? true : false);
    }, [user]);

    return (
        <div className='bg-black flex h-16 items-center px-10 py-2 justify-between border border-l-0 border-r-0 border-b-1 border-sky-200'>
            <div className='logoText select-none'>
                <h1 className='text-white text-xl md:text-3xl '>&lt;CodeCache&gt;</h1>
            </div>
            {!isUserLoggedIn ? (
                <div className='flex items-center gap-5'>
                    <NavLink to={'/login'}>
                        <Button variant="outlined" sx={{ color: 'whitesmoke' }}>Login</Button>
                    </NavLink>
                    <NavLink to={'/register'}>
                        <Button variant="contained" sx={{ color: 'whitesmoke' }}>Sign up</Button>
                    </NavLink>
                </div>
            ) : (
                <Button onClick={handleLogout} variant="outlined" sx={{ color: 'whitesmoke' }}>Logout</Button>
            )}
        </div>
    );
}

export default Navbar;
