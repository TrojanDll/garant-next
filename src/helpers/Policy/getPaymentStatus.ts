import { EPolicyStatus } from "@/types/policy.types";

export function getPaymentStatus(status: string): EPolicyStatus {
  const statusEnumValue: EPolicyStatus =
    status === "Активный"
      ? EPolicyStatus.ACTIVE
      : status === "Ожидает оплаты"
      ? EPolicyStatus.AWAITING_PAYMENT
      : status === "Истек срок действия"
      ? EPolicyStatus.EXPIRED
      : EPolicyStatus.AWAITING_PAYMENT;

  return statusEnumValue;
}
