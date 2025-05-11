import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { EPolicyStatus, EPolicyTypes } from "@/types/policy.types";

interface IPolicyFilters {
  activityStatus: EPolicyStatus | undefined;
  policyType: EPolicyTypes | undefined;
  setActivityStatus: (value: EPolicyStatus | undefined) => void;
  setPolicyType: (value: EPolicyTypes | undefined) => void;
}

const usePolicyFilters = create<IPolicyFilters>()(
  persist(
    immer((set) => ({
      activityStatus: EPolicyStatus.ACTIVE,
      policyType: undefined,
      setActivityStatus: (value: EPolicyStatus | undefined) =>
        set((state) => {
          state.activityStatus = value;
        }),

      setPolicyType: (value: EPolicyTypes | undefined) =>
        set((state) => {
          state.policyType = value;
        }),
    })),
    {
      name: "policy-filters-store",
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

export default usePolicyFilters;
