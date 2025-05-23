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

export interface IGetCarInfoByIdResponse {
  success: boolean;
  data: ICar;
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
  Make_ID: number;
  Make_Name: string;
}

export interface ICarBrandResponse {
  success: boolean;
  brands: ICarBrand[];
}

export interface IPopularCarBrand {
  id: number;
  title: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface IPopularCarBrandResponse {
  success: boolean;
  data: IPopularCarBrand[];
}

export interface ICarModel {
  Model_Name: string;
  Model_ID: string;
  Make_ID: string;
  Make_Name: string;
}

export interface ICarModelResponse {
  success: boolean;
  make: string;
  models: ICarModel[];
}

export interface INewCarResponse {
  success: boolean;
  message: string;
  data?: any;
}

export type INewCarForm = Omit<ICar, "updated_at" | "created_at" | "id" | "user_id">;

export interface IEditCarInfoForm extends INewCarForm {
  transport_id: number;
}

export interface IEditCarInfoResponse {
  success: boolean;
  message: string;
  data?: any;
}
