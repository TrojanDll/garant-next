import { ICarModelV2 } from "@/types/cars.types";
import { getCarBrandsFromSessionStorage } from "./saveCarBrandsToSessionStorage";

export function getCarModelsByBrandName(
  brandName: string
): ICarModelV2[] | null {
  const carBrands = getCarBrandsFromSessionStorage();

  const models: ICarModelV2[] | undefined = carBrands.find((brand) => {
    if (brand.name === brandName) {
      return true;
    }

    return false;
  })?.models;

  return models ? models : null;
}
