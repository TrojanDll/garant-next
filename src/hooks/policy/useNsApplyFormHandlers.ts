import { ICalculateNsPolicyRequest, ICreateNsPolicyRequest } from "@/types/policy.types";
import { UseFormWatch } from "react-hook-form";

export function useNsApplyFormHandlers(
  watch: UseFormWatch<ICreateNsPolicyRequest>,
  calculateNsMutate: (value: ICalculateNsPolicyRequest) => void,
  setPromocodeError: (mark: boolean) => void,
  setIsCalculatedBlockVisible: (value: boolean) => void
) {
  const watchedFields = watch(["duration_of_stay", "promocode", "insured"]);

  function handleCalculateClick() {
    setPromocodeError(false);
    setIsCalculatedBlockVisible(true);
    calculateNsMutate({
      duration_of_stay: watchedFields[0],
      promocode: watchedFields[1],
      quantity: watchedFields[2].length,
    });
  }

  return {
    handleCalculateClick,
    watchedFields,
  };
}
