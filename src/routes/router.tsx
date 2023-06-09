/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Spinner from '@components/Spinner';
import { useGetUser } from '@src/hooks/useAuth';

const BaseLayout = lazy(() => import('../layout/BaseLayout'));
const ErrorPage = lazy(() => import('@pages/Error'));
const Signup = lazy(() => import('@pages/Signup'));
const Login = lazy(() => import('@pages/Login'));
const Home = lazy(() => import('@pages/Home'));
const Test = lazy(() => import('@pages/Test'));

const Router = () => {
  const UserDetails = useGetUser();

  return createBrowserRouter([
    {
      path: '/',
      element: UserDetails.isLoading ? (
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
          path: 'test',
          element: <Test />,
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
