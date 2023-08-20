/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useVerifyToken } from '@src/hooks/useAuth';
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Spinner from '@components/Spinner';

const BaseLayout = lazy(() => import('../layout/BaseLayout'));
const ErrorPage = lazy(() => import('@pages/Error'));
const Signup = lazy(() => import('@pages/Signup'));
const Login = lazy(() => import('@pages/Login'));

const Router = () => {
  const tokenVerification = useVerifyToken();

  return createBrowserRouter([
    {
      path: '/',
      element: tokenVerification.isLoading ? (
        <Spinner />
      ) : tokenVerification.isSuccess ? (
        <>
          <BaseLayout />
        </>
      ) : (
        <Navigate to='/login' />
      ),
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
