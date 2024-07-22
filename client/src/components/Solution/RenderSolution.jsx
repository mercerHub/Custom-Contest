import React, { useEffect, useState } from 'react';
import { useCurrentSolution } from '../../contexts/CurrentSolutionContext';
import { Editor } from '@monaco-editor/react';

function RenderSolution() {
    const { currentSolution } = useCurrentSolution();
    const [solution, setSolution] = useState(null);
    


    useEffect(() => {
        if (currentSolution) {
            setSolution(currentSolution);
        }
    }, [currentSolution]);

    

    if (!solution) {
        return <p className='text-gray-500 text-center'>Solution not found or not selected</p>;
    }

    return (
        <div className='p-4 h-[85vh] flex flex-col gap-4 scrollbar-custom2'>
            <h2 className='text-2xl font-bold text-center'>Solution Details</h2>
            <div className='bg-gray-100 rounded-md p-4 flex flex-col gap-2'>
                <h3 className='text-xl font-semibold'>Plan:</h3>
                <pre className='bg-white rounded-md p-2 min-h-[10vh]'>{solution?.solutionData?.plan}</pre>
            </div>
            <pre className='bg-gray-100 p-4 rounded-md text-xl font-semibold'>
                Code:
                <Editor
                    value={solution?.solutionData?.code}
                    height={250}
                    language='cpp'
                    theme='vs-dark'
                    options={{
                        readOnly: true,
                        automaticLayout: true, // Optional: Adjusts layout automatically to fit the container
                        cursorStyle: 'block'
                      }} 
                
                >
                    
                </Editor>
            </pre>
            <div className='bg-gray-100 rounded-md p-4 flex flex-col gap-2'>
                <h3 className='text-xl font-semibold'>Explanation:</h3>
                <pre className='bg-white rounded-md p-2 min-h-[10vh]'>{solution?.solutionData?.explanation}</pre>
            </div>
            <div className='bg-gray-100 rounded-md p-4 flex flex-col gap-2'>
                <h3 className='text-xl font-semibold'>Analysis:</h3>
                <pre className='bg-white rounded-md p-2 min-h-[10vh]'>{solution?.solutionData?.anslysis}</pre>
            </div>
        </div>
    );
}

export default RenderSolution;
