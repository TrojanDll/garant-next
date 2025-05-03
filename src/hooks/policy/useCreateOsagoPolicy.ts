import { policiesService } from "@/services/policies.service";
import { ICreateOsagoPolicyRequest } from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCreateOsagoPolicy() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["createOsagoPolicy"],
    mutationFn: (data: ICreateOsagoPolicyRequest) =>
      policiesService.createOsagoPolicy(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["createOsagoPolicy"],
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
