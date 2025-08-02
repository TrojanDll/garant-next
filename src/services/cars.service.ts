import { axiosClassic, axiosWithAuth } from "@/api/interceptors";
import {
  ICarBrandResponse,
  ICarCategoryResponse,
  ICarModelResponse,
  IEditCarInfoForm,
  IEditCarInfoResponse,
  IGetCarInfoByIdResponse,
  IGetCurrientUserCarsReponse,
  INewCarForm,
  INewCarResponse,
  IPopularCarBrandResponse,
  TCarBrandResponseV2,
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
    const response = await axiosClassic.get<ICarCategoryResponse>(
      "/api/transport_category"
    );
    return response;
  }

  async getCarBrands() {
    const response = await axiosClassic.get<ICarBrandResponse>("/api/brands");
    return response;
  }

  async getCarBrandsV2() {
    const response = await axiosClassic.get<TCarBrandResponseV2>(
      "api/cars/all",
      {
        headers: {
          token: process.env.NEXT_PUBLIC_CARS_API_TOKEN,
        },
      }
    );
    return response;
  }

  async getCarBrandsLazy(limit?: number, page?: number) {
    const response = await axiosClassic.get<TCarBrandResponseV2>(
      `/api/cars/lazy${limit ? `?limit=${limit}` : ""}${
        page ? `&page=${page}` : ""
      }`,
      {
        headers: {
          token: process.env.NEXT_PUBLIC_CARS_API_TOKEN,
        },
      }
    );
    return response;
  }

  async getPopularCarBrands() {
    const response = await axiosWithAuth.get<IPopularCarBrandResponse>(
      "/api/getTopTransport"
    );
    return response;
  }

  async getCarModelByBrandName(name: string) {
    const response = await axiosClassic.get<ICarModelResponse>(
      `/api/car_model?brand=${name}`
    );
    return response;
  }

  async addNewCar(data: INewCarForm) {
    const response = await axiosWithAuth.post<INewCarResponse>(
      `/api/add_transport`,
      data
    );
    return response;
  }

  async getCarInfoById(id: string) {
    const response = await axiosWithAuth.get<IGetCarInfoByIdResponse>(
      `/api/transportById?transport_id=${id}`
    );
    return response;
  }

  async editCarInfo(data: IEditCarInfoForm) {
    const response = await axiosWithAuth.post<IEditCarInfoResponse>(
      "/api/editTransportById",
      data
    );
    return response;
  }
}

export const carsService = new CarsService();
