import { notFound } from "next/navigation";
import { Metadata } from "next";

import TitleWithLink from "@/components/entities/TitleWithLink/TitleWithLink";
import PolicyInfo from "@/components/widgets/PolicyInfo/PolicyInfo";

import styles from "./PolicyPage.module.scss";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Полис",
};

export default async function PolicyPage() {
  return (
    <>
      <TitleWithLink className={styles.title}>Детали полиса</TitleWithLink>
      <Suspense>
        <PolicyInfo className={styles.info} />
      </Suspense>
    </>
  );
}
