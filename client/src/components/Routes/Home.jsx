import React, { useEffect, useState } from 'react'
import  useAuth from '../../contexts/UserContext';
import Card from '../FancyComponents/Card';
import { SiCodeforces } from "react-icons/si";
import { SiCodechef } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


function Home() {
    const { user } = useAuth();

    const navigate = useNavigate();
    const handleProblemClick = async() => {
        if(!user){
            navigate('/login');
        }
        else{
            navigate('/problems');
        }
        
    }
    const handleContestClick = async() => {
        if(!user){
            navigate('/login');
        }
        else{
            navigate('/contests');
        }
        
    }

    return (
        <div className='text-white home-area p-2 flex flex-col items-center gap-5 mt-4'>
            <h1 className='text-3xl logoText-notLogo'>Welcome, {user? user.name.toUpperCase() : "to CodeCache"} !!!</h1>
            <div className='h-full w-full flex gap-4 p-4 justify-center flex-col md:flex-row md:items-start items-center flex-wrap select-none'>
                <Card icon = {<SiCodeforces />} text = "Problems" handleOnClick={handleProblemClick}/>
                <Card icon = {<SiCodechef />} text = "Contests" handleOnClick={handleContestClick}/>
            </div>
        </div>  
    )
}

export default Home
