import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';

const CurrentSolutionContext = createContext();

export const useCurrentSolution = () => {
    return useContext(CurrentSolutionContext);
};

export const CurrentSolutionProvider = ({ children }) => {
    const [currentSolution, setCurrentSolution] = useState({
        plan: "",
        explanation:"",
        analysis:"",
        code:"", 
    });

    const setCurrentSolutionData = (solutionData) => {
        setCurrentSolution(solutionData);
    };
    useEffect(() => {
        localStorage.setItem('currentSolution', JSON.stringify(currentSolution));
    }, [currentSolution]);
    

    useEffect(() => {
        const storedSolution = localStorage.getItem('currentSolution');
        if (storedSolution) {
            setCurrentSolution(JSON.parse(storedSolution));
        }
    }, []);
    return (
        <CurrentSolutionContext.Provider value={{ currentSolution, setCurrentSolutionData }}>
            {children}
        </CurrentSolutionContext.Provider>
    );
};