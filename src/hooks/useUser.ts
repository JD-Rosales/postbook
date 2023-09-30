import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

type UserProfile = {
  data: UserProfileType;
};

type InfiniteQueryUserProfile = {
  data: UserProfileType[];
};

export const useGetProfile = (id?: string): UseQueryResult<UserProfile> => {
  const getProfile = () => request({ url: `user/${id}` });

  return useQuery(['user', id], getProfile, {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

const updateProfile = (data: {
  firstName: string;
  middleName: string;
  lastName: string;
}) => {
  return request({ url: '/user', method: 'put', data });
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

const updateProfilePhoto = (data: {
  profilePhoto: string;
  profilePublicId: string;
}) => {
  return request({ url: '/user/profile-photo', method: 'put', data });
};

export const useUpdateProfilePhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfilePhoto,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', data?.data?.userId.toString()]);
      queryClient.prefetchInfiniteQuery([
        'posts',
        'user',
        data?.data?.userId.toString(),
      ]);
    },
    onError: (error: ErrResponse) => error,
  });
};

const updateCoverPhoto = (data: {
  coverPhoto: string;
  coverPublicId: string;
}) => {
  return request({ url: '/user/cover-photo', method: 'put', data });
};

export const useUpdateCoverPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCoverPhoto,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user', data?.data?.userId.toString()]);
      queryClient.prefetchInfiniteQuery([
        'posts',
        'user',
        data?.data?.userId.toString(),
      ]);
    },
    onError: (error: ErrResponse) => error,
  });
};

const searchUser = ({
  pageParam = undefined,
  filter = '',
}: {
  pageParam?: unknown;
  filter?: string;
}) => request({ url: `/user/search/?cursor=${pageParam}&filter=${filter}` });

export const useSearchUser = (
  filter: string
): UseInfiniteQueryResult<InfiniteQueryUserProfile, Error> =>
  useInfiniteQuery({
    queryKey: ['searched', 'user'],
    queryFn: (context) => searchUser({ ...context, filter }),
    enabled: filter.length >= 3 ? true : false,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost?.id;
    },
  });
