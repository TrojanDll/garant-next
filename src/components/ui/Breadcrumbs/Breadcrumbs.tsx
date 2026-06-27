import React from "react";
import Link from "next/link";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

import styles from "./Breadcrumbs.module.scss";

export interface IBreadcrumb {
  name: string;
  href: string;
}

const BASE_URL = "https://garant-abh.com";

interface IProps {
  items: IBreadcrumb[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: IProps) => {
  if (!items || items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <ContentContainer>
      <nav
        aria-label="Хлебные крошки"
        className={`${styles.root} ${className ?? ""}`}
      >
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className={styles.item}>
                {isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className={styles.link}>
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </nav>
    </ContentContainer>
  );
};

export default Breadcrumbs;
