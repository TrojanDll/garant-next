export interface IGetOsagoPDFByIdRequest {
  osago_id: number;
}

export interface IOsagoPDF {
  success: boolean;
  filename: string;
  mime_type: string;
  base64: string;
}
