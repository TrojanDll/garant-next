import { axiosWithAuth } from "@/api/interceptors";
import {
  IGetNsPDFByIdRequest,
  IGetOsagoPDFByIdRequest,
  INsPDF,
  IOsagoPDF,
} from "@/types/pdf.types";

class PDFService {
  async getOsagoPDFById(data: IGetOsagoPDFByIdRequest) {
    const response = await axiosWithAuth.get<IOsagoPDF>(
      `/api/getOsagoPDFById?osago_id=${data.osago_id}`
    );
    return response;
  }

  async getNsPDFById(data: IGetNsPDFByIdRequest) {
    const response = await axiosWithAuth.get<INsPDF>(
      `/api/getNSPDFById?ns_id=${data.ns_id}`
    );
    return response;
  }
}

export const pdfService = new PDFService();
