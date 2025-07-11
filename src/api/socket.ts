import { getToken } from "@/services/auth-token.service";
import Echo from "laravel-echo";
import { BASE_URL } from "./interceptors";

export const echo = new Echo({
  broadcaster: "pusher",
  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
  wsHost: process.env.NEXT_PUBLIC_REVERB_HOST || "localhost",
  wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT) || 8080,
  forceTLS: false,
  enabledTransports: ["ws", "wss"],
  auth: {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  },
  authEndpoint: `${BASE_URL}/broadcasting/auth`,
  disableStats: true,
  encrypted: true,
});
