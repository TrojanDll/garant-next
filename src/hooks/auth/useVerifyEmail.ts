import { authService } from "@/services/auth.service";
import { IVerifyEmailRequest } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useVerifyEmail() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: (data: IVerifyEmailRequest) => authService.verifyEmail(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["verifyEmail"],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    },
  });

  return {
    mutate,
    isPending,
    data,
    isSuccess,
    isError,
  };
}
