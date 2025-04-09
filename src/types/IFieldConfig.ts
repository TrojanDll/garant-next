export interface IFieldConfig {
  name: string;
  type: "input" | "select" | "checkbox";
  label: string;
  options?: { value: string; label: string }[];
  rules?: any;
  placeholder?: string;
  required?: boolean
  errorMessage?: string
}