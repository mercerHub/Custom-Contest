import React from 'react'
import { IoRemoveSharp } from "react-icons/io5";

function RemoveContestForm() {
    return (
        <>
            <div className="flex flex-col w-full my-5 p-5 px-8">
                <div className="text-3xl text-center text-gray-300 logoText mb-8">Remove Contest</div>
                
                <div className="grid grid-flow-col grid-cols-4 items-center gap-4">
                    <label htmlFor="contestId" className="text-gray-300 text-base text-right">CONTEST ID :</label>
                    <input id = "contestId" name='contestId' type="text" placeholder="Contest Code" className="border-2 border-teal-700 p-2 rounded-md mt-5 bg-transparent text-gray-300 col-span-3 mb-5" />   
                </div>
                
                
                <button className= "text-gray-300 p-1 rounded-md mt-5 flex items-center gap-2 hover:text-gray-50 shadow-md hover:shadow-teal-400"> 
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
