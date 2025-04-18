import { recoveryService } from "@/services/recovery-service.service";
import { IRecoveryPasswordApiData } from "@/types/recovery.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type TLoginErrors = "" | "incorrect" | "unsubmited_email";

export function useRecoveryPassword() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["recoveryPassword"],
    mutationFn: (data: IRecoveryPasswordApiData) => recoveryService.recoveryPasswordByHash(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["recoveryPassword"],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    },
  });

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
  };
}
