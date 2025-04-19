import { recoveryService } from "@/services/recovery-service.service";
import { userService } from "@/services/user.service";
import { IRecoveryPasswordApiData } from "@/types/recovery.types";
import { IEditUserForm } from "@/types/user.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useEditCurrientUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["editCurrientUser"],
    mutationFn: (data: IEditUserForm) => userService.editCurrientUser(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["editCurrientUser"],
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
