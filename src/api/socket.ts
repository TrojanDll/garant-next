// import { getToken } from "@/services/auth-token.service";
// import Echo from "laravel-echo";
// import { io } from "socket.io-client";

// if (typeof window !== "undefined") {
//   window.io = io;
// }

// const echo = new Echo({
//   broadcaster: "reverb",
//   host: "ws://garantcp.ru:6001", // ws:// və ya https:// uyğun olmalıdır
//   withCredentials: true,
//   authEndpoint: "https://garantcp.ru/broadcasting/auth",
//   auth: {
//     headers: {
//       Authorization: `Bearer ${getToken()}`, // əgər bearer token ilə auth edirsənsə
//     },
//   },
//   transports: ["websocket"],
// });

// export default echo;
