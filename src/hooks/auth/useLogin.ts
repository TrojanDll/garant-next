import { saveTokenToStorage } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";
import useCurrientUser from "@/stores/user/currientUser";
import { ILoginForm } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useGetCurrientUserMutate } from "../user/useGetCurrientUserMutate";

export type TLoginErrors = "" | "incorrect" | "unsubmited_email";

export function useLogin() {
  const queryClient = useQueryClient();

  const [loginError, setLoginError] = useState<TLoginErrors>("");
  const setCurrientUser = useCurrientUser((state) => state.setUser);

  const {
    isPending: isCurrientUserPending,
    mutate: getCurrientUser,
    data: currientUserData,
  } = useGetCurrientUserMutate();

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
      // saveTokenToStorage("123");
      getCurrientUser();

      queryClient.invalidateQueries({
        queryKey: ["login"],
      });
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

  useEffect(() => {
    if (currientUserData) {
      console.log(currientUserData);
      setCurrientUser(currientUserData);
      window.location.reload();
    }
  }, [isCurrientUserPending]);

  return {
    login,
    isLoginPending,
    loginResponse,
    isLoginSuccess,
    isLoginError,
    loginError,
  };
}
