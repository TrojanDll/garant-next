import React from "react";

import styles from "./Support.module.scss";

import Substrate from "@/components/ui/Substrate/Substrate";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import FAQ from "../FAQ/FAQ";
import Text from "@/components/ui/Text/Text";
import Link from "next/link";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";

const Support = () => {
  return (
    <section>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <FAQ isBordered />

          <Text className={styles.text}>
            Остались вопросы? Свяжитесь с нами! Позвоните нам или{" "}
            <a href="https://wa.me/79407411000" className={styles.whatsappLink}>
              напишите в <span className={styles.textBold}>WhatsApp</span>
            </a>{" "}
            по номеру:
          </Text>

          <Link href="tel:79409901234" className={styles.phone}>
            +7 940 990 12 34
          </Link>

          <SocialLinks className={styles.socialLinks} />
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default Support;
