import { carsService } from "@/services/cars.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrientUserCars() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["currientUserCars"],
    queryFn: () => carsService.getCurrientUserCars(),
  });

  return {
    isSuccess,
    isError,
    carsData: data?.data.data,
    isLoading,
  };
}
