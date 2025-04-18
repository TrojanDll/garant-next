import { NextRequest, NextResponse } from "next/server";

import { PAGES } from "./config/pages-url.config";
import { EnumTokens } from "./services/auth-token.service";
import { privatePages, publicPages } from "./config/pages-privacy.config";

export async function middleware(request: NextRequest, response: NextResponse) {

  const { url, cookies, nextUrl } = request;

  const token = cookies.get(EnumTokens.TOKEN)?.value;
  let isPublicPage = true;

  // console.log(nextUrl.pathname);
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
    PAGES.ABOUT,
    PAGES.CALCULATOR,
    PAGES.CONTACTS,
    PAGES.DOCUMENTS,
    PAGES.DOCUMENTS,
    PAGES.HELP,
    PAGES.HOME,
    PAGES.NS,
    PAGES.NS_APPLY,
    PAGES.OSAGO,
    PAGES.OSAGO_APPLY,
    PAGES.POLICY,
    PAGES.RECOVERY,
    PAGES.DASHBOARD,
  ],
  // matcher
};
