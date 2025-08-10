import { TPersonType } from "@/types/user.types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IPersonType {
  value: TPersonType;
  id: string;
}

interface IPersonTypeState {
  personType: IPersonType[];
  setPersonType: (value: IPersonType[]) => void;
}

const usePersonType = create<IPersonTypeState>()(
  immer((set) => ({
    personType: [
      {
        id: "",
        value: "individual",
      },
    ],

    setPersonType: (value: IPersonType[]) =>
      set((state) => {
        state.personType = value;
      }),
  }))
);

export default usePersonType;
