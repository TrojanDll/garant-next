import { axiosClassic, axiosWithAuth } from "@/api/interceptors";

import {
  IGetNewVerificationCodeRequest,
  IGetNewVerificationCodeResponse,
  ILoginForm,
  ILoginResponse,
  ILogoutResponse,
  IRegistrationFormApiData,
  IRegistrationResponse,
  IVerifyEmailRequest,
  IVerifyEmailResponse,
} from "@/types/auth.types";
import { removeFromStorage, saveTokenToStorage } from "./auth-token.service";

class AuthService {
  async registration(data: IRegistrationFormApiData) {
    const response = await axiosClassic.post<IRegistrationResponse>(
      "/api/registration",
      data
    );

    // saveTokenToStorage(response.data.token);

    return response;
  }

  async login(data: ILoginForm) {
    const response = await axiosClassic.post<ILoginResponse>(
      "/api/login",
      data
    );

    saveTokenToStorage(response.data.token);

    return response;
  }

  async logout() {
    const response = await axiosWithAuth.get<ILogoutResponse>("/api/logout");

    if (response.data) removeFromStorage();

    return response;
  }

  async getNewVerificationCode(data: IGetNewVerificationCodeRequest) {
    const response = await axiosWithAuth.post<IGetNewVerificationCodeResponse>(
      "/api/get-new-verification-code",
      data
    );

    return response;
  }

  async verifyEmail(data: IVerifyEmailRequest) {
    const response = await axiosWithAuth.post<IVerifyEmailResponse>(
      "/api/verify-email",
      data
    );

    return response;
  }
}

export const authService = new AuthService();
