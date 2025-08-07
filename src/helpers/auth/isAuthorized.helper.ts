import { getToken } from "@/services/auth-token.service";

export function isAuthorized(): boolean {
  if (getToken()) {
    return true;
  }

  return false;
}
