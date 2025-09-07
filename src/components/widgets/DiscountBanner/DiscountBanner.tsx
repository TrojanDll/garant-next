import React from "react";
import styles from "./DiscountBanner.module.scss";
import Image from "next/image";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

const DiscountBanner = () => {
  return (
    <ContentContainer>
      <section className={styles.wrapper}>
        <div className={styles.bgWrapper}>
          <Image
            className={styles.bgImage}
            src="/img/autumn-discount-banner-bg.png"
            alt=""
            width={1400}
            height={1000}
          />

          <div className={styles.substrate}>
            <div className={styles.textWrapper}>
              <p className={styles.title}>скидка на осаго</p>
              <p className={styles.subTitle}>
                по промокоду <span className={styles.promocode}>ОСЕНЬ10</span>
              </p>
            </div>

            <div className={styles.textWrapper}>
              <p className={styles.descr}>при оформлении до 30 сентября</p>
            </div>
          </div>
        </div>
        <div className={styles.discountValue}>-10%</div>
      </section>
    </ContentContainer>
  );
};

export default DiscountBanner;
