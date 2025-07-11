// import type Pusher from "laravel-echo/dist/pusher";
import type io from "socket.io-client";

declare global {
  interface Window {
    io: typeof io;
  }
}
