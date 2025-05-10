import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  ICreateOsagoPolicyRequest,
  IOsagoPaymentCalculation,
  IOsagoPolicy,
} from "@/types/policy.types";

interface ICurrientOsagoPolicy {
  policy: ICreateOsagoPolicyRequest | undefined;
  calculationData: IOsagoPaymentCalculation | undefined;
  setPolicy: (value: ICreateOsagoPolicyRequest | undefined) => void;
  setCalculationData: (value: IOsagoPaymentCalculation | undefined) => void;
}

const useCurrientOsagoPolicy = create<ICurrientOsagoPolicy>()(
  persist(
    immer((set) => ({
      policy: undefined,
      calculationData: undefined,
      setPolicy: (value: ICreateOsagoPolicyRequest | undefined) =>
        set((state) => {
          state.policy = value;
        }),
      setCalculationData: (value: IOsagoPaymentCalculation | undefined) =>
        set((state) => {
          state.calculationData = value;
        }),
    })),
    {
      name: "current-policy-store",
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

export default useCurrientOsagoPolicy;
