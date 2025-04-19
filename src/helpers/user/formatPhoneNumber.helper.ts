export function formatPhoneNumber(phone: string | undefined): string {
  const cleaned = phone?.replace(/\D/g, "");

  const normalized = cleaned?.startsWith("8")
    ? "7" + cleaned.slice(1)
    : cleaned?.startsWith("9")
    ? "7" + cleaned
    : cleaned?.startsWith("7")
    ? cleaned
    : "";

  const match = normalized.match(/^7(\d{3})(\d{3})(\d{4})$/);
  return match ? `7(${match[1]})${match[2]}${match[3]}` : phone ? phone : "";
}

export function formatPhoneNumberToClient(rawPhone: string | undefined): string {
  const digits = rawPhone?.replace(/\D/g, "");

  if (digits?.length === 11 && digits.startsWith("7")) {
    return `+${digits}`;
  }

  return rawPhone ? rawPhone : "";
}
