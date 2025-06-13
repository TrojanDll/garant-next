import { IAllPolicies } from "@/types/policy.types";

export function sortByNewestPolicy(items: IAllPolicies): IAllPolicies {
  let sortedPolicies: IAllPolicies = {
    NS: [],
    OSAGO: [],
  };

  sortedPolicies.NS = [...items.NS].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  sortedPolicies.OSAGO = [...items.OSAGO].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return sortedPolicies;
}
