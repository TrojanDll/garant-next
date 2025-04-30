import { notFound } from "next/navigation";
import { Metadata } from "next";

import TitleWithLink from "@/components/entities/TitleWithLink/TitleWithLink";
import PolicyInfo from "@/components/widgets/PolicyInfo/PolicyInfo";

import styles from "./PolicyPage.module.scss";

export const metadata: Metadata = {
  title: "Полис",
};

// Интерфейс для props, учитывающий асинхронные params
interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PolicyPage({ params }: Props) {
  // Разрешаем Promise для получения params
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const isValidSlug = /^osago-\d+$|^ns-\d+$/.test(slug);

  if (!isValidSlug) {
    notFound();
  }

  return (
    <>
      <TitleWithLink className={styles.title}>Детали полиса</TitleWithLink>
      <PolicyInfo className={styles.info} />
    </>
  );
}