import axios, { type CreateAxiosDefaults } from "axios";

import { errorCatch } from "./error";
import { getToken, removeFromStorage } from "@/services/auth-token.service";
import { PAGES } from "@/config/pages-url.config";
// import Cookies from "js-cookie";
import Cookie from "universal-cookie";
import { getCookie } from "cookies-next";

const cookie = new Cookie();

const BASE_URL = "https://garantcp.ru";

const options: CreateAxiosDefaults = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "application/json",
    // "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
  },
  withCredentials: true,
  withXSRFToken: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

// Функция для получения XSRF-токена
const getXsrfToken = () => {
  if (typeof window === "undefined") {
    // Серверный рендеринг
    return "";
  }

  console.log("XSRF-TOKEN");
  console.log(cookie.get("XSRF-TOKEN"));
  console.log("window");
  console.log(window);

  console.log(document.cookie.split(";"));
  return cookie.get("XSRF-TOKEN");
};

// Общая функция для обновления CSRF-токена
const refreshCsrfToken = async () => {
  try {
    await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
      baseURL: BASE_URL,
    });
  } catch (error) {
    console.error("Failed to refresh CSRF token", error);
  }
};

// Добавляем XSRF-токен в каждый запрос
const addXsrfToken = async (config: any) => {
  // Для маршрутов, которые не требуют CSRF-токена
  if (config.url?.includes("sanctum/csrf-cookie")) return config;

  // Если токен отсутствует, обновляем его
  if (!getXsrfToken()) {
    await refreshCsrfToken();
  }

  // Добавляем токен в заголовки
  config.headers["X-XSRF-TOKEN"] = getXsrfToken();

  return config;
};

axiosClassic.interceptors.request.use(addXsrfToken);
axiosWithAuth.interceptors.request.use(addXsrfToken);

axiosClassic.interceptors.request.use(async (config) => {
  if (config.url?.includes("sanctum/csrf-cookie")) return config;

  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });

  return config;
});

axiosWithAuth.interceptors.request.use(async (config) => {
  // const token = getToken();

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
