import React from "react";
import styles from "./ReviwesYandex.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

const ReviwesYandex = () => {
  return (
    <ContentContainer>
      <section className={styles.root}>
        <CustomTitle tag="h2" isCentered className={styles.title} isLarge>
          Отзывы о нас
        </CustomTitle>

        <div className={styles.reviewsWrapper}>
          <iframe
            className={styles.iframe}
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid #e6e6e6",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
            src="https://yandex.ru/maps-reviews-widget/153937465584?comments"
          ></iframe>
          <a
            href="https://yandex.ru/maps/org/usadba_izmaylovo/153937465584/"
            target="_blank"
            rel="nofollow noopener"
          >
            Усадьба Измайлово на карте Москвы — Яндекс.Карты
          </a>
        </div>
      </section>
    </ContentContainer>
  );
};

export default ReviwesYandex;
