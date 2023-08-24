import {
  useMutation,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

const createPost = (data: {
  text: string | null | undefined;
  photo: string | null | undefined;
  photoPublicId: string | undefined;
}) => request({ url: '/post', method: 'post', data });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(createPost, {
    onError: (error: ErrResponse) => {
      return error;
    },
    onSuccess: (data) => {
      const authorId = data.data.authorId;
      queryClient.prefetchInfiniteQuery(['posts', 'user', authorId.toString()]);
    },
  });
};

const updatePost = (data: {
  postId: number;
  text?: string;
  photo?: string;
  photoPublicId?: string;
}) => request({ url: '/post', method: 'put', data });

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onError: (error: ErrResponse) => error,
    onSuccess: (data) => {
      const postId = data.data.id;
      queryClient.invalidateQueries(['post', postId]);
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
  postId: number
): UseQueryResult<PostResultType, Error> => {
  const getPost = () => request({ url: `/post/${postId}` });

  return useQuery(['post', postId], getPost, {
    refetchOnWindowFocus: false,
    retry: false,
  });
};

type TotalLikesType = {
  data: { likesCount: number; userHasLiked: boolean };
};

export const useGetTotalLIkes = (
  postId: number
): UseQueryResult<TotalLikesType, Error> => {
  const getTotalLikes = () => request({ url: `/post/likes/${postId}` });

  return useQuery(['post', 'totalLikes', postId], getTotalLikes, {
    refetchOnWindowFocus: false,
  });
};

const likePost = (data: { postId: number }) =>
  request({ url: '/post/like_post', method: 'post', data });

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(likePost, {
    onError: (error: ErrResponse) => error,
    onSuccess: (data) => {
      const postId = data.data.id;
      queryClient.invalidateQueries(['post', 'totalLikes', postId]);
    },
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
  data: { id: number }[];
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
    queryKey: ['posts', 'followed'],
    queryFn: fetchFollowedPosts,
    getNextPageParam: (lastPage) => {
      const lastPost = lastPage.data[lastPage.data.length - 1];
      // return the post id as cursor for the request
      return lastPost?.id;
    },
  });
