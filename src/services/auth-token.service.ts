import Cookies from "js-cookie";

export enum EnumTokens {
  "TOKEN" = "token2",
}

export const getToken = () => {
  const token = Cookies.get(EnumTokens.TOKEN);
  return token || null;
};

export const saveTokenToStorage = (token: string) => {
  Cookies.set(EnumTokens.TOKEN, token, {
    sameSite: "strict",
    expires: 7,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.TOKEN);
};

export const getUserFromCookie = () => {
  return Cookies.get("user");
};
