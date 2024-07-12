import React, { useEffect, useState } from 'react'
import  useAuth from '../../contexts/UserContext';
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
    )
}

export default Home
