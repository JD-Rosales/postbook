import { useMutation } from '@tanstack/react-query';
import { request, ErrResponse } from '@lib/axios-interceptor';

const createPost = (data: {
  text: string | null | undefined;
  photo: string | null | undefined;
}) => {
  return request({ url: '/post', method: 'post', data });
};

export const useCreatePost = () => {
  //   const queryClient = useQueryClient();
  return useMutation(createPost, {
    onError: (error: ErrResponse) => {
      return error;
    },
  });
};
