import { EPolicyStatus } from "@/types/policy.types";

export function compareStringAndEPolicyStatus(value: string): EPolicyStatus | undefined {
  const values = Object.values(EPolicyStatus);
  const match = values.find((status) => status === value);

  return match ? (match as EPolicyStatus) : undefined;
}
