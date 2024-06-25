import { $api } from "@/lib/api/instance";
import { useMutation } from "@tanstack/react-query";

export interface LoginBody {
  login: string;
  password: string;
}
export interface LoginResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export const useLogin = (onSuccessCallback: () => void) => {
  const { mutate, data, isPending, isSuccess, isError } = useMutation({
    mutationFn: (data: LoginBody) =>
      $api.post<LoginResponse>("user/login", data),
    onSuccess: onSuccessCallback,
  });
  return { mutate, data, isPending, isSuccess, isError };
};
