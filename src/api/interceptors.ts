import axios, { type CreateAxiosDefaults } from "axios";

import { errorCatch } from "./error";
import { getToken, removeFromStorage } from "@/services/auth-token.service";
import { PAGES } from "@/config/pages-url.config";

const options: CreateAxiosDefaults = {
  baseURL: "http://46.149.69.195:7777/garant-abh-admin.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const token = getToken();

  if (config?.headers && token)
    config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    console.log(error);
    if (
      error?.response?.status === 401 ||
      errorCatch(error) === "Unauthenticated."
    ) {
      removeFromStorage();

      if (typeof window !== "undefined") {
        window.location.href = PAGES.AUTH;
      }
    }

    // NextResponse.redirect(PAGES.HOME);

    throw error;
  }
);

const isAxiosError = axios.isAxiosError;

export { axiosClassic, axiosWithAuth, isAxiosError };
