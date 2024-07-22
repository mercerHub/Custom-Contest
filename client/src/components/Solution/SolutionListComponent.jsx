import React from 'react';
import { NavLink, Outlet ,useNavigate} from 'react-router-dom';
import { useCurrentSolution } from '../../contexts/CurrentSolutionContext';
import { useEffect,useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios';
import { server } from '../../constants';
import { CircularProgress } from '@mui/material';

function SolutionListComponent({ solutionList }) {
    const {setCurrentSolutionData,currentSolution} = useCurrentSolution()
    const [solList,setSolList] = useState(solutionList);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate(); 

    const handleDeletesolution = async (solutionId) => {
        console.log(solutionId);
        setDeleting(true);
        const response = await axios.post(`${server}/user/removeSolution`,
            {
                solutionId
            },
            {
                withCredentials:true
            }
        ).then(response => response.data)
        .catch(err => console.log(err))
        .finally(setDeleting(false));

        if(response) {
            console.log(response.data); 
            const temp = solutionList.filter(sol => (sol._id).toString() !== solutionId.toString());
            setSolList(temp);
        }

        if(currentSolution._id === solutionId){
            setCurrentSolutionData({});
            navigate(-1);
        }
    }
    


    
    return (
        <div className='flex w-full gap-2'>
            <div className='w-1/3 h-[85vh] overflow-auto bg-white rounded-xl shadow-md p-4 mt-8'>
                <div className='bg-gray-100 p-2 mb-2 rounded-lg text-3xl text-center font-bold logoText-notLogo mt-2'>Solutions</div>
                {solutionList.length === 0 ? (
                    <p className='text-gray-500 text-center'>No solutions available</p>
                ) : (
                    solList.map((solution, index) => (
                        <div key={index} className='bg-gray-100 p-4 mb-2 rounded-lg grid grid-flow-col grid-cols-10 items-center pl-4'>
                            <NavLink 
                            onClick={setCurrentSolutionData(solution)}
                            to={`${solution._id}`}
                            className={({isActive}) => 
                                `${isActive ? "text-blue-700 border-l-4 border-blue-700 rounded-md":""}  block font-bold text-lg text-center col-span-9`
                                }>Solution {index + 1}
                            </NavLink>
                            <span 
                            onClick={() => handleDeletesolution(solution._id)}
                            className='items-center pl-2 hover:text-red-600 transition-all duration-300 ease-in-out'>
                                {deleting ? <CircularProgress/> : <FaRegTrashCan size={20}/>}
                            </span>
                            
                        </div>
                    ))
                )}
            </div>
            <div className='w-2/3 h-[85vh] overflow-auto bg-white rounded-xl shadow-md p-4 mt-8 scrollbar-custom2'>
                <Outlet />
            </div>
        </div>
    );
}

export default SolutionListComponent;