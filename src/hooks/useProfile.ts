import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

interface UserProfile {
  data: UserProfileType;
}

export const useGetProfile = (id?: string): UseQueryResult<UserProfile> => {
  const getProfile = () => request({ url: `profile/${id}` });

  return useQuery(['user', id], getProfile, {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

const updateProfile = (data: {
  firstName: string;
  middleName: string;
  lastName: string;
  profilePhoto: string | null;
  profilePublicId: string | null;
  coverPhoto: string | null;
  coverPublicId: string | null;
}) => {
  return request({ url: '/profile', method: 'put', data });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', data?.data?.userId.toString()]);
    },
    onError: (error: ErrResponse) => error,
  });
};
