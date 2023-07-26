import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';
import { useContext } from 'react';
import { AuthContext } from '@src/contexts/AuthContext';

const verifyToken = () => {
  return request({ url: '/user' });
};

export const useVerifyToken = () => {
  const { setIsAuthenticated, setIsVerifying } = useContext(AuthContext);
  return useQuery(['user'], verifyToken, {
    onSuccess: () => {
      setIsVerifying(false);
      setIsAuthenticated(true);
    },
    onError: () => {
      setIsVerifying(false);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};

const login = (data: { email: string; password: string }) => {
  return request({ url: '/user/login', method: 'post', data });
};

export const useLogin = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      const data2 = { data: data.data };
      queryClient.setQueriesData(['user'], data2);
    },
    onError: (error: ErrResponse) => {
      setIsAuthenticated(false);
      return error;
    },
  });
};

const register = (data: { email: string; password: string }) => {
  return request({ url: '/user/register', method: 'post', data });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onError: (error: ErrResponse) => error,
  });
};
