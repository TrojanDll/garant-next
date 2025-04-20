import { TPersonType } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IShadowState {
  isShadowVisible: boolean;
  setIsShadowVisible: (value: boolean) => void;
  toggleIsShadowVisible: () => void;
}

const useShadow = create<IShadowState>()(
  immer((set) => ({
    isShadowVisible: false,

    setIsShadowVisible: (value: boolean) =>
      set((state) => {
        state.isShadowVisible = value;
      }),

    toggleIsShadowVisible: () =>
      set((state) => {
        state.isShadowVisible = !state.isShadowVisible;
      }),
  }))
);

export default useShadow;
