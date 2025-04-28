import TitleWithLink from "@/components/entities/TitleWithLink/TitleWithLink";
import type { Metadata } from "next";

import styles from "./PolicyPage.module.scss";

export const metadata: Metadata = {
  title: "Политика",
};
export default function PolicyPage() {
  return (
    <>
      <TitleWithLink className={styles.title}>Детали полиса</TitleWithLink>
    </>
  );
}
