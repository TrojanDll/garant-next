import { carsService } from "@/services/cars.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCarById(id: number) {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["car", id],
    queryFn: () => carsService.getCarById(id),
  });

  return {
    isSuccess,
    isError,
    carsData: data?.data.data,
    isLoading,
  };
}
