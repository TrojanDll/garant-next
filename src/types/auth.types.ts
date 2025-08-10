import { IUser } from "./user.types";

export interface IRegistrationForm {
  name: string;
  surname: string;
  // patronymic: string;
  email: string;
  // phone: string;
  // date_of_birth: string;
  password: string;
  password_confirmation: string;
  checkbox: boolean;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegistrationResponse {
  user: Pick<IUser, "id" | "name" | "email">;
  token: string;
}

export interface ILoginResponse {
  user: Pick<IUser, "id" | "name" | "email">;
  token: string;
  success: boolean;
}

export interface ILogoutResponse {
  success?: boolean;
  message: string;
}

export type IRegistrationFormApiData = Omit<IRegistrationForm, "checkbox">;

export type TAuthType = "login" | "registration";

export interface IGetNewVerificationCodeRequest {
  email: string;
}

export interface IGetNewVerificationCodeResponse {
  success: boolean;
  status: string;
}

export interface IVerifyEmailRequest {
  email: string;
  code: string;
}

export interface IVerifyEmailResponse {
  message: string;
  errors?: {
    email?: string[];
  };
}
