import React, { useEffect, useState } from 'react'
import  useAuth from '../../contexts/UserContext';
<<<<<<< HEAD
import MouseTrackerComponent from '../FancyComponents/MouseTrackerComponent';
import Card from '../FancyComponents/Card';
import { Button } from '@mui/material';
import { SiCodeforces } from "react-icons/si";


function Home() {
    const { user } = useAuth();

    return (
        <div className='text-white h-dvh home-area p-2 flex flex-col items-center'>
            {user?.problems[0] ? <h1>Welcome ka !!</h1> : <h1>Welcome to CodeCache</h1>}
            <Card icon = {<SiCodeforces />} text = "Problems"/>
        </div>  
=======

function Home() {
    const { user } = useAuth();
    console.log(user);
    const [username, setUsername] = useState(user?.name || '');

    useEffect(() => {
        console.log(user);
        if(user){
            setUsername(user.name);
        }
        else{
            setUsername('');
        }
    },[user])

    return (
        <div className='text-white'>
            {username ? <h1>Welcome {username} !!</h1> : <h1>Welcome to CodeCache</h1>}
        </div>
        
>>>>>>> 8e07386 (Initial commit)
    )
}

export default Home
