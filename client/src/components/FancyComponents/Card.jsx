import React from 'react'

function Card({icon,text}) {
    return (
        <div className='h-1/2 w-1/5 bg-black text-white rounded-lg border border-t-1 border-teal-100 shadow-md shadow-slate-500 flex flex-col items-center pt-10'>

            <div className='text-[170px] text-purple-300'>{icon}</div>
            <div className='text-3xl'>{text}</div>
        </div>
    )
}

export default Card
