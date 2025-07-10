export interface IRecoveryEmailForm {
  email: string;
}

export interface IRecoveryEmailResponse {
  success: boolean;
  message: string;
}

export interface IRecoveryPasswordForm {
  password: string;
  password_confirmation: string;
}

export interface IRecoveryPasswordApiData {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface IRecoveryPasswordResponse {
  success: boolean;
  message: string;
}
