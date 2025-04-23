import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

export interface ISplitFieldConfig {
  [key: string]: IFieldConfig<IOsagoApplyForm>[];
}

export default async function getOsagoApplyFields(): Promise<ISplitFieldConfig> {
  const fields: ISplitFieldConfig = {
    vehicle: [
      {
        type: "select",
        name: "transport_category",
        label: "Категория ТС",
        isSearchable: false,
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
        name: "brand",
        label: "Марка",
        placeholder: "Марка",
        required: true,
        tooltip: true,
        tooltipText: "Если марки вашего ТС нет в списке, выберите «Другое ТС» ",
        options: [
          {
            label: "Другое ТС",
            value: "another_vehicle",
          },
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
        name: "vehicle_refined_make",
        label: "Уточните марку",
        placeholder: "Введите марку",
        required: false,
      },
      {
        type: "select",
        name: "model",
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
        name: "year",
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
        name: "vin",
        label: "VIN",
        placeholder: "VIN",
        required: true,
      },
      {
        type: "input",
        name: "registration_plate",
        label: "Регистрационный знак",
        placeholder: "А123АА | 999",
        required: true,
      },
      {
        type: "input",
        name: "registration_number",
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
        isSearchable: false,
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
      },
    ],
    promocode: [
      {
        type: "input",
        name: "promocode",
        label: "Промокод",
        placeholder: "Введите промокод",
        inputType: "promocode",
        required: false,
      },
    ],
  };
  return fields;
}
