import { ILoginForm } from "@/types/auth.types";
import { TInputType } from "@/types/IFieldConfig";

interface IField<T> {
  name: keyof T;
  placeholder: string;
  required: boolean;
  inputType: TInputType;
}

export const loginFields: IField<ILoginForm>[] = [
  {
    name: "email",
    placeholder: "Email *",
    required: true,
    inputType: "text",
  },
  {
    name: "password",
    placeholder: "Пароль *",
    required: true,
    inputType: "password",
  },
];
