import { carsService } from "@/services/cars.service";
import { IEditCarInfoForm } from "@/types/cars.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useEditCarInfo() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["editCarInfo"],
    mutationFn: (data: IEditCarInfoForm) => carsService.editCarInfo(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["editCarInfo"],
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
