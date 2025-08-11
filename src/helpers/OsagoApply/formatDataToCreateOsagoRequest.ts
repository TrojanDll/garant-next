import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { ICreateOsagoPolicyRequest } from "@/types/policy.types";
import { convertPersonType } from "../convertPersonType";
import { selectCarModel } from "../selectCarModel";

export function formatDataToCreateOsagoRequest(
  data: IOsagoApplyForm
): ICreateOsagoPolicyRequest {
  return {
    brand: selectCarModel(data.brand, data.vehicle_refined_make),
    car_model: data.model,
    car_year: data.year,
    duration_of_stay: data.duration_of_stay,
    fio: data?.fio,
    owner: convertPersonType(data.owner),
    passport_number: data.passport_number,
    promo_code: data.promocode,
    registration_number: data.registration_number,
    registration_plate: data.registration_plate,
    start_date: data.date_of_start,
    transport_category: data.transport_category,
    vin: data.vin,
    insurant_fio: data.insurant_fio?.length ? data.insurant_fio : data.fio,
    insurant_passport_number: data.insurant_passport_number?.length
      ? data.insurant_passport_number
      : data.passport_number,
    insurant_type:
      data.insurant_type === "individual" ? "individual" : "legal_entity",
  };
}
