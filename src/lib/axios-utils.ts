import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const tokenString = localStorage.getItem("token");
const token = tokenString ? JSON.stringify(tokenString) : null;

export const request = ({ ...options }: AxiosRequestConfig) => {
  if (token)
    client.defaults.headers.common.Authorization = `Bearer ${token.replace(
      /\\|"/g,
      ""
    )}`;

  const onSuccess = (response: AxiosResponse) => {
    console.log("response: ", response);
    return response;
  };
  const onError = (error: AxiosError) => {
    // error logginng here

    console.warn(error);
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
