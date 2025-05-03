import React from "react";

import styles from "./OsagoConfirm.module.scss";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";

const OsagoConfirm = () => {
  return (
    <section>
      <ContentContainer className={styles.container}>
        <CustomTitle tag="h1" isCentered>
          Проверьте правильность данных
        </CustomTitle>
      </ContentContainer>
    </section>
  );
};

export default OsagoConfirm;
