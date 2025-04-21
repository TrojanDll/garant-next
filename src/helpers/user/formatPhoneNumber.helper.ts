export function formatPhoneNumber(phone: string | undefined): string {
  const digits = phone ? phone.replace(/\D/g, "").slice(0, 11) : "";

  if (digits.length < 4) return digits;

  const first = digits[0];
  const code = digits.slice(1, 4);
  const rest = digits.slice(4);

  return `${first}(${code})${rest}`;
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
