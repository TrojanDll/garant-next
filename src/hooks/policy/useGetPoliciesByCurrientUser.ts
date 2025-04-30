import { policiesService } from "@/services/policies.service";
import { useQuery } from "@tanstack/react-query";

export function useGetPoliciesByCurrientUser() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["policiesByCurrientUser"],
    queryFn: () => policiesService.getPoliciesByCurrientUser(),
  });

  return {
    isSuccess,
    isError,
    data: data?.data.data,
    isLoading,
  };
}
