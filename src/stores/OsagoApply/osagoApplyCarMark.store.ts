import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IOsagoApplyCarMarkState {
  isAnotherCarMark: boolean;
  setCarMarkValue: (mark: boolean) => void;
}

const useOsagoApplyCarMark = create<IOsagoApplyCarMarkState>()(
  immer((set) => ({
    isAnotherCarMark: false,

    setCarMarkValue: (mark: boolean) =>
      set((state) => {
        state.isAnotherCarMark = mark;
      }),
  }))
);

export default useOsagoApplyCarMark;
