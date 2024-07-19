// CurrentProblemContext.js
import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

const CurrentProblemContext = createContext();

export const useCurrentProblem = () => {
    return useContext(CurrentProblemContext);
};

export const CurrentProblemProvider = ({ children }) => {
    const [currentProblem, setCurrentProblem] = useState(null);

    const setCurrentProblemData = (problemData) => {
        setCurrentProblem(problemData);
    };
    useEffect(() => {
        localStorage.setItem('currentProblem', JSON.stringify(currentProblem));
    }, [currentProblem]);
    

    useEffect(() => {
        const storedProblem = localStorage.getItem('currentProblem');
        if (storedProblem) {
            setCurrentProblem(JSON.parse(storedProblem));
        }
    }, []);
    return (
        <CurrentProblemContext.Provider value={{ currentProblem, setCurrentProblemData }}>
            {children}
        </CurrentProblemContext.Provider>
    );
};
