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

  const navigateToAuth = () => {
    router.push(PAGES.AUTH);
  };

  const savePathBeforeAuth = () => {
    const currentPath = window.location.pathname;
    sessionStorage.setItem("redirectAfterLogin", currentPath);
  };

  return { goBack, reloadPage, navigateToDashboard, savePathBeforeAuth, navigateToAuth };
}
