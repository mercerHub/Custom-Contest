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
import ContestProblems from './components/Routes/ContestProblems.jsx';
import SolutionComponent from './components/Solution/SolutionComponent.jsx';
import 'highlight.js/styles/github.css';
import SolutionForm from './components/Forms/SolutionForm.jsx';
import DisplaySolution from './components/Solution/DisplaySolution.jsx';
import { CurrentSolutionProvider } from './contexts/CurrentSolutionContext.jsx';
import RenderSolution from './components/Solution/RenderSolution.jsx';

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
        element: <Problems />,
        children: [
          {
            path: ':problemId',
            element: <Problem />,
          },
        ],
      },
      {
        path: 'contests',
        element: <Contests />,
        children: [],
      },
      {
        path: 'contests/:id',
        element: <ContestProblems />,
        children:[
          {
            path:':problemId',
            element: <Problem/>
          }

        ]
      },
      {
        path:'problem/solution/:problemId',
        element:<SolutionForm/>
      },
      {
        path:'problem/getSolution/:problemId',
        element:<DisplaySolution/>,
        children:[
          {
            path:':solutionId',
            element:<RenderSolution/>
          }
        ]
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
  const [contests, setContests] = useState(user?.contests || []);
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
      setContests(user.contests);
    } else {
      setContests([]);
    }
  }, [user]);

  const login = (user) => {
    localStorage.setItem(codecacheKeyInLocal, JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(codecacheKeyInLocal);
    if (localStorage.getItem('currentProblem')) {
      localStorage.removeItem('currentProblem');
    }
    setUser(null);
  };

  const register = (user) => {
    setUser(user);
  };

  const addContest = (contestData) => {
    const updatedContests = [...contests, contestData];
    setContests(updatedContests);
    setUser({ ...user, contests: updatedContests });
  };

  const removeContest = (contestData) => {
    const updatedContests = contests.filter((contest) => contest.toString() !== contestData.toString());
    setContests(updatedContests);
    setUser({ ...user, contests: updatedContests });
  };

  return (
    <AuthContextProvider value={{ user, login, logout, register, addContest, removeContest }}>
      <CurrentProblemProvider>
        <CurrentSolutionProvider>
          <RouterProvider router={router} />
        </CurrentSolutionProvider>
      </CurrentProblemProvider>
    </AuthContextProvider>
  );
};

export default App;
