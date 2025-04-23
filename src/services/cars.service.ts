import { axiosWithAuth } from "@/api/interceptors";
import { IGetCurrientUserCarsReponse } from "@/types/cars.types";

class CarsService {
  async getCurrientUserCars() {
    const response = await axiosWithAuth.get<IGetCurrientUserCarsReponse>("/api/getTransportByUser");
    return response;
  }

  async getCarById(id: number) {
    const response = await axiosWithAuth.get<IGetCurrientUserCarsReponse>(
      `/api/transport/user${id}`
    );
    return response;
  }
}

export const carsService = new CarsService();
