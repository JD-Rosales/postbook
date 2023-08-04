import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

const isFollowing = (id: number) => {
  return request({ url: `follow/${id}` });
};

export const useIsFollowing = (id: number) => {
  return useQuery(['following', id], () => isFollowing(id), {
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
