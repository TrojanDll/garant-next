import React from "react";
import styles from "./ReviwesYandex.module.scss";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";


const ReviwesYandex = () => {
  return (
    <section className={styles.root}>
      <CustomTitle isCentered>Отзывы о нас</CustomTitle>

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
        <a href="https://yandex.ru/maps/org/usadba_izmaylovo/153937465584/" target="_blank">
          Усадьба Измайлово на карте Москвы — Яндекс.Карты
        </a>
      </div>
    </section>
  );
};

export default ReviwesYandex;
