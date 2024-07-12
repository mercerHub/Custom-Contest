import React, { useState } from 'react'
import LoginForm from '../Forms/LoginForm';
import useAuth from '../../contexts/UserContext';


function Login() {

    const {user} = useAuth()

    return (
        <>
            <LoginForm />
        </>
    )
}

export default Login
