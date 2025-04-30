export function getDaysBetweenDates(date1: string, date2: string): number {
  const [day1, month1, year1] = date1.split(".").map(Number);
  const [day2, month2, year2] = date2.split(".").map(Number);

  const firstDate = new Date(year1, month1 - 1, day1);
  const secondDate = new Date(year2, month2 - 1, day2);

  const diffInMs = Math.abs(firstDate.getTime() - secondDate.getTime());
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
