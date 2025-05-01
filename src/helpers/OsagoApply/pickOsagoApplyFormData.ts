import { ICar, ICarBrand } from "@/types/cars.types";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

export function pickOsagoApplyFormData(
  carInfoData: ICar,
  carBrands: ICarBrand[]
): Partial<IOsagoApplyForm> {
  let found = carBrands.find((item) => item.Make_Name === carInfoData.brand);

  // console.log(carInfoData.brand === found?.Make_Name ? carInfoData.brand : "");
  return {
    brand: carInfoData.brand,
    fio: carInfoData.fio,
    model: carInfoData.model,
    owner: carInfoData.owner === "individual" ? "individual" : "legal_entity",
    passport_number: carInfoData.passport_number,
    registration_number: carInfoData.registration_number,
    registration_plate: carInfoData.registration_plate,
    transport_category: carInfoData.transport_category,
    vehicle_refined_make: carInfoData.brand === found?.Make_Name ? "" : carInfoData.brand,
    vin: carInfoData.vin,
    year: carInfoData.year,
  };
}
