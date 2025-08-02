import { carsService } from "@/services/cars.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCarBrandsV2() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["carBrandsV2"],
    queryFn: () => carsService.getCarBrandsV2(),
  });

  return {
    isSuccess,
    isError,
    carsBrands: data?.data,
    isLoading,
  };
}
