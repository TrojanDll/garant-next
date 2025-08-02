import { ICarBrand, ICarBrandV2 } from "@/types/cars.types";

export const saveCarBrandsToSessionStorage = (brands: ICarBrandV2[]): void => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("carBrands", JSON.stringify(brands));
  }
};

export const getCarBrandsFromSessionStorage = (): ICarBrandV2[] => {
  if (typeof window === "undefined") return [];

  const data = sessionStorage.getItem("carBrands");
  if (!data) return [];

  try {
    return JSON.parse(data) as ICarBrandV2[];
  } catch (error) {
    console.error("Failed to parse car brands from sessionStorage", error);
    return [];
  }
};
