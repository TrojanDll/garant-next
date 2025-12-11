import { TButtonGroupType } from "@/components/ui/ButtonGroup/ButtonGroup";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";

export type TFieldType = "input" | "select" | "checkbox" | "radio";

export type TInputType =
  | "text"
  | "date"
  | "promocode"
  | "password"
  | "phone"
  | "registration_plate";

export interface IFieldConfig<T> {
  name: keyof T;
  type: TFieldType;
  label: string;
  options?: { value: string; label: string }[];
  rules?: any;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  buttons?: string[];
  buttonGroupType?: TButtonGroupType;
  inputType?: TInputType;
  isSearchable?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
  popularBrands?: IOptions[];
  startDate?: Date;
  limitYears?: boolean;
}
