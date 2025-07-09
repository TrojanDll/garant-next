import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

import {
  ILoginForm,
  ILoginResponse,
  ILogoutResponse,
  IRegistrationFormApiData,
  IRegistrationResponse,
} from "@/types/auth.types";

class AuthService {
  async registration(data: IRegistrationFormApiData) {
    const response = await axiosClassic.post<IRegistrationResponse>(
      "/api/registration",
      data
    );

    return response;
  }

  async login(data: ILoginForm) {
    const response = await axiosClassic.post<ILoginResponse>(
      "/api/login",
      data
    );

    return response;
  }

  async logout() {
    const response = await axiosWithAuth.get<ILogoutResponse>("/api/logout");

    return response;
  }
}

export const authService = new AuthService();
