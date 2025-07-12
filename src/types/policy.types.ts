export enum EPolicyTypes {
  OSAGO = "osago",
  NS = "ns",
}

export enum EPolicyStatus {
  ACTIVE = "active",
  AWAITING_PAYMENT = "awaiting_payment",
  EXPIRED = "expired",
  ARCHIVE = "archive",
}

export enum EGenders {
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
  for_payment: number;
  payment: {
    payment_url: string;
  };
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

export interface IGetNsPolicyByIdRequest {
  ns_id: number;
}

export interface IGetNsPolicyByIdResponse {
  success: boolean;
  data: INsPolicy;
}

export interface IAllPolicies {
  OSAGO: IOsagoPolicy[];
  NS: INsPolicy[];
}

export interface IGetOsagoPolicyByCurrientUserResponse {
  success: boolean;
  data: IAllPolicies;
}

export interface IGetOsagoPaymentCalculationRequest {
  transport_category: string;
  duration_of_stay: string;
  promo_code: string;
}

export interface IOsagoPaymentCalculation {
  base_tarif: string;
  tarif: string;
  discount: string;
}

export interface IGetOsagoPaymentCalculationResponse {
  status: boolean;
  data: IOsagoPaymentCalculation;
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

export interface INsPolicy {
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
  n_s: null;
  get_peoples: IInsured[];
  payment: {
    payment_url: string;
  };
}

export interface ICreateNsPolicyResponse {
  success: boolean;
  data: INsPolicy;
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

export interface IPolicyUniversalData {
  id: number;
  title: string;
  policyNumber: string;
  start_date: string;
  finish_date: string | null;
  payment_status: EPolicyStatus;
}

export interface IDurationOfStayVariants {
  success: boolean;
  data: string[];
}
