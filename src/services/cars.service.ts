import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import {
  ICarBrandResponse,
  ICarCategoryResponse,
  ICarModelResponse,
  IGetCarInfoByIdResponse,
  IGetCurrientUserCarsReponse,
  INewCarForm,
  INewCarResponse,
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
    const response = await axiosClassic.get<ICarModelResponse>(`/api/car_model/${id}`);
    return response;
  }

  async addNewCar(data: INewCarForm) {
    const response = await axiosWithAuth.post<INewCarResponse>(`/api/add_transport`, data);
    return response;
  }

  async getCarInfoById(id: string) {
    const response = await axiosWithAuth.get<IGetCarInfoByIdResponse>(`/api/transportById/${id}`);
    return response;
  }
}

export const carsService = new CarsService();
