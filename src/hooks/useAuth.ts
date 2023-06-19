import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

const getUser = () => {
  return request({ url: '/user' });
};

export const useGetUser = () => {
  return useQuery(['user'], getUser, {
    onSuccess: (data) => {
      if (data.token) localStorage.setItem('token', data.token);
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

const login = (data: { email: string; password: string }) => {
  return request({ url: '/user/login', method: 'post', data });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      // queryClient.invalidateQueries(['user']);
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
