import { useQuery, useMutation } from '@tanstack/react-query';
import { ErrResponse } from '@lib/axios-interceptor';
import axios from 'axios';

// return axios.post('httpbin.org/post', formData, {
//   onUploadProgress: function (progressEvent) {
// var percentCompleted = Math.round(
//   (progressEvent.loaded * 100) / progressEvent.total
// );
// setCompleted(percentCompleted);
//   },
// });

const fileUpload = (img: string) => {
  const cloudinaryForm = new FormData();
  const cloudName = 'dachbgiue';
  cloudinaryForm.append('file', img);
  cloudinaryForm.append('upload_preset', 'gej93vyl');
  return axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    cloudinaryForm,
    {
      onUploadProgress: function (progressEvent) {
        console.log('');
        //   let percentCompleted = Math.round(
        //     (progressEvent.loaded * 100) / progressEvent.total
        //   );
        //   setCompleted(percentCompleted);
      },
    }
  );
};

export const useFileUpload = () => {
  return useMutation({
    mutationFn: fileUpload,
    onError: (error: ErrResponse) => error,
  });
};
