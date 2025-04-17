import { TAuthType } from "@/types/auth.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IAuthType {
  authType: TAuthType;
  setAuthType: (value: TAuthType) => void;
}

const useAuthType = create<IAuthType>()(
  immer((set) => ({
    authType: "registration",
    setAuthType: (value: TAuthType) =>
      set((state) => {
        state.authType = value;
      }),
  }))
);

export default useAuthType;
