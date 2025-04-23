export interface ICar {
  id: string;
  user_id: string;
  transport_category: string;
  brand: string;
  model: string;
  year: string;
  vin: string;
  registration_plate: string;
  registration_number: string;
  owner: string;
  fio: string;
  passport_number: string;
  created_at: string;
  updated_at: string;
}

export interface IGetCurrientUserCarsReponse {
  success: boolean;
  data: ICar[];
}

export interface ICarCategory {
  id: number;
  Category: string;
  created_at: string;
  updated_at: string;
}

export interface ICarCategoryResponse {
  success: boolean;
  data: ICarCategory[];
}

export interface ICarBrand {
  make_id: string;
  make_display: string;
  make_is_common: string;
  make_country: string;
}

export interface ICarBrandResponse {
  success: boolean;
  data: ICarBrand[];
}

export interface ICarModel {
  model_name: string;
  model_make_id: string;
}

export interface ICarModelResponse {
  success: boolean;
  data: ICarModel[];
}

export type INewCarForm = Omit<ICar, "updated_at" | "created_at" | "id" | "user_id">;
