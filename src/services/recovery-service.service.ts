import { axiosClassic } from "@/api/interceptors";
import {
  IRecoveryEmailForm,
  IRecoveryEmailResponse,
  IRecoveryPasswordApiData,
} from "@/types/recovery.types";

class RecoveryService {
  async sendRecoveryLinkByEmail(data: IRecoveryEmailForm) {
    const response = await axiosClassic.post<IRecoveryEmailResponse>(
      "/api/password_recovery",
      data
    );
    return response;
  }

  async recoveryPasswordByHash(data: IRecoveryPasswordApiData) {
    const response = await axiosClassic.patch<IRecoveryEmailResponse>("/api/change_password", data);
    return response;
  }
}

export const recoveryService = new RecoveryService();
