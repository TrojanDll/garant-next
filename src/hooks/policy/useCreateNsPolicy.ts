import { policiesService } from "@/services/policies.service";
import { ICreateNsPolicyRequest } from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export function useCreateNsPolicy() {
  const queryClient = useQueryClient();

  const [isPromocodeError, setIsPromocodeError] = useState(false);

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["createNsPolicy"],
    mutationFn: (data: ICreateNsPolicyRequest) => policiesService.createNsPolicy(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["createNsPolicy"],
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
    data: data?.data.data,
    isSuccess,
    isError,
    isPromocodeError,
  };
}
