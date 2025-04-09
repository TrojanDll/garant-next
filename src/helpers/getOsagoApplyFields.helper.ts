import { IFieldConfig } from "@/types/IFieldConfig";

export interface ISplitFieldConfig {
  [key: string]: IFieldConfig[]
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
  };
  return fields;
}
