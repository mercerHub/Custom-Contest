import React from 'react'

function ProblemCard({problemName,problemIndex,activeProblem,problemId}) {
    
    return (
        
        <>
            <div className={`${activeProblem === problemId? "bg-teal-700" : "bg-black hover:shadow-md hover:shadow-teal-600"} text-gray-300 p-5 rounded-xl text-xl text-center border border-teal-700  select-none hover:cursor-pointer`}
            >
               {problemIndex} . {problemName}
            </div>
        </>
    )
}

export default ProblemCard
