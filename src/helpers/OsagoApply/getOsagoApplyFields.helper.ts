import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";

export interface ISplitFieldConfig {
  [key: string]: IFieldConfig<IOsagoApplyForm>[];
}

export default async function getOsagoApplyFields(): Promise<ISplitFieldConfig> {
  const fields: ISplitFieldConfig = {
    vehicle: [
      {
        type: "select",
        name: "vehicle_category",
        label: "Категория ТС",
        placeholder: "Категория ТС",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "Option 1",
          },
          {
            label: "Option 2",
            value: "Option 2",
          },
        ],
      },
      {
        type: "select",
        name: "vehicle_make",
        label: "Марка",
        placeholder: "Марка",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "Option 1",
          },
          {
            label: "Option 2",
            value: "Option 2",
          },
        ],
      },
      {
        type: "select",
        name: "vehicle_model",
        label: "Модель",
        placeholder: "Модель",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "Option 1",
          },
          {
            label: "Option 2",
            value: "Option 2",
          },
        ],
      },
      {
        type: "select",
        name: "vehicle_year_of_manufacture",
        label: "Год выпуска ТС",
        placeholder: "Год выпуска ТС",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "Option 1",
          },
          {
            label: "Option 2",
            value: "Option 2",
          },
        ],
      },
      {
        type: "input",
        name: "vehicle_vin",
        label: "VIN",
        placeholder: "VIN",
        required: true,
      },
      {
        type: "input",
        name: "vehicle_registration_plate",
        label: "Регистрационный знак",
        placeholder: "Регистрационный знак",
        required: true,
      },
      {
        type: "input",
        name: "vehicle_registration_series_and_number",
        label: "Серия и номер регистрации ТС",
        placeholder: "Серия и номер регистрации ТС",
        required: true,
      },
    ],
    owner: [
      {
        type: "radio",
        buttonGroupType: "small",
        name: "owner_person_type",
        label: "owner_person_type",
        buttons: ["Физ. лицо", "Юр. лицо"],
      },
      {
        type: "input",
        name: "owner_fio",
        label: "ФИО",
        placeholder: "ФИО Собственника",
        required: true,
      },
      {
        type: "input",
        name: "owner_passport_data",
        label: "Серия и номер паспорта",
        placeholder: "Введите серию и номер",
        required: true,
      },
    ],
    duration: [
      {
        type: "select",
        name: "duration_of_stay",
        label: "Длительность пребывания",
        placeholder: "Длительность пребывания",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "Option 1",
          },
          {
            label: "Option 2",
            value: "Option 2",
          },
        ],
      },
      {
        type: "input",
        name: "date_of_start",
        label: "Дата начала",
        placeholder: "Выберите дату",
        inputType: "date",
        required: true,
        options: [
          {
            label: "Option 1",
            value: "Option 1",
          },
          {
            label: "Option 2",
            value: "Option 2",
          },
        ],
      },
    ],
  };
  return fields;
}
