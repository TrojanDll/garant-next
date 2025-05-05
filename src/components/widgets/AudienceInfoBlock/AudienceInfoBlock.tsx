import React from "react";

import styles from "./AudienceInfoBlock.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import AudienceInfoItem, {
  IAudienceInfoItem,
} from "@/components/entities/AudienceInfoItem/AudienceInfoItem";

const audienceItems: IAudienceInfoItem[] = [
  {
    title: "Любителям активного отдыха",
    description: "Увлекаетесь спортом или активно проводите время",
    imageAlt: "backpack",
    imageUrl: "/img/backpack.png",
  },
  {
    title: "Семьям с детьми",
    description: "Безопасность и защита от непредвиденных ситуаций для всей семьи",
    imageAlt: "baby_carriage",
    imageUrl: "/img/baby_carriage.png",
  },
  {
    title: "Пожилым туристам",
    description: "Защита от случайных травм и внезапных ухудшений здоровья",
    imageAlt: "elderly",
    imageUrl: "/img/elderly.png",
  },
];

const AudienceInfoBlock = () => {
  return (
    <section className={styles.root}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2">Кому может пригодиться полис?</CustomTitle>

          <div className={styles.items}>
            {audienceItems.map((item, i) => (
              <AudienceInfoItem
                key={`${i}${item.description}`}
                cardInfo={item}
                className={styles.item}
              />
            ))}
          </div>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default AudienceInfoBlock;
