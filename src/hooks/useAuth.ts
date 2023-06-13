import { useQuery, useMutation } from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

const getUser = () => {
  return request({ url: '/user' });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });
};

const login = (data: { email: string; password: string }) => {
  return request({ url: '/user/login', method: 'post', data });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
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
