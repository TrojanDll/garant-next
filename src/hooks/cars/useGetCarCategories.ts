import { carsService } from "@/services/cars.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCarCategories() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["carCategories"],
    queryFn: () => carsService.getCarCategories(),
  });

  return {
    isSuccess,
    isError,
    categoriesData: data?.data.data,
    isLoading,
  };
}
