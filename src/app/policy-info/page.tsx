import TitleWithLink from "@/components/entities/TitleWithLink/TitleWithLink";
import type { Metadata } from "next";

import styles from "./PolicyPage.module.scss";
import PolicyInfo from "@/components/widgets/PolicyInfo/PolicyInfo";

export const metadata: Metadata = {
  title: "Полис",
};
export default function PolicyPage() {
  return (
    <>
      <TitleWithLink className={styles.title}>Детали полиса</TitleWithLink>
      <PolicyInfo className={styles.info} />
    </>
  );
}
