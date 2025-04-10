export type TPersonType = "individual" | "legal_entity";

export interface IOsagoApplyForm {
  vehicle_category: string;
  vehicle_make: string;
  vehicle_year_of_manufacture: string;
  vehicle_registration_plate: string;
  vehicle_model: string;
  vehicle_vin: string;
  vehicle_registration_series_and_number: string;

  owner_person_type: TPersonType;
  owner_fio: string;
  owner_passport_data: string;

  duration_of_stay: string;
  date_of_start: string;

  promocode: string;
}
