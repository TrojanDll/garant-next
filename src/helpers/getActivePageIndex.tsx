import { PAGES } from "@/config/pages-url.config";

export function getActivePageIndex(pathname: string): number {
  const MY_POLICIES_INDEX = 0;
  const DASHBOARD_INDEX = 1;
  const CARS_INDEX = 2;

  let activeIndex = 0;

  if (pathname === PAGES.MY_POLICIES) {
    activeIndex = MY_POLICIES_INDEX;
  } else if (pathname === PAGES.DASHBOARD || pathname === PAGES.EDIT_PERSONAL_DATA) {
    activeIndex = DASHBOARD_INDEX;
  } else if (pathname.startsWith(PAGES.CARS)) {
    activeIndex = CARS_INDEX;
  }
  return activeIndex;
}
