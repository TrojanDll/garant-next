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

  return { goBack, reloadPage };
}
