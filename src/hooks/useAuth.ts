import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

type verifiedTokenResult = {
  data: { id: number; email: string };
};

const verifyToken = () => {
  return request({ url: '/user' });
};

export const useVerifyToken = (): UseQueryResult<verifiedTokenResult> => {
  return useQuery(['user'], verifyToken, {
    onError: () => {
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
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      const data2 = { data: data.data };
      queryClient.setQueriesData(['user'], data2);
    },
    onError: (error: ErrResponse) => {
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
