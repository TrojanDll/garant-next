import { NextRequest, NextResponse } from "next/server";

import { PAGES } from "./config/pages-url.config";
import { EnumTokens } from "./services/auth-token.service";

export async function middleware(request: NextRequest, response: NextResponse) {
  // const { url, cookies } = request;

  // const token = cookies.get(EnumTokens.TOKEN)?.value;

  // const isAuthPage = url.includes("/auth");

  // if (isAuthPage && token) {
  //   return NextResponse.redirect(new URL(PAGES.HOME, url));
  // }

  // if (isAuthPage) {
  //   return NextResponse.next();
  // }

  // if (!token) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
  // matcher
};
