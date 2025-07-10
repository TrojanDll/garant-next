import axios, { type CreateAxiosDefaults } from "axios";

import { errorCatch } from "./error";
import { getToken, removeFromStorage } from "@/services/auth-token.service";
import { PAGES } from "@/config/pages-url.config";

const BASE_URL = "https://garantcp.ru";

const options: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

// Добавляем CSRF-интерцептор для axiosClassic (для неавторизованных запросов)
axiosClassic.interceptors.request.use(async (config) => {
  // Пропускаем для самого запроса за CSRF-токеном
  if (config.url?.includes("sanctum/csrf-cookie")) return config;

  // Для всех остальных запросов сначала получаем CSRF
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
  return config;
});

axiosWithAuth.interceptors.request.use(async (config) => {
  // const token = getToken();

  // Получаем CSRF-токен перед авторизованными запросами
  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });

  // if (config?.headers && token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

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
      // removeFromStorage();
      // if (typeof window !== "undefined") {
      //   window.location.href = PAGES.AUTH;
      // }
    }

    // NextResponse.redirect(PAGES.HOME);

    throw error;
  }
);

const isAxiosError = axios.isAxiosError;

export { axiosClassic, axiosWithAuth, isAxiosError };
