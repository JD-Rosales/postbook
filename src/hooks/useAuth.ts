import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';
import { useContext } from 'react';
import { AuthContext } from '@src/contexts/AuthContext';

const verifyToken = () => {
  return request({ url: '/user' });
};

export const useVerifyToken = () => {
  const { setAuthContextValue } = useContext(AuthContext);
  return useQuery(['user'], verifyToken, {
    onSuccess: () => {
      setAuthContextValue((prev) => ({
        ...prev,
        isAuthenticated: true,
      }));
      // if (data.token) localStorage.setItem('token', data.token);
    },
    onError: () => {
      setAuthContextValue((prev) => ({
        ...prev,
        isAuthenticated: false,
      }));
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
  const { setAuthContextValue } = useContext(AuthContext);
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      setAuthContextValue((prev) => ({
        ...prev,
        isAuthenticated: true,
      }));
      localStorage.setItem('token', data.token);
      const data2 = { data: data.data };
      queryClient.setQueriesData(['user'], data2);
    },
    onError: (error: ErrResponse) => error,
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
