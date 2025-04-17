import { ILoginForm } from "@/types/auth.types";

interface IField<T> {
  name: keyof T;
  placeholder: string;
  required: boolean;
}

export const loginFields: IField<ILoginForm>[] = [
  {
    name: "email",
    placeholder: "Email *",
    required: true,
  },
  {
    name: "password",
    placeholder: "Пароль *",
    required: true,
  },
];
