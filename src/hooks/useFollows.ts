import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';
import { UserProfileType } from '@src/types/user';

interface UserProfile {
  data: UserProfileType;
}

export const useIsFollowing = (id: number) => {
  const isFollowing = () => {
    return request({ url: `follow/${id}` });
  };
  return useQuery(['following', id], isFollowing, {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

const followUser = (data: { followingId: number }) => {
  return request({ url: '/follow', method: 'post', data });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: followUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['following', data?.data?.followingId]);
    },
    onError: (error: ErrResponse) => error,
  });
};

const unFollowUser = (data: { followingId: number }) => {
  return request({ url: '/follow', method: 'delete', data });
};

export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unFollowUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['following', data?.data?.followingId]);
    },
    onError: (error: ErrResponse) => error,
  });
};

export const useUserFollowers = (
  id: number
): UseQueryResult<UserProfile, Error> => {
  const followers = () => request({ url: `/follow/followers/${id}` });

  return useQuery(['followers', id], followers);
};
