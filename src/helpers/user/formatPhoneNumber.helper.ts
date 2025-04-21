export function formatPhoneNumber(phone: string | undefined): string {
  const digitsOnly = phone ? phone.replace(/\D/g, "") : "";

  const cleaned = digitsOnly.replace(/^(\+?7|8)/, "");

  const tenDigits = cleaned.slice(0, 10);

  const areaCode = tenDigits.slice(0, 3);
  const mainNumber = tenDigits.slice(3);

  return phone ? `7(${areaCode})${mainNumber}` : "";
}

export function formatPhoneNumberToClient(phone: string | undefined): string {
  const digits = phone ? phone.replace(/\D/g, "").slice(0, 11) : "";

  if (digits.length < 11) return phone ? phone : "";

  const country = digits[0];
  const code = digits.slice(1, 4);
  const part1 = digits.slice(4, 7);
  const part2 = digits.slice(7, 9);
  const part3 = digits.slice(9, 11);

  return `+${country} (${code}) ${part1} ${part2} ${part3}`;
}

export function formatPhoneNumberToInput(phone: string | undefined): string {
  const digitsOnly = phone ? phone.replace(/\D/g, "") : "";

  return phone ? digitsOnly.slice(0, 11) : "";
}
