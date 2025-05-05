export function formatPhoneNumber(phone: string | undefined): string {
  const digits = phone ? phone.replace(/\D/g, "") : "";

  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) {
    return `7${digits.slice(1)}`;
  } else if (digits.length === 10) {
    return `7${digits}`;
  }

  return "";
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

export function formatPhoneNumberToWithBrackets(
  phone: string | undefined | null
): string {
  const digitsOnly = phone ? phone.replace(/\D/g, "") : "";

  if (!digitsOnly.startsWith("7")) {
    throw new Error("Номер должен начинаться с кода страны 7");
  }

  const countryCode = digitsOnly.slice(0, 1);
  const areaCode = digitsOnly.slice(1, 4);
  const mainNumber = digitsOnly.slice(4);

  return `${countryCode}(${areaCode})${mainNumber}`;
}

export function formatPhoneNumberToInput(phone: string | undefined): string {
  const digitsOnly = phone ? phone.replace(/\D/g, "") : "";

  return phone ? digitsOnly.slice(0, 11) : "";
}
