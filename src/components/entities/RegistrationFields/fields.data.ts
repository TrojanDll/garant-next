import { IRegistrationForm } from "@/types/auth.types";
import { TInputType } from "@/types/IFieldConfig";

interface IField<T> {
  name: keyof T;
  label?: string;
  placeholder: string;
  required: boolean;
  inputType: TInputType;
}

export const registrationFields: IField<IRegistrationForm>[] = [
  {
    name: "email",
    placeholder: "Email *",
    required: true,
    inputType: "text",
  },
  {
    name: "name",
    placeholder: "Имя *",
    required: true,
    inputType: "text",
  },
  {
    name: "surname",
    placeholder: "Фамилия *",
    required: true,
    inputType: "text",
  },

  {
    name: "password",
    placeholder: "Придумайте пароль *",
    required: true,
    inputType: "password",
  },
  {
    name: "password_confirmation",
    placeholder: "Повторите пароль *",
    required: true,
    inputType: "password",
  },
];
