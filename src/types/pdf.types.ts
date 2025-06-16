export interface IPDF {
  success: boolean;
  filename: string;
  mime_type: string;
  base64: string;
}

export interface IGetOsagoPDFByIdRequest {
  osago_id: number;
}

export interface IOsagoPDF extends IPDF {}

export interface IGetNsPDFByIdRequest {
  ns_id: number;
}

export interface INsPDF extends IPDF {}
