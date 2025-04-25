import { TAuthType } from "@/types/auth.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ICarBrand {
  carBrands: ICarBrand[];
  setCarBrands: (value: ICarBrand[]) => void;
}

const carBrandsList = create<ICarBrand>()(
  immer((set) => ({
    carBrands: [],
    setCarBrands: (value: ICarBrand[]) =>
      set((state) => {
        state.carBrands = value;
      }),
  }))
);

export default carBrandsList;
