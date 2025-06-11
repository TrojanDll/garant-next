import { ICar, ICarBrand } from "@/types/cars.types";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { ICreateOsagoPolicyRequest, IOsagoPolicy } from "@/types/policy.types";

export async function pickOsagoApplyFormData(
  data: ICar,
  carBrands: ICarBrand[]
): Promise<Partial<IOsagoApplyForm>> {
  let found = await carBrands.find((item) => item.Make_Name === data.brand);

  // console.log(data.brand === found?.Make_Name ? data.brand : "");
  return {
    brand: data.brand,
    fio: data?.fio,
    model: data.model,
    owner: data.owner === "individual" ? "individual" : "legal_entity",
    passport_number: data.passport_number,
    registration_number: data.registration_number,
    registration_plate: data.registration_plate,
    transport_category: data.transport_category,
    vehicle_refined_make: data.brand === found?.Make_Name ? "" : data.brand,
    vin: data.vin,
    year: data.year,
  };
}

export async function pickOsagoApplyFormDataFromPolicy(
  data: ICreateOsagoPolicyRequest,
  carBrands: ICarBrand[]
): Promise<Partial<IOsagoApplyForm>> {
  console.log(data);
  let found = await carBrands.find((item) => item.Make_Name === data.brand);

  // console.log(data.brand === found?.Make_Name ? data.brand : "");
  return {
    brand: data.brand,
    fio: data?.fio,
    model: data.car_model,
    owner: data.owner === "individual" ? "individual" : "legal_entity",
    passport_number: data.passport_number,
    registration_number: data.registration_number,
    registration_plate: data.registration_plate,
    transport_category: data.transport_category,
    vehicle_refined_make: data.brand === found?.Make_Name ? "" : data.brand,
    vin: data.vin,
    year: data.car_year,
    date_of_start: data.start_date,
    duration_of_stay: data.duration_of_stay,
    promocode: data.promo_code,
  };
}
