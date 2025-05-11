import { EPolicyStatus, EPolicyTypes, IAllPolicies } from "@/types/policy.types";
import { getPaymentStatus } from "./getPaymentStatus";

export function filterPolicies(
  allPolicies: IAllPolicies,
  policyType: EPolicyTypes | undefined,
  activityStatus: EPolicyStatus | undefined
): IAllPolicies {
  const filtered: IAllPolicies = {
    OSAGO: [],
    NS: [],
  };

  if (!policyType || policyType === EPolicyTypes.OSAGO) {
    filtered.OSAGO = allPolicies.OSAGO.filter((policy) =>
      matchesStatus(policy.payment_status, activityStatus)
    );
  }

  if (!policyType || policyType === EPolicyTypes.NS) {
    filtered.NS = allPolicies.NS.filter((policy) =>
      matchesStatus(policy.status, activityStatus)
    );
  }

  return filtered;
}

function matchesStatus(policyStatus: string, filterStatus?: EPolicyStatus): boolean {
  if (!filterStatus) return true;

  const normalized = getPaymentStatus(policyStatus);
  return normalized === filterStatus;
}
