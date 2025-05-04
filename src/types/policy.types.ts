export const enum EPolicyTypes {
  OSAGO = "osago",
  NS = "ns",
}

export const enum EPolicyStatus {
  ACTIVE = "active",
  AWAITING_PAYMENT = "awaiting_payment",
  EXPIRED = "expired",
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
  discount_amount: string | null;
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
    tarif: number;
    discount: number;
  };
}
