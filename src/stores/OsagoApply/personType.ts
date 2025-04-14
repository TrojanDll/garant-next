import { TPersonType } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IPersonTypeState {
  personType: TPersonType;
  setPersonType: (value: TPersonType) => void;
}

const usePersonType = create<IPersonTypeState>()(
  immer((set) => ({
    personType: "individual",

    setPersonType: (value: TPersonType) =>
      set((state) => {
        state.personType = value;
      }),
  }))
);



export default usePersonType;
