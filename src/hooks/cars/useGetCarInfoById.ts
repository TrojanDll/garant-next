import { authService } from "@/services/auth.service";
import { carsService } from "@/services/cars.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetCarInfoById() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationKey: ["carInfoById"],
    mutationFn: (id: string) => carsService.getCarInfoById(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["carInfoById"],
      });
      queryClient.clear();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    },
  });

  return {
    mutate,
    data: data?.data.data,
    isPending,
    isSuccess,
    isError,
  };
}
