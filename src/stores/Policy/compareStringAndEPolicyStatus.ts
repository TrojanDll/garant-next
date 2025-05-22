import { EPolicyStatus } from "@/types/policy.types";

export function compareStringAndEPolicyStatus(value: string): EPolicyStatus {
  const values = Object.values(EPolicyStatus);
  const match = values.find((status) => status === value);

  return match ? (match as EPolicyStatus) : EPolicyStatus.ACTIVE;
}
