import { pdfService } from "@/services/pdf.service";
import { IGetOsagoPDFByIdRequest } from "@/types/pdf.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

export function useFetchAndDownloadOsagoPDFById() {
  const queryClient = useQueryClient();

  const downloadBase64Pdf = useCallback((base64: string, filename: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, []);

  const { mutate, isPending, data, isSuccess, isError } = useMutation({
    mutationKey: ["osagoPDFById"],
    mutationFn: (data: IGetOsagoPDFByIdRequest) => pdfService.getOsagoPDFById(data),
    onSuccess(responseData) {
      if (responseData?.data.base64) {
        downloadBase64Pdf(responseData?.data.base64, responseData?.data.filename);
      }

      queryClient.invalidateQueries({
        queryKey: ["osagoPDFById"],
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    },
  });

  return {
    mutate,
    isPending,
    data,
    isSuccess,
    isError,
  };
}
