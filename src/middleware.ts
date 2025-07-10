import { NextRequest, NextResponse } from "next/server";

import { PAGES } from "./config/pages-url.config";
import { EnumTokens } from "./services/auth-token.service";
import { privatePages, publicPages } from "./config/pages-privacy.config";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies, nextUrl } = request;

  const token = cookies.get("token2");
  console.log(token);
  let isPublicPage = true;

  for (let i = 0; i < privatePages.length; i++) {
    if (nextUrl.pathname === privatePages[i]) {
      isPublicPage = false;
      break;
    }
  }

  if (isPublicPage) {
    if (token && nextUrl.pathname === "/auth") {
      return NextResponse.redirect(new URL(PAGES.HOME, request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot|otf|js|css|map|pdf|docx|zip)).*)",
  ],
  // matcher: [
  //   "/",
  //   "/calculator",
  //   "/osago",
  //   "/ns",
  //   "/contacts",
  //   "/help",
  //   "/dashboard",
  //   "/documents",
  //   "/about",
  //   "/policy",
  //   "/recovery",
  //   "/auth",
  //   "/osago/apply",
  //   "/ns/apply",
  // ],
  // matcher
};
