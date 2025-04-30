import { notFound } from "next/navigation";
import { Metadata } from "next";
import { type FC } from "react";

import TitleWithLink from "@/components/entities/TitleWithLink/TitleWithLink";
import PolicyInfo from "@/components/widgets/PolicyInfo/PolicyInfo";

import styles from "./PolicyPage.module.scss";

export const metadata: Metadata = {
  title: "Полис",
};

interface Props {
  params: { slug: string };
}

const PolicyPage: FC<Props> = async ({ params }) => {
  const { slug } = await params;

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
};

export default PolicyPage;
