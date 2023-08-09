import {
  useMutation,
  useInfiniteQuery,
  UseInfiniteQueryResult,
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

export interface InfiniteQueryPostResponse {
  data: PostAuthor[];
}

export const useUserPosts = (
  userId: number
): UseInfiniteQueryResult<InfiniteQueryPostResponse, Error> => {
  const fetchUserPosts = async ({ pageParam }: { pageParam?: unknown }) =>
    request({ url: `/post/${userId}?cursor=${pageParam}` });

  return useInfiniteQuery({
    queryKey: ['posts', userId],
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
}) => request({ url: `post?cursor=${pageParam}` });

export const usePosts = (): UseInfiniteQueryResult<
  InfiniteQueryPostResponse,
  Error
> =>
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchFollowedPosts,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.data[lastPage.data.length - 1];
      // return the post id as cursor for the request
      return lastPost?.id;
    },
  });
