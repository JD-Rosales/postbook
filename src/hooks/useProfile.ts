import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

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
  profilePhoto: string | null;
  coverPhoto: string | null;
}) => {
  return request({ url: '/user/profile', method: 'put', data });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', data?.data?.userId]);
    },
    onError: (error: ErrResponse) => error,
  });
};
