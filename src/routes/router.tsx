/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Spinner from '@components/Spinner';
import { useGetUser } from '@src/hooks/useAuth';
import Home from '@pages/Home';
import Profile from '@pages/Profile';
import Test from '@pages/Test';

const BaseLayout = lazy(() => import('../layout/BaseLayout'));
const ErrorPage = lazy(() => import('@pages/Error'));
const Signup = lazy(() => import('@pages/Signup'));
const Login = lazy(() => import('@pages/Login'));

const Router = () => {
  const UserDetails = useGetUser();

  return createBrowserRouter([
    {
      path: '/',
      element: UserDetails.isLoading ? (
        // Spinner not center to be fix later
        <Spinner />
      ) : UserDetails.isSuccess ? (
        <BaseLayout />
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
          path: ':profile',
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
