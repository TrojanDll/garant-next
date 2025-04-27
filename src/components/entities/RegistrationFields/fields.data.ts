import { IRegistrationForm } from "@/types/auth.types";
import { TInputType } from "@/types/IFieldConfig";

interface IField<T> {
  name: keyof T;
  label: string;
  placeholder: string;
  required: boolean;
  inputType: TInputType;
}

export const registrationFields: IField<IRegistrationForm>[] = [
  {
    name: "email",
    label: "Email*",
    placeholder: "Email",
    required: true,
    inputType: "text",
  },
  {
    name: "phone",
    label: "Номер телефона",
    placeholder: "+71234567890",
    required: false,
    inputType: "phone",
  },
  {
    name: "surname",
    label: "Фамилия*",
    placeholder: "Введите фамилию",
    required: true,
    inputType: "text",
  },
  {
    name: "name",
    label: "Имя*",
    placeholder: "Введите имя",
    required: true,
    inputType: "text",
  },
  {
    name: "patronymic",
    label: "Отчество (при наличии)",
    placeholder: "Введите отчество",
    required: false,
    inputType: "text",
  },
  {
    name: "password",
    label: "Пароль*",
    placeholder: "Придумайте пароль",
    required: true,
    inputType: "password",
  },
  {
    name: "password_confirmation",
    label: "Повторите пароль*",
    placeholder: "Повторите пароль",
    required: true,
    inputType: "password",
  },
];
