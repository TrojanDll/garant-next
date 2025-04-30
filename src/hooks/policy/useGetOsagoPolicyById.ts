import { policiesService } from "@/services/policies.service";
import {
  ICreateOsagoPolicyRequest,
  IGetOsagoPolicyByIdRequest,
} from "@/types/policy.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetOsagoPolicyById() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["osagoPolicyById"],
    mutationFn: (data: IGetOsagoPolicyByIdRequest) =>
      policiesService.getOsagoPolicyById(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["osagoPolicyById"],
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
