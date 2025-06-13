import React from "react";
import styles from "./Contacts.module.scss";

import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContactUs from "@/components/features/ContactUs/ContactUs";

const Contacts = () => {
  return (
    <ContentContainer>
      <CustomTitle tag="h1" isCentered className={styles.title}>
        Контакты
      </CustomTitle>

      <div className={styles.widgetsWrapper}>
        <ContactUs className={styles.contactUs} />
      </div>
    </ContentContainer>
  );
};

export default Contacts;
