import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IHeaderHamburger {
  isOpened: boolean;
  toggleIsOpened: (arg: boolean) => void;
}

const useSidebarStore = create<IHeaderHamburger>()(
  immer((set) => ({
    isOpened: false,

    toggleIsOpened: () =>
      set((state) => {
        state.isOpened = !state.isOpened;
      }),
  }))
);

export { useSidebarStore };
