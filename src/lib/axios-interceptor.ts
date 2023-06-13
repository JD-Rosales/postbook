import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export interface ErrResponse {
  [key: string]: string;
}

const tokenString = localStorage.getItem('token');
const token = tokenString ? JSON.stringify(tokenString) : null;

export const request = async ({ ...options }: AxiosRequestConfig) => {
  if (token)
    client.defaults.headers.common.Authorization = `Bearer ${token.replace(
      /\\|"/g,
      ''
    )}`;

  const onSuccess = (response: AxiosResponse) => {
    // success callback here
    return response.data;
  };
  const onError = (error: AxiosError): ErrResponse => {
    // error callback here
    throw error?.response?.data;
  };

  return client(options).then(onSuccess).catch(onError);
};
