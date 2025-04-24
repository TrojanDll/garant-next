import { carsService } from "@/services/cars.service";
import { INewCarForm } from "@/types/cars.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAddNewCar() {
  const queryClient = useQueryClient();

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["addNewCar"],
    mutationFn: (data: INewCarForm) => carsService.addNewCar(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["addNewCar"],
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
