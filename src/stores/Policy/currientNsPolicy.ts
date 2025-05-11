import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  ICalculateNsPolicyResponse,
  ICalculateNsPolicyResponseData,
  ICreateNsPolicyRequest,
  ICreateNsPolicyResponse,
  INsPolicy,
} from "@/types/policy.types";

interface ICurrientNsPolicy {
  policy: ICreateNsPolicyRequest | undefined;
  calculationData: ICalculateNsPolicyResponseData | undefined;
  setPolicy: (value: ICreateNsPolicyRequest | undefined) => void;
  setCalculationData: (value: ICalculateNsPolicyResponseData | undefined) => void;
}

const useCurrientNsPolicy = create<ICurrientNsPolicy>()(
  persist(
    immer((set) => ({
      policy: undefined,
      calculationData: undefined,
      setPolicy: (value: ICreateNsPolicyRequest | undefined) =>
        set((state) => {
          state.policy = value;
        }),
      setCalculationData: (value: ICalculateNsPolicyResponseData | undefined) =>
        set((state) => {
          state.calculationData = value;
        }),
    })),
    {
      name: "current-ns-policy-store",
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

export default useCurrientNsPolicy;
