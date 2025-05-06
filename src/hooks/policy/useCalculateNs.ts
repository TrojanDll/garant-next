import { policiesService } from "@/services/policies.service";
import { ICalculateNsPolicyRequest } from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useCalculateNs() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["paymentCalculationNs"],
    mutationFn: (data: ICalculateNsPolicyRequest) =>
      policiesService.calculateNsPolicy(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["paymentCalculationNs"],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
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
