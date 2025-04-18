import { recoveryService } from "@/services/recovery-service.service";
import { IRecoveryEmailForm } from "@/types/recovery.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export type TLoginErrors = "" | "incorrect" | "unsubmited_email";

export function useRecoveryEmail() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["recoveryEmail"],
    mutationFn: (data: IRecoveryEmailForm) => recoveryService.sendRecoveryLinkByEmail(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["recoveryEmail"],
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
