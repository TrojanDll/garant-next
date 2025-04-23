import { authService } from "@/services/auth.service";
import { carsService } from "@/services/cars.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useGetCarModelByBrandId() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, data } = useMutation({
    mutationKey: ["carCategory"],
    mutationFn: (id: string) => carsService.getCarModelByBrandId(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["carCategory"],
      });
      queryClient.clear();
      window.location.reload();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    },
  });

  return {
    getCarModelByBrandId: mutate,
    carBrandData: data,
    isPending,
    isSuccess,
    isError,
  };
}
