import { scrollToTop } from "@/helpers/scrollToTop";
import { saveTokenToStorage } from "@/services/auth-token.service";
import { authService } from "@/services/auth.service";
import { IRegistrationFormApiData } from "@/types/auth.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export interface IErrors {
  name: boolean;
  surname: boolean;
  patronymic: boolean;
  email: "taken" | "incorrect" | "required" | "";
  phone: boolean;
  date_of_birth: boolean;
  password: boolean;
}

export function useRegistration() {
  const queryClient = useQueryClient();

  const [registrationErrors, setRegistrationErrors] = useState<IErrors>({
    name: false,
    surname: false,
    patronymic: false,
    email: "",
    phone: false,
    date_of_birth: false,
    password: false,
  });

  const {
    mutate: registration,
    isPending: isRegistrationPending,
    data: registrationResponse,
    isSuccess: isRegistrationSuccess,
    isError: isRegistrationError,
  } = useMutation({
    mutationKey: ["registration"],
    mutationFn: (data: IRegistrationFormApiData) =>
      authService.registration(data),
    onSuccess() {
      saveTokenToStorage("123");

      queryClient.invalidateQueries({
        queryKey: ["registration"],
      });
      scrollToTop();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Ошибка регистрации";

        console.log("Registration error", status, message);

        console.log(error.response);

        const emailError = error.response?.data?.data?.email;
        if (emailError) {
          setRegistrationErrors((prev) => ({
            ...prev,
            email:
              emailError[0] === "The email has already been taken."
                ? "taken"
                : "incorrect",
          }));
        }
      } else {
        console.log("Неизвестная ошибка", error);
      }
    },
  });

  return {
    registration,
    isRegistrationPending,
    registrationResponse,
    isRegistrationSuccess,
    isRegistrationError,
    registrationErrors,
  };
}
