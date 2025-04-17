export interface IRegistrationForm {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  date_of_birth: string;
  password: string;
  password_confirmation: string;
  checkbox: boolean;
}

export interface IUser {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  date_of_birth: string;
  email: string;
}

export interface IRegistrationResponse {
  user: Pick<IUser, "id" | "name" | "email">;
  token: string;
}

export type IRegistrationFormApiData = Omit<IRegistrationForm, "checkbox">;

export type TAuthType = "login" | "registration";
