import React, { useEffect, useState } from 'react';
import useAuth from '../../contexts/UserContext';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../constants';
import ProblemCard from '../FancyComponents/ProblemCard';
import { DNA } from 'react-loader-spinner';
import { useCurrentProblem } from '../../contexts/CurrentProblemContext.jsx';
import { useNavigate } from 'react-router-dom';

function Problems() {
    const { user } = useAuth();
    const {setCurrentProblemData} = useCurrentProblem()
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeProblem, setActiveProblem] = useState(null);
    const navigate = useNavigate();
    
    const handleClick = (problemId,problemStmt) => {
        setCurrentProblemData({ id: problemId, statement: problemStmt });
        setActiveProblem(problemId);
    }

    useEffect(() => {
        const fetchProblems = async () => {
            if (user && Array.isArray(user.problems) && user.problems.length > 0) {
                try {
                    console.log('Fetching problems for user:', user.problems);
                    const problemPromises = user.problems.map((problemId) =>
                        axios.post(`${server}/fetchProblems`, { problemId }, { withCredentials: true })
                    );

                    const problemResponses = await Promise.all(problemPromises);
                    const fetchedProblems = problemResponses.map(response => response.data.data);
                    console.log('Fetched problems:', fetchedProblems);
                    setProblems(fetchedProblems);
                } catch (error) {
                    console.error('Error fetching problems:', error);
                } finally {
                    setLoading(false);  // Set loading to false after fetching is complete
                }
            } else {
                console.log('No problems found for user');
                setProblems([]);
                setLoading(false);  // Set loading to false if no problems
            }
        };

        fetchProblems();
    }, [user]);

    return (
        <>{!user? navigate('/login'):
        <div className='flex gap-5 m-2 max-h-[90vh]'>
            <div className='w-1/3 flex flex-col p-4 gap-4'>
                <h1 className='text-white p-5 bg-black rounded-xl text-2xl text-center logoText border border-teal-700 shadow-md shadow-teal-700 select-none'>
                    PROBLEMS
                </h1>
                <div className='overflow-y-auto flex gap-4 flex-col scrollbar-custom'>
                    {loading ? (
                        <DNA/>
                    ) : (
                        problems.map((problem) => (
                            <Link key={problem._id}
                            to={`/problems/:${encodeURIComponent(problem._id)}`}
                            onClick={() => handleClick(problem._id,problem.problemStatement)}
                            >
                                <ProblemCard problemName={problem.name} problemIndex={problem.index} problemId={problem._id} activeProblem={activeProblem}/>
                            </Link>
                        ))
                    )}
                    
                </div>
                
            </div>
                
            <Outlet />
        </div>
        }</>
    );
}

export default Problems;