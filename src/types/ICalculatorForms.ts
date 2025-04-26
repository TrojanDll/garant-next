import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";

export interface ICalculatorOsagoForm {
  car_category: string;
  duration_of_stay_osago: string;
}

export interface ICalculatorNsForm {
  number_of_people: string;
  duration_of_stay_ns: string;
}

export interface ICalculatorOsagoFormFields {
  car_category: IOptions;
  duration_of_stay_osago: IOptions;
}

export interface ICalculatorNsFormFields {
  number_of_people: IOptions;
  duration_of_stay_ns: IOptions;
}
