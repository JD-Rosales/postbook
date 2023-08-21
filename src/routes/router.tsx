/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@pages/Home';
import Profile from '@pages/Profile';

const BaseLayout = lazy(() => import('../layout/BaseLayout'));
const ErrorPage = lazy(() => import('@pages/Error'));
const Signup = lazy(() => import('@pages/Signup'));
const Login = lazy(() => import('@pages/Login'));

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/user/:id',
          element: <Profile />,
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'signup',
      element: <Signup />,
    },
  ]);
};

export default Router;
