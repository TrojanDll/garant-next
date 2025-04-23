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

export type INewCarForm = Omit<ICar, "updated_at" | "created_at" | "id" | "user_id">;
