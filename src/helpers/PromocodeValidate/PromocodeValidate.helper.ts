import { IPromocodeValidateResponse } from "@/types/PromocodeValidate/PromocodeValidateResponse";

export default async function promocodeValidate(
  promocodeValue: string | undefined
): Promise<IPromocodeValidateResponse> {
  const isValidPromocode: boolean = !!promocodeValue?.length;

  const discountValue: number = 10;

  return {
    isValid: isValidPromocode,
    discountValue: discountValue,
  };
}
