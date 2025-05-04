// stores/eventTrigger.store.ts
import { create } from "zustand";

interface EventTriggerStore {
  trigger?: () => void;
  setTrigger: (fn: () => void) => void;
  callTrigger: () => void;
}

const usePromocodeEvent = create<EventTriggerStore>((set, get) => ({
  trigger: undefined,
  setTrigger: (fn) => set({ trigger: fn }),
  callTrigger: () => {
    const trigger = get().trigger;
    if (trigger) trigger();
  },
}));

export default usePromocodeEvent;
