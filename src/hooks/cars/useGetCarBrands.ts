import { carsService } from "@/services/cars.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCarBrands() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["carBrands"],
    queryFn: () => carsService.getCarBrands(),
  });

  return {
    isSuccess,
    isError,
    carsBrands: data?.data.brands,
    isLoading,
  };
}
