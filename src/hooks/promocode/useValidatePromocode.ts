import { promocodeService } from "@/services/promocode.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useValidatePromocode() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["validatePromocode"],
    mutationFn: (data: string) => promocodeService.validatePromocode(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["validatePromocode"],
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
    data: data?.data,
    isSuccess,
    isError,
  };
}
