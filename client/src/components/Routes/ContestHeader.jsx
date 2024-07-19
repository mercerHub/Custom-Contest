import React from 'react'

function ContestHeader({id,name,problems}) {  
    console.log(name);
    return (
        <>
            <div className={`bg-black hover:shadow-md hover:shadow-teal-600 text-gray-300 p-5 rounded-xl text-xl px-10 border border-teal-700 w-full select-none hover:cursor-pointer logoText text-center`}>
                <span className='logoText-notlogo font-medium text-gray-300'>{id}. </span> 
                <span className='logoText'>{name}</span>
            </div>
        </>
    )
}

export default ContestHeader
