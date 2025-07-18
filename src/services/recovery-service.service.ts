import { axiosClassic } from "@/api/interceptors";
import {
  IRecoveryEmailForm,
  IRecoveryEmailResponse,
  IRecoveryPasswordApiData,
} from "@/types/recovery.types";

class RecoveryService {
  async sendRecoveryLinkByEmail(data: IRecoveryEmailForm) {
    const response = await axiosClassic.post<IRecoveryEmailResponse>(
      "/api/forgot-password",
      data
    );
    return response;
  }

  async recoveryPasswordByHash(data: IRecoveryPasswordApiData) {
    const response = await axiosClassic.post<IRecoveryEmailResponse>(
      "/api/reset-password",
      data
    );
    return response;
  }
}

export const recoveryService = new RecoveryService();
