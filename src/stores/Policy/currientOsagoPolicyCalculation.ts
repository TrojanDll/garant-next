import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { IOsagoPaymentCalculation } from "@/types/policy.types";

interface ICurrientOsagoPolicyCalculation {
  calculationData: IOsagoPaymentCalculation | undefined;
  setCalculationData: (value: IOsagoPaymentCalculation | undefined) => void;
}

const useCurrientOsagoPolicyCalculation = create<ICurrientOsagoPolicyCalculation>()(
  persist(
    immer((set) => ({
      calculationData: undefined,
      setCalculationData: (value: IOsagoPaymentCalculation | undefined) =>
        set((state) => {
          state.calculationData = value;
        }),
    })),
    {
      name: "current-osago-policy-calculation-store",
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

export default useCurrientOsagoPolicyCalculation;
