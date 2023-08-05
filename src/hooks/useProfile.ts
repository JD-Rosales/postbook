import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';
import { UserType, ProfileType } from '@src/types/user';

const getProfile = (id: number) => {
  return request({ url: `profile/${id}` });
};

interface UserProfile {
  data: UserType & {
    profile: ProfileType | null;
  };
}

export const useGetProfile = (id: number): UseQueryResult<UserProfile> => {
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
  return request({ url: '/profile', method: 'put', data });
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
