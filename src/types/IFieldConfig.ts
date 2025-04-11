import { TButtonGroupType } from "@/components/ui/ButtonGroup/ButtonGroup";

export type TFieldType = "input" | "select" | "checkbox" | "radio";

export type TInputType = "text" | "date" | "promocode" | "password";

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
}
