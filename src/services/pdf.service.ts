import { axiosWithAuth } from "@/api/interceptors";
import { IGetOsagoPDFByIdRequest, IOsagoPDF } from "@/types/pdf.types";

class PDFService {
  async getOsagoPDFById(data: IGetOsagoPDFByIdRequest) {
    const response = await axiosWithAuth.get<IOsagoPDF>(
      `/api/getOsagoPDFById?osago_id=${data.osago_id}`
    );
    return response;
  }
}

export const pdfService = new PDFService();
