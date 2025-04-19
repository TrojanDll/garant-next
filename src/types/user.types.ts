export interface IUser {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  date_of_birth: string;
  email: string;
}

export interface ICurrientUser {
  id?: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  phone?: string;
  date_of_birth?: string;
  email?: string;
  created_at?: string;
  email_confirmation?: string;
  email_verified_at?: string;
  forgot_password?: string;
  roll?: string;
  updated_at?: string;
}

export interface ICurrientUserResponse {
  success: boolean;

  data: ICurrientUser;
}
