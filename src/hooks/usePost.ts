import {
  useMutation,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';
import { Post } from '@src/types/post';

const createPost = (data: {
  text: string | null | undefined;
  photo: string | null | undefined;
}) => {
  return request({ url: '/post', method: 'post', data });
};

export const useCreatePost = () => {
  return useMutation(createPost, {
    onError: (error: ErrResponse) => {
      return error;
    },
  });
};

const fetchPosts = ({ pageParam = undefined }: { pageParam?: number }) =>
  request({ url: `post?cursor=${pageParam}` });

interface FetchResponse {
  data: Post[];
}

export const usePosts = (): UseInfiniteQueryResult<FetchResponse, Error> =>
  useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.data[lastPage.data.length - 1];
      // return the post id as cursor for the request
      return lastPost?.id;
    },
  });
