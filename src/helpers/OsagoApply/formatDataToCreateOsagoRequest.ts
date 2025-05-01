import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { ICreateOsagoPolicyRequest } from "@/types/policy.types";
import { convertPersonType } from "../convertPersonType";

export function formatDataToCreateOsagoRequest(
  data: IOsagoApplyForm
): ICreateOsagoPolicyRequest {
  return {
    brand: data.brand,
    car_model: data.model,
    car_year: data.year,
    duration_of_stay: data.duration_of_stay,
    fio: data.fio,
    owner: convertPersonType(data.owner),
    passport_number: data.passport_number,
    promo_code: data.promocode,
    registration_number: data.registration_number,
    registration_plate: data.registration_plate,
    start_date: data.date_of_start,
    transport_category: data.transport_category,
    vin: data.vin,
  };
}