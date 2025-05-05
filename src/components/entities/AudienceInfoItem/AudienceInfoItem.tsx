import React from "react";

import styles from "./AudienceInfoItem.module.scss";
import Image from "next/image";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Text from "@/components/ui/Text/Text";

export interface IAudienceInfoItem {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface IAudienceInfoItemProps {
  cardInfo: IAudienceInfoItem;
  className?: string;
}

const AudienceInfoItem = ({ cardInfo, className }: IAudienceInfoItemProps) => {
  return (
    <div className={styles.root}>
      <Image
        className={styles.image}
        src={cardInfo.imageUrl}
        alt={cardInfo.imageAlt}
        width={45}
        height={45}
      />

      <div className={styles.text}>
        <CustomTitle tag="h3" className={styles.title}>
          {cardInfo.title}
        </CustomTitle>

        <Text className={styles.description}>{cardInfo.description}</Text>
      </div>
    </div>
  );
};

export default AudienceInfoItem;
