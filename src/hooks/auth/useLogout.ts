import { resetAllCashe } from "@/helpers/resetAllCashe";
import { authService } from "@/services/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess() {
      resetAllCashe();
      queryClient.invalidateQueries({
        queryKey: ["logout"],
      });

      queryClient.clear();
      window.location.reload();
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
