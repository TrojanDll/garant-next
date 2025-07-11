import { axiosWithAuth } from "@/api/interceptors";
import { IGetOsagoPaymentLinkRequest } from "@/types/payment.types";

class PaymentService {
  // async getCurrientUserCars() {
  //   const response = await axiosWithAuth.get<IGetCurrientUserCarsReponse>(
  //     "/api/getTransportByUser"
  //   );
  //   return response;
  // }

  async getOsagoPaymentLink(data: IGetOsagoPaymentLinkRequest) {
    const response = await axiosWithAuth.post<IGetOsagoPaymentLinkRequest>(
      "/api/osago/buy"
    );
    return response;
  }
}

export const paymentService = new PaymentService();
