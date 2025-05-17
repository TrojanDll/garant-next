import { policiesService } from "@/services/policies.service";
import { useQuery } from "@tanstack/react-query";

export function useGetDurationOfStayVariants() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["durationOfStayVariants"],
    queryFn: () => policiesService.getDurationOfStayVariants(),
  });

  return {
    isSuccess,
    isError,
    data: data?.data.data,
    isLoading,
  };
}
