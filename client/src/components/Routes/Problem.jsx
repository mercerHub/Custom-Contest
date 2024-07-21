import React, { useEffect, useState } from 'react';
import { useCurrentProblem } from '../../contexts/CurrentProblemContext';
import { DNA } from 'react-loader-spinner';
import problemParserCF from '../../utils/problemParser';

function Problem() {
    const { currentProblem } = useCurrentProblem();
    const [currentProblemData, setCurrentProblemData] = useState(null);

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
            <div 
                className='bg-slate-200 max-h-[90vh] border w-2/3 rounded-xl m-3 problem-statement p-6 overflow-auto scrollbar-custom2'
                dangerouslySetInnerHTML={{ __html: ParsedStatement }}
            />
        ) : (
            <div className='flex justify-center items-center h-[85vh] w-2/3 bg-black overflow-hidden rounded-xl m-3'>
                <DNA height={80} width={80} />
            </div>
        )
    );
}

export default Problem;
