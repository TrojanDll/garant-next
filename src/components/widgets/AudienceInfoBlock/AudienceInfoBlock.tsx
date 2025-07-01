import React from "react";

import styles from "./AudienceInfoBlock.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import AudienceInfoItem from "@/components/entities/AudienceInfoItem/AudienceInfoItem";
import { IAudienceInfoItem } from "@/components/entities/AudienceInfoItem/audience-info-item.types";

interface IProps {
  audienceItems: IAudienceInfoItem[];
  title: string;
}

const AudienceInfoBlock = ({ audienceItems = [], title }: IProps) => {
  return (
    <section className={styles.root}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2">{title}</CustomTitle>

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
