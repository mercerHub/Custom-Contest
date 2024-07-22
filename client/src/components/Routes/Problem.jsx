import React, { useEffect, useState } from 'react';
import { useCurrentProblem } from '../../contexts/CurrentProblemContext';
import { DNA } from 'react-loader-spinner';
import problemParserCF from '../../utils/problemParser';
import { IoAddSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';


function Problem() {
    const { currentProblem } = useCurrentProblem();
    const [currentProblemData, setCurrentProblemData] = useState(null);
    const navigate = useNavigate();

    const handlePlusClick = () =>{
        navigate(`/problem/solution/${encodeURIComponent(currentProblem.id)}`);
    }
    const handleSolutionListClick = () =>{
        navigate(`/problem/getSolution/${encodeURIComponent(currentProblem.id)}`);
    }

    useEffect(() => {
        if (!currentProblem || !currentProblem.id) {
            setCurrentProblemData(null);
        } else {
            setCurrentProblemData(currentProblem);
        }
    }, [currentProblem]);

    const ParsedStatement = currentProblemData ? problemParserCF(currentProblemData.statement) : null;

    return (
        currentProblem ? (
            <div className='bg-slate-200 max-h-[90vh] border w-2/3 rounded-xl m-3 problem-statement p-6 overflow-auto scrollbar-custom2 relative'>
                <div dangerouslySetInnerHTML={{ __html: ParsedStatement }}/>
                <div className='absolute border z-999 top-10 right-5 text-xl h-fit w-fit flex flex-col gap-1 items-center justify-center'>
                    <div
                    onClick={handlePlusClick}
                    className='text-xl rounded-full p-2 hover:bg-gray-400 transition-all ease-in-out duration-500'><IoAddSharp size={40}/></div>
                    <div 
                    onClick={handleSolutionListClick}
                    className=' text-xl rounded-full p-2 hover:bg-gray-400 transition-all ease-in-out duration-500'><CiViewList size={40}/></div>
                </div>
                
            </div>
        ) : (
            <div className='flex justify-center items-center h-[85vh] w-2/3 bg-black overflow-hidden rounded-xl m-3'>
                <DNA height={80} width={80} />
            </div>
        )
    );
}

export default Problem;
