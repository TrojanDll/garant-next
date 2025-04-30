import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import { IPromocodeResponse } from "@/types/promocode.types";

class PromocodeService {
  async validatePromocode(data: string) {
    const response = await axiosWithAuth.get<IPromocodeResponse>(
      `/api/getPromocodeData?promocode=${data}`
    );
    return response;
  }
}

export const promocodeService = new PromocodeService();
