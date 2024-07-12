import React , {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button';
import useAuth  from '../contexts/UserContext';

function Navbar() {
    const {user} = useAuth();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(user?true:false);

    useEffect(() => {
        setIsUserLoggedIn(user?true:false);
    },[user])
    return (
        <div className='bg-black flex h-16 items-center px-10 py-2 justify-between'>
            
            <div className='logoText'>
                <h1 className='text-white text-xl md:text-3xl '>&lt;CodeCache&gt;</h1>
            </div>
            {!isUserLoggedIn ? <div className='flex items-center gap-5'>
                <NavLink
                    to={'/login'}
                >
                    <Button variant="outlined" sx={{color:'whitesmoke'}}>Login</Button>
                </NavLink>
                <NavLink>
                    <Button variant="contained" sx={{color:'whitesmoke'}}>Sign up</Button>
                </NavLink>
            </div> : <NavLink>
                    <Button variant="outlined" sx={{color:'whitesmoke'}}>Logout</Button>
                </NavLink>}
            
        </div>
    )
}

export default Navbar
