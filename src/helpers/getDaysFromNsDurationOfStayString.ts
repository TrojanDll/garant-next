export function getDaysFromNsDurationOfStayString(durationOfStay: string): number {
  if (
    durationOfStay ===
    "Лица, прибывающие на территорию Республики Абхазия на срок до 24 часов"
  ) {
    return 1;
  } else if (
    durationOfStay ===
    "Лица, прибывающие на территорию Республики Абхазия на срок до 7 суток включительно"
  ) {
    return 7;
  } else if (
    durationOfStay ===
    "Лица, прибывающие на территорию Республики Абхазия на срок до 15 суток включительно"
  ) {
    return 15;
  } else if (
    durationOfStay ===
    "Лица, прибывающие на территорию Республики Абхазия на срок до 30 суток включительно"
  ) {
    return 30;
  } else if (
    durationOfStay ===
    "Лица, прибывающие на территорию Республики Абхазия на срок до 90 суток включительно"
  ) {
    return 90;
  } else if (
    durationOfStay ===
    "Лица, прибывающие на территорию Республики Абхазия на срок до 183 суток включительно"
  ) {
    return 183;
  } else if (
    durationOfStay ===
    "Лица, прибывающие на территорию Республики Абхазия на срок до 1 года включительно"
  ) {
    return 365;
  }
  return 1;
}
