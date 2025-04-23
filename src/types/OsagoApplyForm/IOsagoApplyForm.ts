import { INewCarForm } from "../cars.types";
import { personTypes } from "../user.types";

export type TPersonType = (typeof personTypes)[number];

export interface IOsagoApplyForm extends INewCarForm {
  vehicle_refined_make: string;
  owner_person_type: TPersonType;
  owner_fio: string;
  owner_passport_data: string;

  duration_of_stay: string;
  date_of_start: string;

  promocode: string;
}
