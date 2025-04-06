import React from "react";
import Image from "next/image";

import Substrate from "@/components/ui/Substrate/Substrate";


import styles from "./AdvantagesCard.module.scss";

export interface IAdvantageCards {
  image: string;
  title: string;
  descr: string;
  alt: string
}

interface IProps {
  cardInfo: IAdvantageCards;
  className?: string;
}

const AdvantagesCard = ({ cardInfo, className }: IProps) => {
  return (
    <Substrate className={`${styles.substrate} ${className}`} widthType="fit" withShadow="deep">
      <Image className={styles.image} src={cardInfo.image} alt={cardInfo.alt} width={65} height={65} />
      <div className={styles.textWrapper}>
        <div className={styles.title}>{cardInfo.title}</div>
        <div className={styles.descr}>{cardInfo.descr}</div>
      </div>
    </Substrate>
  );
};

export default AdvantagesCard;
