import { TAuthType } from "@/types/auth.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ICarBrand {
  carBrand: string;
  setCarBrand: (value: string) => void;
}

const useCarBrand = create<ICarBrand>()(
  immer((set) => ({
    carBrand: "",
    setCarBrand: (value: string) =>
      set((state) => {
        state.carBrand = value;
        console.log(state.carBrand);
      }),
  }))
);

export default useCarBrand;
