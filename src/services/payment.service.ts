import { axiosWithAuth } from "@/api/interceptors";
import {
  IGetOsagoPaymentLinkRequest,
  IGetOsagoPaymentLinkResponse,
} from "@/types/payment.types";

class PaymentService {
  // async getCurrientUserCars() {
  //   const response = await axiosWithAuth.get<IGetCurrientUserCarsReponse>(
  //     "/api/getTransportByUser"
  //   );
  //   return response;
  // }

  async getOsagoPaymentLink(data: IGetOsagoPaymentLinkRequest) {
    const response = await axiosWithAuth.post<IGetOsagoPaymentLinkResponse>(
      "/api/osago/buy",
      data
    );
    return response;
  }
}

export const paymentService = new PaymentService();
