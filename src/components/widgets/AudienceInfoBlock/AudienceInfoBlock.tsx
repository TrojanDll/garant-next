import React from "react";

import styles from "./AudienceInfoBlock.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

const AudienceInfoBlock = () => {
  return (
    <section className={styles.root}>
      <ContentContainer>
        <Substrate withShadow="light" className={styles.substrate}>
          <CustomTitle tag="h2">Кому может пригодиться полис?</CustomTitle>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default AudienceInfoBlock;
