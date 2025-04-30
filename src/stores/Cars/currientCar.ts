import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ICar } from "@/types/cars.types";

interface ICurrientCar {
  car: ICar | undefined;
  setCar: (value: ICar | undefined) => void;
}

const useCurrientCar = create<ICurrientCar>()(
  persist(
    immer((set) => ({
      car: undefined,
      setCar: (value: ICar | undefined) =>
        set((state) => {
          state.car = value;
        }),
    })),
    {
      name: "current-car-store",
      storage: {
        getItem: (key) => {
          const stored = sessionStorage.getItem(key);
          return stored ? JSON.parse(stored) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key);
        },
      },
    }
  )
);

export default useCurrientCar;
