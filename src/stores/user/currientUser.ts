import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ICar } from "@/types/cars.types";
import { IUser } from "@/types/user.types";

interface ICurrientCar {
  user: IUser | undefined;
  setUser: (value: IUser | undefined) => void;
}

const useCurrientUser = create<ICurrientCar>()(
  persist(
    immer((set) => ({
      user: undefined,
      setUser: (value: IUser | undefined) =>
        set((state) => {
          state.user = value;
        }),
    })),
    {
      name: "current-user-store",
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

export default useCurrientUser;
