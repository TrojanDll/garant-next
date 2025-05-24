import { policiesService } from "@/services/policies.service";
import { IGetNsPolicyByIdRequest } from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetNsPolicyById() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["nsPolicyById"],
    mutationFn: (data: IGetNsPolicyByIdRequest) => policiesService.getNsPolicyById(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["nsPolicyById"],
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
    data: data?.data.data,
    isSuccess,
    isError,
  };
}
