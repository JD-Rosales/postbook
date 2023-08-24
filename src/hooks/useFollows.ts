import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

interface UserProfile {
  data: UserProfileType[];
}

type isFollowingRes = {
  data: boolean;
};

export const useIsFollowing = (id: string): UseQueryResult<isFollowingRes> => {
  const isFollowing = () => {
    return request({ url: `follow/${id}` });
  };
  return useQuery(['following', id], isFollowing, {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

const followUser = (data: { followingId: string }) => {
  return request({ url: '/follow', method: 'post', data });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: followUser,
    onSuccess: (data) => {
      const id = data.data.followingId.toString();
      queryClient.invalidateQueries(['following', id]);
    },
    onError: (error: ErrResponse) => error,
  });
};

const unFollowUser = (data: { followingId: string }) => {
  return request({ url: '/follow', method: 'delete', data });
};

export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unFollowUser,
    onSuccess: (data) => {
      const id = data.data.followingId.toString();
      queryClient.invalidateQueries(['following', id]);
    },
    onError: (error: ErrResponse) => error,
  });
};

export const useUserFollowers = (
  id: string
): UseQueryResult<UserProfile, Error> => {
  const followers = () => request({ url: `/follow/followers/${id}` });

  return useQuery(['followers', id], followers);
};
