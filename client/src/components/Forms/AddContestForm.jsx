import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { IoAddOutline } from "react-icons/io5";
import { server } from '../../constants';
import useAuth from '../../contexts/UserContext';

function AddContestForm() {

    const [url,setUrl] = useState('');
    const [danger,setDanger] = useState(false);
    const [contestId,setContestId] = useState('');

    const {addContest} = useAuth();

    const handleAddContest = async() => {
        setDanger(false);
        if(!url && !contestId){
            // setDanger(true)
            alert("Enter either Contest id or url")
            return;
        }
        if(url && contestId){
            // setDanger(true);
            alert("Enter either Contest id or url not both")
            return;
        }
        
        const response = await axios.post(`${server}/contest/createContest`,{
            url,
            contestId,
        },
        {
            withCredentials:true
        })
        .then(response => response.data)
        .catch(er => console.log("Error occured :",er))

        
        const {statusCode,data} = response;
        console.log(statusCode);

        if(statusCode === 200){
            addContest(data._id);
        }
        
    }
    

    return (
        <>  
            <div className="flex flex-col w-full my-5 p-5 px-8">
                <div className="text-3xl text-center text-gray-300 logoText">Add Contest</div>
                <div className="grid grid-flow-col grid-cols-4 items-center gap-4">
                    <label htmlFor="contestId" className="text-gray-300 text-base mt-5 text-right ">URL :</label>
                    <input id = "url" name='url' type="text" placeholder="url" className={`border-2 ${danger ? "border-red-700 shadow-sm shadow-red-600" : "border-teal-700"} p-2 rounded-md mt-5 bg-transparent text-gray-300 col-span-3`} autocomplete="off" onChange={(e) => setUrl(e.target.value)}/>   
                </div>
                <div className='text-gray-300 row-span-4 text-center text-sm z-99 m-2'>OR</div>
                <div className="grid grid-flow-col grid-cols-4 items-center gap-4">
                    <label htmlFor="contestId" className="text-gray-300 text-base text-right h-5">CONTEST ID :</label>
                    <input id = "contestId" name='contestId' type="text" placeholder="Contest Code" className={`border-2 ${danger ? "border-red-700 shadow-sm shadow-red-600" : "border-teal-700"} p-2 rounded-md bg-transparent text-gray-300 col-span-3`} autocomplete="off" onChange={(e) => setContestId(e.target.value)} />   
                </div>
                
                
                <button className= "transition-all ease-in-out delay-75 text-gray-300 p-1 rounded-md mt-5 flex items-center gap-2 hover:text-gray-50 shadow-md hover:shadow-teal-400" onClick={handleAddContest}> 
                    <span className='bg-teal-700 w-1/6 p-2 rounded-md h-10 items-center flex justify-center text-xl'>
                        <IoAddOutline/> 
                    </span>
                    <span className='bg-teal-700 w-5/6 p-2 rounded-md h-10 text-lg'>Add Contest</span>
                </button>
            </div>
        </>
    )
}

export default AddContestForm
