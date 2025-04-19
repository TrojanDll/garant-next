import { userService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrientUser() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["userData"],
    queryFn: () => userService.getCurrientUserData(),
  });

  return {
    isSuccess,
    isError,
    userData: data?.data.data,
    isLoading,
  };
}
