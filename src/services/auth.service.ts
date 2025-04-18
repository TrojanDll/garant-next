import { axiosClassic } from "@/api/interceptors";

import { removeFromStorage, saveTokenToStorage } from "./auth-token.service";
import {
  ILoginForm,
  ILoginResponse,
  IRegistrationFormApiData,
  IRegistrationResponse,
} from "@/types/auth.types";

class AuthService {
  async registration(data: IRegistrationFormApiData) {
    const response = await axiosClassic.post<IRegistrationResponse>("/api/registration", data);

    saveTokenToStorage(response.data.token);

    return response;
  }

  async login(data: ILoginForm) {
    const response = await axiosClassic.post<ILoginResponse>("/api/login", data);

    saveTokenToStorage(response.data.token);

    return response;
  }

  async logout() {
    const response = await axiosClassic.post<boolean>("/api/logout");

    if (response.data) removeFromStorage();

    return response;
  }
}

export const authService = new AuthService();
