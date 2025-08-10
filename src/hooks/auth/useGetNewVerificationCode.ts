import { authService } from "@/services/auth.service";
import { IGetNewVerificationCodeRequest } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetNewVerificationCode() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["getNewVerificationCode"],
    mutationFn: (data: IGetNewVerificationCodeRequest) =>
      authService.getNewVerificationCode(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getNewVerificationCode"],
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
