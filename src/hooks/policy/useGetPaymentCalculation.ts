import { policiesService } from "@/services/policies.service";
import { IGetOsagoPaymentCalculationRequest } from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetPaymentCalculation() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["paymentCalculationOsago"],
    mutationFn: (data: IGetOsagoPaymentCalculationRequest) =>
      policiesService.getPaymentCalculation(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["paymentCalculationOsago"],
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
