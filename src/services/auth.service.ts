import { axiosClassic } from "@/api/interceptors";

import { removeFromStorage, saveTokenStorage } from "./auth-token.service";
import { IRegistrationFormApiData, IRegistrationResponse } from "@/types/auth.types";

class AuthService {
  async registration(data: IRegistrationFormApiData) {
    const response = await axiosClassic.post<IRegistrationResponse>("/api/register", data);
    return response;
  }

  async logout() {
    const response = await axiosClassic.post<boolean>("/api/logout");

    if (response.data) removeFromStorage();

    return response;
  }
}

export const authService = new AuthService();
