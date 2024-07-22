import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useAuth from '../../contexts/UserContext';
import { server } from '../../constants';
import { Triangle } from 'react-loader-spinner';
import SolutionListComponent from './SolutionListComponent';

function DisplaySolution() {
    const { user } = useAuth();
    const { problemId } = useParams();
    
    const [loading, setLoading] = useState(false);
    const [solutionList, setSolutionList] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchSolutions = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`${server}/user/getSolutions`, {
                    userId: user._id,
                    problemId
                }, {
                    withCredentials: true
                });
                const fetchedSolutions = response.data.data;

                if (!fetchedSolutions) {
                    setSolutionList([]);
                    console.log("No Solutions to display !!");
                } else {
                    // Convert object of objects to array of objects
                    const solutionsArray = Object.values(fetchedSolutions);
                    setSolutionList(solutionsArray);
                }
                console.log(fetchedSolutions);
            } catch (err) {
                console.log(err);
                setSolutionList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSolutions();
    }, [user, problemId]);

    return (
        <div className='flex justify-center items-center h-[85vh] p-5'>
            {loading || (!user) ? (
                <Triangle color='white' height={140} width={150} />
            ) : (
                <SolutionListComponent solutionList={solutionList} />
            )}
        </div>
    );
}

export default DisplaySolution;
