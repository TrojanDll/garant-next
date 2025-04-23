export function generateYearOptions(start: number): { value: string; label: string }[] {
  const currentYear = new Date().getFullYear();
  const years: { value: string; label: string }[] = [];

  for (let year = currentYear; year >= start; year--) {
    const yearStr = year.toString();
    years.push({ value: yearStr, label: yearStr });
  }

  return years;
}
