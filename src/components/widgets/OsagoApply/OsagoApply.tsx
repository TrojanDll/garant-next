import React from "react";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import Substrate from "@/components/ui/Substrate/Substrate";

import styles from "./OsagoApply.module.scss";
import CustomSelect from "@/components/ui/CustomSelect/CustomSelect";

const OsagoApply = () => {
  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис ОСАГО в Абхазии
        </CustomTitle>

        <Substrate withShadow="light" className={styles.substrate}>

          <CustomTitle tag="h2">
            Транспортное средство
          </CustomTitle>

          <div className={styles.inputsWrapper}>
            {/* <CustomSelect name="osago"/> */}
          </div>
        </Substrate>
      </ContentContainer>
    </section>
  );
};

export default OsagoApply;
