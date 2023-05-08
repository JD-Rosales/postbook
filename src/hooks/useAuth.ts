import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@lib/axios-utils";

const getUser = () => {
  return request({ url: "/user" });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

const login = (data: { email: string; password: string }) => {
  return request({ url: "/login", method: "post", data });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
};
