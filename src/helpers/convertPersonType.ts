import { TPersonType } from "@/types/user.types";

export function convertPersonType(value: string | undefined): TPersonType {
  if (value === "Физ. лицо") {
    return "individual";
  } else if (value === "Юр. лицо") {
    return "legal_entity";
  }

  return "individual";
}
