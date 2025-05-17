import { ICarBrand } from "@/types/cars.types";

export const saveCarBrandsToSessionStorage = (brands: ICarBrand[]): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("carBrands", JSON.stringify(brands));
  }
};

export const getCarBrandsFromSessionStorage = (): ICarBrand[] => {
  if (typeof window === "undefined") return [];

  const data = sessionStorage.getItem("carBrands");
  if (!data) return [];

  try {
    return JSON.parse(data) as ICarBrand[];
  } catch (error) {
    console.error("Failed to parse car brands from sessionStorage", error);
    return [];
  }
};
