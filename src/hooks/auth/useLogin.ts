import { authService } from "@/services/auth.service";
import { ILoginForm, IRegistrationFormApiData } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLoginPending,
    data: loginResponse,
    isSuccess: isLoginSuccess,
    isError: isLoginError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILoginForm) => authService.login(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
    },
  });

  return {
    login,
    isLoginPending,
    loginResponse,
    isLoginSuccess,
    isLoginError,
  };
}
