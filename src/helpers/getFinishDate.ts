export function getFinishDate(startDate: string, daysCount: number): string {
  const [day, month, year] = startDate.split(".").map(Number);

  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + daysCount);

  const resultDay = String(date.getDate()).padStart(2, "0");
  const resultMonth = String(date.getMonth() + 1).padStart(2, "0");
  const resultYear = date.getFullYear();

  return `${resultDay}.${resultMonth}.${resultYear}`;
}
