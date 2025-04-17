export interface IRegistrationForm {
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  date_of_birth: string;
  password: string;
  password_confirmation: string;
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name?: string;
  email: string;

  workInterval?: number;
  breakInterval?: number;
  intervalsCount?: number;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
}

export type TAuthType = "login" | "registration";

export type TypeUserForm = Omit<IUser, "id"> & { password?: string };
