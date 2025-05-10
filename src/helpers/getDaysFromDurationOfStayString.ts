export function getDaysFromDurationOfStayString(durationOfStay: string): number {
  if (durationOfStay === "До 3 суток") {
    return 3;
  } else if (durationOfStay === "До 15 суток") {
    return 15;
  } else if (durationOfStay === "До 30 суток") {
    return 30;
  } else if (durationOfStay === "До 90 суток") {
    return 90;
  } else if (durationOfStay === "До 183 суток") {
    return 183;
  } else if (durationOfStay === "До 1 года") {
    return 365;
  }
  return 1;
}
