import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import {
  ICarBrandResponse,
  ICarCategoryResponse,
  ICarModelResponse,
  IGetCurrientUserCarsReponse,
} from "@/types/cars.types";

class CarsService {
  async getCurrientUserCars() {
    const response = await axiosWithAuth.get<IGetCurrientUserCarsReponse>(
      "/api/getTransportByUser"
    );
    return response;
  }

  async getCarById(id: number) {
    const response = await axiosWithAuth.get<IGetCurrientUserCarsReponse>(
      `/api/transport/user${id}`
    );
    return response;
  }

  async getCarCategories() {
    const response = await axiosClassic.get<ICarCategoryResponse>("/api/transport_category");
    return response;
  }

  async getCarBrands() {
    const response = await axiosClassic.get<ICarBrandResponse>("/api/brands");
    return response;
  }

  async getCarModelByBrandId(id: string) {
    const response = await axiosClassic.get<ICarModelResponse>(`/api/car_model${id}`);
    console.log(response);
    return response;
  }
}

export const carsService = new CarsService();
