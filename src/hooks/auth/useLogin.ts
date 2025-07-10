import { saveTokenToStorage } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";
import { ILoginForm } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export type TLoginErrors = "" | "incorrect" | "unsubmited_email";

export function useLogin() {
  const queryClient = useQueryClient();

  const [loginError, setLoginError] = useState<TLoginErrors>("");

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
      saveTokenToStorage("123");
      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
      // window.location.reload();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 402) {
          setLoginError("unsubmited_email");
        } else {
          setLoginError("incorrect");
        }
      }
    },
  });

  return {
    login,
    isLoginPending,
    loginResponse,
    isLoginSuccess,
    isLoginError,
    loginError,
  };
}
