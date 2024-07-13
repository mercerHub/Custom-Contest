import React from 'react'

function Card({icon,text,handleOnClick}) {
    return (
        <div className='h-1/2 w-1/2 md:w-2/5 lg:w-1/4 bg-black text-purple-300 rounded-lg border border-t-1 border-teal-100 shadow-md shadow-slate-500 flex flex-col items-center pt-10 gap-3 hover:border-teal-300 hover:text-teal-50 hover:drop-shadow-lg hover:shadow-lg hover:shadow-teal-500
        transition-all duration-300 ease-in-out hover:cursor-pointer'
            onClick = {handleOnClick}
        >
            <div className='text-[170px]'>{icon}</div>
            <div className='text-5xl'>{text}</div>
        </div>
    )
}

export default Card
