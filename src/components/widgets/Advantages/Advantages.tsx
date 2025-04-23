import AdvantagesCard, {
  IAdvantageCards,
} from "@/components/entities/AdvantagesCard/AdvantagesCard";
import React from "react";

import styles from "./Advantages.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

const advantageCards: IAdvantageCards[] = [
  {
    image: "/img/icons/timer.svg",
    title: "Быстро",
    descr: "Получите полис онлайн без ожидания в очередях",
    alt: "Таймер",
  },
  {
    image: "/img/icons/wallet.svg",
    title: "Выгодно",
    descr: "Выберите для себя лучшие условия в пару кликов",
    alt: "Кошелек",
  },
  {
    image: "/img/icons/folder.svg",
    title: "Удобно",
    descr: "Полис всегда с собой и доступен в любой момент",
    alt: "Папка",
  },
];

const Advantages = () => {
  return (
    <ContentContainer>
      <section className={styles.root}>
        {advantageCards.map((card, idx) => (
          <AdvantagesCard className={styles.card} key={`advCard${idx}`} cardInfo={card} />
        ))}
      </section>
    </ContentContainer>
  );
};

export default Advantages;
