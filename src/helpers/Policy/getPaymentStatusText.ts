import { EPolicyStatus } from "@/types/policy.types";

export function getPaymentStatusText(status: EPolicyStatus): string {
  const statusText =
    status === EPolicyStatus.ACTIVE
      ? "Активный"
      : status === EPolicyStatus.AWAITING_PAYMENT
      ? "Ожидает оплаты"
      : status === EPolicyStatus.EXPIRED
      ? "Истек срок действия"
      : "";

  return statusText;
}
