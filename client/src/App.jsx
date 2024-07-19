// src/App.jsx
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './components/Routes/Home';
import Login from './components/Routes/Login';
import { AuthContextProvider } from './contexts/UserContext';
import Register from './components/Routes/Register';
import Problems from './components/Routes/Problems';
import Problem from './components/Routes/Problem';
import { CurrentProblemProvider } from './contexts/CurrentProblemContext.jsx';
import Contests from './components/Routes/Contests.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'problems',
        element: <Problems/>,
        children:[
          {
            path:'/problems/:problemId',
            element:<Problem/>
          }
        ]
      },
      {
        path: 'contests',
        element: <Contests/>
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const App = () => {
  const [user, setUser] = useState(null);
  const codecacheKeyInLocal = 'codecacheKeyInLocal';

  useEffect(() => {
    const userFromLocal = JSON.parse(localStorage.getItem(codecacheKeyInLocal));
    if (userFromLocal) {
      setUser(userFromLocal);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(codecacheKeyInLocal, JSON.stringify(user));
    }
  }, [user]);

  const login = (user) => {
    localStorage.setItem(codecacheKeyInLocal, JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(codecacheKeyInLocal);
    if(localStorage.getItem("currentProblem")) {
      localStorage.removeItem("currentProblem");
    }
    setUser(null);
  };

  const register = (user) => {
    setUser(user);
  };

  return (
    <AuthContextProvider value={{ user, login, logout, register }}>
      <CurrentProblemProvider>
        <RouterProvider router={router} />
      </CurrentProblemProvider>
    </AuthContextProvider>
  );
};

export default App;
