import promocodeValidate from "@/helpers/PromocodeValidate/PromocodeValidate.helper";
import { IPromocodeValidateResponse } from "@/types/PromocodeValidate/PromocodeValidateResponse";
import { IUsePromocodeValidateResponse } from "@/types/PromocodeValidate/UsePromocodeValidate";
import { useState } from "react";

export const usePromocodeValidate = (): IUsePromocodeValidateResponse => {
  const [isPromocodeLoading, setIsPromocodeLoading] = useState(false);
  const [promocodeResult, setPromocodeResult] = useState<IPromocodeValidateResponse | null>(null);

  async function validatePromocode(code: string | undefined) {
    try {
      setIsPromocodeLoading(true);
      const response = await promocodeValidate(code);
      setPromocodeResult(response);
      setIsPromocodeLoading(false);
    } catch (error) {
      console.error("Ошибка при проверке промокода", error);
      setPromocodeResult({ isValid: false, discountValue: 0 });
    } finally {
      setIsPromocodeLoading(false);
    }
  }

  return {
    validatePromocode,
    promocodeResult,
    isPromocodeLoading,
  };
};
