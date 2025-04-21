import { TInputType } from "@/types/IFieldConfig";
import { IEditUserForm } from "@/types/user.types";

interface IField<T> {
  name: keyof T;
  placeholder: string;
  label: string;
  inputType: TInputType;
}

export const editUserFields: IField<IEditUserForm>[] = [
  {
    name: "surname",
    placeholder: "Фамилия",
    label: "Фамилия",
    inputType: "text",
  },
  {
    name: "name",
    placeholder: "Имя",
    label: "Имя",
    inputType: "text",
  },
  {
    name: "patronymic",
    placeholder: "Отчество",
    label: "Отчество",
    inputType: "text",
  },
  {
    name: "email",
    placeholder: "petrivanov@mail.ru",
    label: "Email",
    inputType: "text",
  },
  {
    name: "phone",
    placeholder: "+71234567890",
    label: "Номер телефона",
    inputType: "phone",
  },
  {
    name: "date_of_birth",
    placeholder: "Дата рождения",
    label: "Дата рождения",
    inputType: "date",
  },
];
