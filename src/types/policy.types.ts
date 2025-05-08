export const enum EPolicyTypes {
  OSAGO = "osago",
  NS = "ns",
}

export const enum EPolicyStatus {
  ACTIVE = "active",
  AWAITING_PAYMENT = "awaiting_payment",
  EXPIRED = "expired",
}

export const enum EGenders {
  MAN = "Мужчина",
  WOMAN = "Женщина",
}

export interface IOsagoPolicy {
  id: number;
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
  start_date: string;
  finish_date: string | null;
  promo_code: string;
  transport_id: string | null;
  user_id: string;
  payment_status: string;
  amount_to_be_paid: string;
  created_at: string;
  updated_at: string;
  osaga_number: string; // сори, это бекендер такой грамотный, еще и менять поля отказался
  duration_of_stay: string;
  discount_amount: string;
}

export interface ICreateOsagoPolicyRequest {
  transport_category: string;
  brand: string;
  car_model: string;
  car_year: string;
  vin: string;
  registration_plate: string;
  registration_number: string;
  owner: string;
  fio: string;
  passport_number: string;
  duration_of_stay: string;
  start_date: string;
  promo_code: string;
}

export interface ICreateOsagoPolicyResponse {
  success: boolean;
  message: string;
  data: IOsagoPolicy;
}

export interface IGetOsagoPolicyByIdRequest {
  osago_id: number;
}

export interface IGetOsagoPolicyByIdResponse {
  success: boolean;
  data: IOsagoPolicy;
}

export interface IGetOsagoPolicyByCurrientUserResponse {
  success: boolean;
  data: {
    OSAGO: IOsagoPolicy[];
    NS: null;
  };
}

export interface IGetOsagoPaymentCalculationRequest {
  transport_category: string;
  duration_of_stay: string;
  promo_code: string;
}

export interface IGetOsagoPaymentCalculationResponse {
  status: boolean;
  data: {
    base_tarif: string;
    tarif: string;
    discount: string;
  };
}

export interface IInsured {
  id: number;
  NS_id: number;
  fio: string;
  gender: string;
  date_of_birth: string;
  passport_number: string;
}

export type IInsuredCreationFilelds = Omit<IInsured, "id" | "NS_id">;

export interface ICreateNsPolicyRequest {
  insured: IInsuredCreationFilelds[];
  duration_of_stay: string;
  start_date: string;
  promocode: string;
}

export interface ICreateNsPolicyResponseData {
  id: number;
  user_id: string;
  duration_of_stay: string;
  start_date: string;
  finish_date: string;
  amount_to_be_paid: string;
  NS_number: string;
  status: string;
  created_at: string;
  updated_at: string;
  promocode: string;
  get_peoples: IInsured[];
}

export interface ICreateNsPolicyResponse {
  success: boolean;
  data: ICreateNsPolicyResponseData;
}

export interface ICalculateNsPolicyRequest {
  duration_of_stay: string;
  quantity: number;
  promocode: string;
}

export interface ICalculateNsPolicyResponseData {
  base_tariff: number;
  discount: number;
  to_be_paid: number;
}

export interface ICalculateNsPolicyResponse {
  success: boolean;
  data: ICalculateNsPolicyResponseData;
}
