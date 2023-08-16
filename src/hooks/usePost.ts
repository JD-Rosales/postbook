import {
  useMutation,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';
import { PostAuthor } from '@src/types/post';

const createPost = (data: {
  text: string | null | undefined;
  photo: string | null | undefined;
}) => request({ url: '/post', method: 'post', data });

export const useCreatePost = () => {
  return useMutation(createPost, {
    onError: (error: ErrResponse) => {
      return error;
    },
  });
};

const deletePost = (data: { postId: number }) =>
  request({ url: `/post/${data.postId}`, method: 'delete', data });

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePost, {
    onError: (error: ErrResponse) => error,
    onSuccess: (data) => {
      const authorId = data.data.authorId;
      queryClient.prefetchInfiniteQuery(['posts', 'user', authorId.toString()]);
    },
  });
};

type PostResultType = {
  data: PostAuthor;
};

export const useGetPost = (
  postId: number,
  enabled = false
): UseQueryResult<PostResultType, Error> => {
  const getPost = () => request({ url: `/post/${postId}` });

  return useQuery(['post', postId], getPost, {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: enabled,
  });
};

const sharePost = (data: { text: string | null | undefined; postId: number }) =>
  request({ url: '/post/share', method: 'post', data });

export const useSharePost = () => {
  const queryClient = useQueryClient();
  return useMutation(sharePost, {
    onError: (error: ErrResponse) => error,
    onSuccess: (data) => {
      const authorId = data.data.authorId;
      queryClient.prefetchInfiniteQuery(['posts', 'user', authorId.toString()]);
    },
  });
};
export interface InfiniteQueryPostResponse {
  data: PostAuthor[];
}

export const useUserPosts = (
  userId?: string
): UseInfiniteQueryResult<InfiniteQueryPostResponse, Error> => {
  const fetchUserPosts = async ({ pageParam }: { pageParam?: unknown }) =>
    request({ url: `/post/user/${userId}?cursor=${pageParam}` });

  return useInfiniteQuery({
    queryKey: ['posts', 'user', userId],
    queryFn: fetchUserPosts,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.data[lastPage.data.length - 1];
      return lastPost?.id;
    },
  });
};

const fetchFollowedPosts = ({
  pageParam = undefined,
}: {
  pageParam?: unknown;
}) => request({ url: `/post/followed/?cursor=${pageParam}` });

export const usePosts = (): UseInfiniteQueryResult<
  InfiniteQueryPostResponse,
  Error
> =>
  useInfiniteQuery({
    queryKey: ['posts', 'home'],
    queryFn: fetchFollowedPosts,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.data[lastPage.data.length - 1];
      // return the post id as cursor for the request
      return lastPost?.id;
    },
  });
