import React from "react";

import styles from "./NsApply.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import NsApllyInsuredList from "@/components/features/NsApllyInsuredList/NsApllyInsuredList";

const NsApply = () => {
  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис от несчастного случая в Абхазии
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>
          <NsApllyInsuredList />
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default NsApply;
