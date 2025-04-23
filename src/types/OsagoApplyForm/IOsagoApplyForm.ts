import { INewCarForm } from "../cars.types";
import { personTypes, TPersonType } from "../user.types";

export interface IOsagoApplyForm extends INewCarForm {
  vehicle_refined_make: string;
  owner: TPersonType;

  duration_of_stay: string;
  date_of_start: string;

  promocode: string;
}
