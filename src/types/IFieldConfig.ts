import { IOsagoApplyForm } from "./IOsagoApplyForm";

export interface IFieldConfig {
  name: keyof IOsagoApplyForm;
  type: "input" | "select" | "checkbox";
  label: string;
  options?: { value: string; label: string }[];
  rules?: any;
  placeholder?: string;
  required?: boolean
  errorMessage?: string
}