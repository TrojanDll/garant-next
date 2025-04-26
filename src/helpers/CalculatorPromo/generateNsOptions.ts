import { IOptions } from "@/components/ui/CustomSelect/CustomSelect";

export function generateNsOptions(maximum: number): IOptions[] {
  const numbersArr = Array.from({ length: maximum }, (_, i) => i + 1);

  return numbersArr.map((item) => ({ label: item.toString(), value: item.toString() }));
}
