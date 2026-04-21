import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import SvgSelector from "@/components/ui/SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";
import { articles } from "@/data/articles";
import { PAGES } from "@/config/pages-url.config";
import styles from "./Blog.module.scss";

const Blog = () => {
  return (
    <ContentContainer>
      <section className={styles.wrapper}>
        <h1 className={styles.pageTitle}>Блог</h1>
        <div className={styles.grid}>
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`${PAGES.BLOG}/${article.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 1149px) 100vw, 50vw"
                />
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.date}>{article.date}</span>
                  <div className={styles.views}>
                    <SvgSelector id={ESvgName.EYE} className={styles.eyeIcon} />
                    <span>{article.views}</span>
                  </div>
                </div>
                <h2 className={styles.title}>{article.title}</h2>
                <p className={styles.description}>{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </ContentContainer>
  );
};

export default Blog;
