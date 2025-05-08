import { PAGES } from "@/config/pages-url.config";
import { useRouter } from "next/navigation";

export function useNavigation() {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const reloadPage = () => {
    router.refresh();
  };

  const navigateToDashboard = () => {
    router.push(PAGES.DASHBOARD);
  };

  const navigateToHome = () => {
    router.push(PAGES.HOME);
  };

  const navigateToAuth = () => {
    router.push(PAGES.AUTH);
  };

  const savePathBeforeAuth = () => {
    const currentPath = window.location.pathname;
    sessionStorage.setItem("redirectAfterLogin", currentPath);
  };

  const navigateToCars = () => {
    router.push(PAGES.CARS);
  };

  const navigateToPolicies = () => {
    router.push(PAGES.MY_POLICIES);
  };

  const navigateToOsagoConfirm = () => {
    router.push(PAGES.OSAGO_CONFIRM);
  };

  const navigateToNsConfirm = () => {
    router.push(PAGES.NS_CONFIRM);
  };

  return {
    goBack,
    reloadPage,
    navigateToDashboard,
    savePathBeforeAuth,
    navigateToAuth,
    navigateToHome,
    navigateToCars,
    navigateToPolicies,
    navigateToOsagoConfirm,
    navigateToNsConfirm,
  };
}
