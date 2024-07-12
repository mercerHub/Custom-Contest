// src/App.jsx
import React from 'react';
import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './components/Routes/Home';
import Login from './components/Routes/Login';
import { AuthContextProvider } from './contexts/UserContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
    const [user,setUser] = useState('');
    const login = (user) => {
        localStorage.setItem('user',JSON.stringify(user));
        setUser(user);
    }
    const logout = () => {
        localStorage.removeItem('user');
        setUser('');
    }
    const register = (user) => {
        setUser(user);
    }

  return (
    <AuthContextProvider value={{user,login,logout,register}}>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
