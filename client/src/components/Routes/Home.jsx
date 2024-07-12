import React, { useEffect, useState } from 'react'
import  useAuth from '../../contexts/UserContext';

function Home() {
    const { user } = useAuth();
    console.log(user);
    const [username, setUsername] = useState(user?.name || '');

    useEffect(() => {
        console.log(user);
        if(user){
            setUsername(user.name);
        }
        else{
            setUsername('');
        }
    },[user])

    return (
        <div className='text-white'>
            {username ? <h1>Welcome {username} !!</h1> : <h1>Welcome to CodeCache</h1>}
        </div>
        
    )
}

export default Home
