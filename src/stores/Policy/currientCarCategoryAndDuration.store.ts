import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { EPolicyStatus, EPolicyTypes } from "@/types/policy.types";

interface ICurrientCarCategoryAndDuration {
  carCategory: string | undefined;
  duration: string | undefined;
  setCarCategory: (value: string | undefined) => void;
  setDuration: (value: string | undefined) => void;
}

const useCurrientCarCategoryAndDuration = create<ICurrientCarCategoryAndDuration>()(
  persist(
    immer((set) => ({
      carCategory: undefined,
      duration: undefined,
      setCarCategory: (value: string | undefined) =>
        set((state) => {
          state.carCategory = value;
        }),

      setDuration: (value: string | undefined) =>
        set((state) => {
          state.duration = value;
        }),
    })),
    {
      name: "currient-car-category-and-duration",
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

export default useCurrientCarCategoryAndDuration;
