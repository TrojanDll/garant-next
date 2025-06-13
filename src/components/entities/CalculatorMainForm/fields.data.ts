import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";
import { generateNsOptions } from "@/helpers/CalculatorPromo/generateNsOptions";
import { ICalculatorNsForm, ICalculatorOsagoForm } from "@/types/ICalculatorForms";
import { IFieldConfig } from "@/types/IFieldConfig";

export const calculatorPromoNsDurationOptions: IOptions[] = [
  {
    label: "До 24 часов",
    value: "category_1",
  },
  {
    label: "До 7 суток",
    value: "category_2",
  },
  {
    label: "До 15 суток",
    value: "category_3",
  },
  {
    label: "До 30 суток",
    value: "category_4",
  },
  {
    label: "До 90 суток",
    value: "category_5",
  },
  {
    label: "До 183 суток",
    value: "category_6",
  },
  {
    label: "До 1 года",
    value: "category_7",
  },
];

export const calculatorPromoOsagoDurationOptions: IOptions[] = [
  {
    label: "До 15 суток",
    value: "category_2",
  },
  {
    label: "До 30 суток",
    value: "category_3",
  },
  {
    label: "До 90 суток",
    value: "category_4",
  },
  {
    label: "До 183 суток",
    value: "category_5",
  },
  {
    label: "До 1 года",
    value: "category_6",
  },
];

export const selectsOsagoProps: IFieldConfig<ICalculatorOsagoForm>[] = [
  {
    type: "select",
    name: "car_category",
    label: "Категория ТС",
    placeholder: "Выберите категорию ТС",
    required: true,
    options: [
      {
        label:
          "Легковые автомобили, микроавтобусы с числом посадочных мест до 8 включительно",
        value: "category_1",
      },
      {
        label: "Прицепы к легковым автомобилям",
        value: "category_2",
      },
      {
        label: "Автобусы",
        value: "category_3",
      },
      {
        label:
          "Пассажирские автотранспортные средства с числом посадочных мест от 8 до 21 включительно",
        value: "category_4",
      },
      {
        label: "Грузовые автотранспортные средства",
        value: "category_5",
      },
      {
        label: "Прицепы и полуприцепы к грузовым автомобилям",
        value: "category_6",
      },
    ],
  },
  {
    type: "select",
    name: "duration_of_stay_osago",
    label: "Выберите срок пребывания",
    placeholder: "Выберите срок пребывания",
    required: true,
    options: calculatorPromoOsagoDurationOptions,
  },
];

export const selectsNSProps: IFieldConfig<ICalculatorNsForm>[] = [
  {
    type: "select",
    name: "number_of_people",
    label: "Количество человек",
    placeholder: "Количество человек",
    required: true,
    options: generateNsOptions(5),
  },
  {
    type: "select",
    name: "duration_of_stay_ns",
    label: "Выберите срок пребывания",
    placeholder: "Выберите срок пребывания",
    required: true,
    options: calculatorPromoNsDurationOptions,
  },
];
