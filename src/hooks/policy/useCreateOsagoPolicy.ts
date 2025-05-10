import { policiesService } from "@/services/policies.service";
import { ICreateOsagoPolicyRequest } from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function useCreateOsagoPolicy() {
  const queryClient = useQueryClient();

  const [isPromocodeError, setIsPromocodeError] = useState(false);

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
        if (error?.response?.status === 422) {
          setIsPromocodeError(true);
        }
      }
    },
  });

  return {
    mutate,
    isPending,
    data: data?.data,
    isSuccess,
    isError,
    isPromocodeError,
  };
}
