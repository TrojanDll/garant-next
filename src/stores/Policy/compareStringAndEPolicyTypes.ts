import { EPolicyTypes } from "@/types/policy.types";

export function compareStringAndEPolicyTypes(value: string): EPolicyTypes | undefined {
  const values = Object.values(EPolicyTypes);
  const match = values.find((status) => status === value);

  return match ? (match as EPolicyTypes) : undefined;
}
