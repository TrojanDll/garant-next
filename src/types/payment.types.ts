export interface IGetOsagoPaymentLinkRequest {
  osago_id: string;
}

export interface IGetOsagoPaymentLinkResponse {
  data: {
    link?: string;
    status: boolean;
    error?: string;
    code?: number;
  };

  success: boolean;
}
