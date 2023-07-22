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
    retry: false,
  });
};

const getProfile = (id: number) => {
  return request({ url: `user/${id}` });
};

export const useGetProfile = (id: number) => {
  return useQuery(['user', id], () => getProfile(id), {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

const updateProfile = (data: {
  firstName: string;
  middleName: string;
  lastName: string;
}) => {
  return request({ url: '/user/profile', method: 'put', data });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', 'profile', data?.data?.userId]);
    },
    onError: (error: ErrResponse) => error,
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
