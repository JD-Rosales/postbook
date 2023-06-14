/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Spinner from '@components/Spinner';
import { useGetUser } from '@src/hooks/useAuth';

const BaseLayout = React.lazy(() => import('../layout/BaseLayout'));
const Sidebar = React.lazy(() => import('../layout/Sidebar'));
const ErrorPage = React.lazy(() => import('@pages/Error'));
const Signup = React.lazy(() => import('@pages/Signup'));
const Login = React.lazy(() => import('@pages/Login'));

const Router = () => {
  const UserDetails = useGetUser();

  return createBrowserRouter([
    {
      path: '/',
      element: UserDetails.isLoading ? (
        <Spinner />
      ) : UserDetails.isSuccess ? (
        <>
          <Sidebar />
          <BaseLayout />
        </>
      ) : (
        <Navigate to='/login' />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'child',
          element: <div>child route</div>,
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
