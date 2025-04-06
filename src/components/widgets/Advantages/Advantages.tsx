import AdvantagesCard, {
  IAdvantageCards,
} from "@/components/entities/AdvantagesCard/AdvantagesCard";
import React from "react";

import styles from "./Advantages.module.scss";

const advantageCards: IAdvantageCards[] = [
  {
    image: "/img/icons/timer.png",
    title: "Быстро",
    descr: "Получите полис онлайн без ожидания в очередях",
  },
  {
    image: "/img/icons/wallet.png",
    title: "Выгодно",
    descr: "Выберите для себя лучшие условия в пару кликов",
  },
  {
    image: "/img/icons/folder.png",
    title: "Удобно",
    descr: "Полис всегда с собой и доступен в любой момент",
  },
];

const Advantages = () => {
  return (
    <section className={styles.root}>
      {advantageCards.map((card) => (
        <AdvantagesCard className={styles.card} key={card.descr} cardInfo={card} />
      ))}

      {/* <div style={{ width: "560px", height: "800px", overflow: "hidden", position: "relative" }}>
        <iframe
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #e6e6e6",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
          src="https://yandex.ru/maps-reviews-widget/226327670406?comments"
        ></iframe>
        <a href="https://yandex.ru/maps/org/usadba_izmaylovo/226327670406/" target="_blank">
          Усадьба Измайлово на карте Москвы — Яндекс.Карты
        </a>
      </div> */}
    </section>
  );
};

export default Advantages;
