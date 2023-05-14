import { useQuery, useMutation } from '@tanstack/react-query';
import { request, ErrorResponse } from '@lib/axios-interceptor';

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
  return request({ url: '/login', method: 'post', data });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
    onError: (error: ErrorResponse) => error,
  });
};
