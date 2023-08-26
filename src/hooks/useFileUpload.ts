import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { ErrResponse } from '@lib/axios-interceptor';
import axios from 'axios';

export const useFileUpload = (key: number) => {
  const [progress, setProgress] = useState<number>(0);

  const mutation = useMutation({
    mutationKey: ['fileUpload', key],
    mutationFn: async (img: string) => {
      const cloudinaryForm = new FormData();
      const cloudName = 'dachbgiue';
      cloudinaryForm.append('file', img);

      cloudinaryForm.append('upload_preset', 'gej93vyl');
      return axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        cloudinaryForm,
        {
          onUploadProgress: function (progressEvent) {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );
    },
    onError: (error: ErrResponse) => error,
  });

  return {
    ...mutation,
    progress,
  };
};
