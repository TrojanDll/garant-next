import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { generateYearOptions } from "../generateYearOptions";
import { carsService } from "@/services/cars.service";
import { useGetCarCategories } from "@/hooks/cars/useGetCarCategories";
import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import useCarBrandsList from "@/stores/Cars/carBrandsList";
import { ICarBrand } from "@/types/cars.types";
import {
  getCarBrandsFromSessionStorage,
  saveCarBrandsToSessionStorage,
} from "./saveCarBrandsToSessionStorage";

export interface ISplitFieldConfig {
  [key: string]: IFieldConfig<IOsagoApplyForm>[];
}

export default async function getOsagoApplyFields(): Promise<ISplitFieldConfig> {
  const storedCarsBrands = getCarBrandsFromSessionStorage();

  const carCategories = await carsService.getCarCategories();
  // const fetchedCarBrands = await carsService.getCarBrands();
  const popularBrands = await carsService.getPopularCarBrands();

  const carBrands =
    storedCarsBrands && storedCarsBrands.length > 0
      ? storedCarsBrands
      : ((await carsService.getCarBrands()).data.brands as ICarBrand[]);

  if (!storedCarsBrands || storedCarsBrands.length === 0) {
    console.log("Запись в store");
    saveCarBrandsToSessionStorage(carBrands);
  }

  // const popularBrands: IOptions[] = [
  //   { label: "Mercedes", value: "Mercedes" },
  //   { label: "bmw", value: "bmw" },
  //   { label: "nissan", value: "nissan" },
  //   { label: "Ford", value: "Ford" },
  //   { label: "mazeratti", value: "mazeratti" },
  // ];

  let formatedPopularBrands: IOptions[] = await popularBrands.data.data.map((item) => {
    return {
      label: item.title.toUpperCase(),
      value: item.title.toUpperCase(),
    };
  });

  const formatedCarCategories = await carCategories.data.data.map((category) => {
    return {
      label: category.Category,
      value: category.Category,
    };
  });

  let formatedCarBrands: { label: string; value: string }[] = [];

  formatedCarBrands.push({
    label: "Другое ТС",
    value: "another_vehicle",
  });

  const fetchedAndFormatedCarBrands: { label: string; value: string }[] =
    await carBrands.map((brand) => {
      return {
        label: brand.Make_Name,
        value: brand.Make_Name,
      };
    });

  formatedCarBrands = [...formatedCarBrands, ...fetchedAndFormatedCarBrands];

  formatedCarBrands = formatedCarBrands;

  const fields: ISplitFieldConfig = {
    vehicle: [
      {
        type: "select",
        name: "transport_category",
        label: "Категория ТС",
        isSearchable: false,
        placeholder: "Категория ТС",
        required: true,
        options: formatedCarCategories,
      },
      {
        type: "select",
        name: "brand",
        label: "Марка",
        placeholder: "Начните вводить марку",
        required: true,
        tooltip: true,
        tooltipText: "Если вашего ТС нет в списке, в поле «Марка» выберите «Другое ТС»",
        options: formatedCarBrands,
        popularBrands: formatedPopularBrands,
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
        tooltip: true,
        tooltipText: "Если вашего ТС нет в списке, в поле «Марка» выберите «Другое ТС»",
        required: true,
        options: [
          {
            label: "Сначала выберите марку",
            value: "thumbnail",
          },
        ],
      },
      {
        type: "select",
        name: "year",
        label: "Год выпуска ТС",
        placeholder: "Год выпуска ТС",
        required: true,
        options: generateYearOptions(1980),
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
        name: "owner",
        label: "owner",
        buttons: ["Физ. лицо", "Юр. лицо"],
      },
      {
        type: "input",
        name: "fio",
        label: "ФИО",
        placeholder: "ФИО Собственника",
        required: true,
      },
      {
        type: "input",
        name: "passport_number",
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
            label: "До 3 суток",
            value: "До 3 суток",
          },
          {
            label: "До 15 суток",
            value: "До 15 суток",
          },
          {
            label: "До 30 суток",
            value: "До 30 суток",
          },
          {
            label: "До 90 суток",
            value: "До 90 суток",
          },
          {
            label: "До 183 суток",
            value: "До 183 суток",
          },
          {
            label: "До 1 года",
            value: "До 1 года",
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
        startDate: new Date(),
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
