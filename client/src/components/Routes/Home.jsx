import React, { useEffect, useState } from 'react'
import  useAuth from '../../contexts/UserContext';
import MouseTrackerComponent from '../FancyComponents/MouseTrackerComponent';
import Card from '../FancyComponents/Card';
import { SiCodeforces } from "react-icons/si";
import { SiCodechef } from "react-icons/si";


function Home() {
    const { user } = useAuth();

    return (
        <div className='text-white h-dvh home-area p-2 flex flex-col items-center gap-5 mt-4'>
            <h1 className='text-3xl logoText-notLogo'>Welcome, {user? user?.name : "to CodeCache"} !!!</h1>
            <div className='h-full w-full flex gap-4 p-4 justify-center flex-col sm:flex-row sm:items-start items-center flex-wrap select-none'>
                <Card icon = {<SiCodeforces />} text = "Problems"/>
                <Card icon = {<SiCodechef />} text = "Contests"/>
            </div>
        </div>  
    )
}

export default Home
