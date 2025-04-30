import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import {
  ICreateOsagoPolicyRequest,
  ICreateOsagoPolicyResponse,
  IGetOsagoPolicyByCurrientUserResponse,
  IGetOsagoPolicyByIdRequest,
  IGetOsagoPolicyByIdResponse,
} from "@/types/policy.types";

class PoliciesService {
  async createOsagoPolicy(data: ICreateOsagoPolicyRequest) {
    const response = await axiosWithAuth.post<ICreateOsagoPolicyResponse>(
      "/api/add_osago",
      data
    );
    return response;
  }

  async getOsagoPolicyById(data: IGetOsagoPolicyByIdRequest) {
    const response = await axiosWithAuth.get<IGetOsagoPolicyByIdResponse>(
      `/api/getOsagoDetails?osago_id=${data.osago_id}`
    );
    return response;
  }

  async getPoliciesByCurrientUser() {
    const response = await axiosWithAuth.get<IGetOsagoPolicyByCurrientUserResponse>(
      "/api/getUserPolicy"
    );
    return response;
  }
}

export const policiesService = new PoliciesService();
