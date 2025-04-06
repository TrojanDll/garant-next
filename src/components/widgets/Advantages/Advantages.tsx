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


    </section>
  );
};

export default Advantages;
