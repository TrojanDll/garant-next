import { INewCarForm } from "@/types/cars.types";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { convertPersonType } from "./convertPersonType";
import { selectCarModel } from "./selectCarModel";

export function formatNewCarDataToRequest(data: IOsagoApplyForm): INewCarForm {
  const formatedData: INewCarForm = {
    brand: selectCarModel(data.brand, data.vehicle_refined_make),
    fio: data?.fio,
    model: data.model,
    owner: convertPersonType(data.owner) as string,
    passport_number: data.passport_number,
    registration_number: data.registration_number,
    registration_plate: data.registration_number,
    transport_category: data.transport_category,
    vin: data.vin,
    year: data.year,
  };

  return formatedData;
}
