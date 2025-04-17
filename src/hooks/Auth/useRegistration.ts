import { authService } from "@/services/auth.service";
import { IRegistrationFormApiData } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useRegistration() {
  const queryClient = useQueryClient();

  const {
    mutate: registration,
    isPending: isRegistrationPending,
    data: registrationResponse,
    isSuccess: isRegistrationSuccess
  } = useMutation({
    mutationKey: ["registration"],
    mutationFn: (data: IRegistrationFormApiData) => authService.registration(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["registration"],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Ошибка регистрации";

        console.log("Registration error", status, message);
      } else {
        console.log("Неизвестная ошибка", error);
      }
    },
  });

  return { registration, isRegistrationPending, registrationResponse, isRegistrationSuccess };
}
