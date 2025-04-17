import { IRegistrationForm } from "@/types/auth.types";

interface IField<T> {
  name: keyof T;
  label: string;
  placeholder: string;
  required: boolean;
}

export const registrationFields: IField<IRegistrationForm>[] = [
  {
    name: "email",
    label: "Email*",
    placeholder: "Email",
    required: true,
  },
  {
    name: "phone",
    label: "Номер телефона",
    placeholder: "Номер телефона",
    required: false,
  },
  {
    name: "surname",
    label: "Фамилия*",
    placeholder: "Введите фамилию",
    required: true,
  },
  {
    name: "name",
    label: "Имя*",
    placeholder: "Ведите имя",
    required: true,
  },
  {
    name: "patronymic",
    label: "Отчество (при наличии)",
    placeholder: "Отчество (при наличии)",
    required: true,
  },
  {
    name: "password",
    label: "Пароль*",
    placeholder: "Придумайте пароль",
    required: true,
  },
  {
    name: "password_confirmation",
    label: "Повторите пароль*",
    placeholder: "Повторите пароль",
    required: true,
  },
];
