import { carsService } from "@/services/cars.service";
import { paymentService } from "@/services/payment.service";
import { INewCarForm } from "@/types/cars.types";
import { IGetOsagoPaymentLinkRequest } from "@/types/payment.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetOsagoPaymentLink() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["getOsagoPaymentLink"],
    mutationFn: (data: IGetOsagoPaymentLinkRequest) =>
      paymentService.getOsagoPaymentLink(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["getOsagoPaymentLink"],
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
    data,
    isSuccess,
    isError,
  };
}
