import { TAuthType } from "@/types/auth.types";
import { ICarBrand } from "@/types/cars.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ICarBrandList {
  carBrands: ICarBrand[] | undefined;
  setCarBrands: (value: ICarBrand[]) => void;
}

const useCarBrandsList = create<ICarBrandList>()(
  immer((set) => ({
    carBrands: undefined,
    setCarBrands: (value: ICarBrand[]) =>
      set((state) => {
        state.carBrands = value;
      }),
  }))
);

export default useCarBrandsList;
