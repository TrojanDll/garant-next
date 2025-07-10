import RecoveryEmail from "@/components/widgets/RecoveryEmail/RecoveryEmail";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Восстановление",
  ...NO_INDEX_PAGE,
};
export default function Recovery() {
  return (
    <Suspense>
      <RecoveryEmail />
    </Suspense>
  );
}
