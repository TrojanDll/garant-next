import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { ICurrientUser, IUser } from "@/types/user.types";

interface ICurrientCar {
  user: ICurrientUser | undefined;
  setUser: (value: ICurrientUser | undefined) => void;
}

const useCurrientUser = create<ICurrientCar>()(
  persist(
    immer((set) => ({
      user: undefined,
      setUser: (value: ICurrientUser | undefined) =>
        set((state) => {
          state.user = value;
        }),
    })),
    {
      name: "current-user-store",
      storage: {
        getItem: (key) => {
          const stored = localStorage.getItem(key);
          return stored ? JSON.parse(stored) : null;
        },
        setItem: (key, value) => {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);

export default useCurrientUser;
