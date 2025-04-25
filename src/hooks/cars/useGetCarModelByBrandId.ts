import { authService } from "@/services/auth.service";
import { carsService } from "@/services/cars.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetCarModelByBrandId() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationKey: ["carModel"],
    mutationFn: (name: string) => carsService.getCarModelByBrandName(name),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["carModel"],
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
    getCarModelByBrandName: mutate,
    carModelData: data?.data.data,
    isPending,
    isSuccess,
    isError,
  };
}
