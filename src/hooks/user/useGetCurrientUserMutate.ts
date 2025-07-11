import { userService } from "@/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetCurrientUserMutate() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationKey: ["getCurrientUserMutate"],
    mutationFn: () => userService.getCurrientUserData(),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getCurrientUserMutate"],
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
    data: data?.data.data,
  };
}
