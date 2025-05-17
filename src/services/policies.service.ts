import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import {
  ICalculateNsPolicyRequest,
  ICalculateNsPolicyResponse,
  ICreateNsPolicyRequest,
  ICreateNsPolicyResponse,
  ICreateOsagoPolicyRequest,
  ICreateOsagoPolicyResponse,
  IDurationOfStayVariants,
  IGetOsagoPaymentCalculationRequest,
  IGetOsagoPaymentCalculationResponse,
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

  async getPaymentCalculation(data: IGetOsagoPaymentCalculationRequest) {
    const response = await axiosWithAuth.get<IGetOsagoPaymentCalculationResponse>(
      `/api/getPaymentCalculation?transport_category=${data.transport_category}&duration_of_stay=${data.duration_of_stay}&promo_code=${data.promo_code}`
    );
    return response;
  }

  async createNsPolicy(data: ICreateNsPolicyRequest) {
    const response = await axiosWithAuth.post<ICreateNsPolicyResponse>(
      "/api/add_NS",
      data
    );
    return response;
  }

  async calculateNsPolicy(data: ICalculateNsPolicyRequest) {
    const response = await axiosWithAuth.post<ICalculateNsPolicyResponse>(
      "/api/NS_colculate",
      data
    );
    return response;
  }

  async getDurationOfStayVariants() {
    const response = await axiosWithAuth.get<IDurationOfStayVariants>(
      "/api/get_NS_DurationOfStay"
    );
    return response;
  }
}

export const policiesService = new PoliciesService();
