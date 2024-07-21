import React, { useState } from 'react'
import { IoRemoveSharp } from "react-icons/io5";
import { server } from '../../constants';
import axios from 'axios';
import useAuth from '../../contexts/UserContext';

function RemoveContestForm() {

    const [contestId,setContestId] = useState();
    const {removeContest} = useAuth();
    const handleRemoveContest = async() => {
        if(!contestId){
            alert("Enter contest id ");
            return;
        }
        const response = await axios.post(`${server}/user/removeContest`,{contestId},{
            withCredentials:true
        })
        .then(response => response.data)
        .catch((err) => console.log("Couldn't remove contest",err))

        const {statusCode,data} = response;
        console.log(`${contestId} ${statusCode}`);

        if(statusCode === 200){
            removeContest(data._id);
        }
    }


    return (
        <>
            <div className="flex flex-col w-full my-5 p-5 px-8">
                <div className="text-3xl text-center text-gray-300 logoText mb-4">Remove Contest</div>
                
                <div className="grid grid-flow-col grid-cols-4 items-center gap-4">
                    <label htmlFor="contestId" className="text-gray-300 text-base text-right">CONTEST ID :</label>
                    <input id = "contestId" name='contestId' type="text" placeholder="Contest Code" className="border-2 border-teal-700 p-2 rounded-md mt-5 bg-transparent text-gray-300 col-span-3 mb-5" autocomplete="off" onChange={(e) => setContestId(e.target.value)}/>   
                </div>
                
                
                <button className= "text-gray-300 p-1 rounded-md mt-5 flex items-center gap-2 hover:text-gray-50 shadow-md hover:shadow-teal-400 transition-all ease-in-out delay-75" onClick={handleRemoveContest}> 
                    <span className='bg-teal-700 w-1/6 p-2 rounded-md h-10 items-center flex justify-center text-xl'>
                        <IoRemoveSharp/> 
                    </span>
                    <span className='bg-teal-700 w-5/6 p-2 rounded-md h-10 text-lg'>Remove</span>
                </button>
            </div>
        </>
    )
}

export default RemoveContestForm
