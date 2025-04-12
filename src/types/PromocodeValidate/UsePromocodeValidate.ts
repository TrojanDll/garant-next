import { IPromocodeValidateResponse } from "./PromocodeValidateResponse";

export interface IUsePromocodeValidateResponse {
  promocodeResult: IPromocodeValidateResponse | null;
  validatePromocode: (code: string) => Promise<void>;
  isPromocodeLoading: boolean;
}
