import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { getToken } from "@/services/auth-token.service";

const isBrowser = typeof window !== "undefined";

let echo: Echo<"pusher"> | null = null;

if (isBrowser) {
  // Важно! Не задаём `cluster`, а только локальные опции
  const pusher = new Pusher("k9nryj9wfsbb9ukbitjb", {
    cluster: "mt1",
    // wsHost: "garantcp.ru",
    // wsPort: 8080,
    // forceTLS: false,
    // disableStats: true,
    // enabledTransports: ["ws", "wss"],
    // authEndpoint: "https://garantcp.ru/broadcasting/auth",
    // auth: {
    //   headers: {
    //     Authorization: `Bearer ${getToken()}`,
    //   },
    // },
  });

  // Обязательно прокидываем в window (Laravel Echo требует)
  // window.Pusher = Pusher;

  echo = new Echo({
    broadcaster: "pusher",
    client: pusher, // 👈 вот ключ
    auth: {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
    wsHost: "garantcp.ru",
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    authEndpoint: "https://garantcp.ru/broadcasting/auth",
  });
}

export default echo as Echo<"pusher">;
