import { INewCarForm } from "../cars.types";
import { personTypes, TPersonType } from "../user.types";

export interface IOsagoApplyForm extends INewCarForm {
  vehicle_refined_make: string;
  owner: TPersonType;
  insurant_type?: TPersonType;
  insurant_fio?: string;
  insurant_passport_number?: string;

  duration_of_stay: string;
  date_of_start: string;

  promocode: string;
}
