export interface ICalculatorTableItem {
  rowHeader: string;
  columns: Record<string, string>;
}

export type ICalculatorTable = ICalculatorTableItem[];

export interface ICalculatorPromoCategory {
  value: string;
  price: number;
}

export const osagoTable: ICalculatorTable = [
  {
    rowHeader: "category_1",
    columns: {
      category_1: "500",
      category_2: "1000",
      category_3: "1500",
      category_4: "2500",
      category_5: "5000",
      category_6: "8500",
    },
  },
  {
    rowHeader: "category_2",
    columns: {
      category_1: "200",
      category_2: "350",
      category_3: "500",
      category_4: "1000",
      category_5: "1200",
      category_6: "1500",
    },
  },
  {
    rowHeader: "category_3",
    columns: {
      category_1: "1000",
      category_2: "1800",
      category_3: "2500",
      category_4: "4500",
      category_5: "8000",
      category_6: "1200",
    },
  },
  {
    rowHeader: "category_4",
    columns: {
      category_1: "850",
      category_2: "1500",
      category_3: "2000",
      category_4: "4000",
      category_5: "7000",
      category_6: "10000",
    },
  },
  {
    rowHeader: "category_5",
    columns: {
      category_1: "1500",
      category_2: "2500",
      category_3: "4000",
      category_4: "5000",
      category_5: "7500",
      category_6: "12000",
    },
  },
  {
    rowHeader: "category_6",
    columns: {
      category_1: "500",
      category_2: "1000",
      category_3: "1500",
      category_4: "2000",
      category_5: "3000",
      category_6: "4000",
    },
  },
];

export const calculatorPromoCategories: ICalculatorPromoCategory[] = [
  { value: "category_1", price: 50 },
  { value: "category_2", price: 250 },
  { value: "category_3", price: 400 },
  { value: "category_4", price: 700 },
  { value: "category_5", price: 1800 },
  { value: "category_6", price: 3000 },
  { value: "category_7", price: 5000 },
];
