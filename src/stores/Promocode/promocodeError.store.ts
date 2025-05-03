import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IPromocodeErrorState {
  isError: boolean;
  setError: (mark: boolean) => void;
}

const usePromocodeError = create<IPromocodeErrorState>()(
  immer((set) => ({
    isError: false,

    setError: (value: boolean) =>
      set((state) => {
        state.isError = value;
      }),
  }))
);
 
export default usePromocodeError;
