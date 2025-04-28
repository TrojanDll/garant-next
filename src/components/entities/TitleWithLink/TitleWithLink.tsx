"use client";

import React, { PropsWithChildren } from "react";

import styles from "./TitleWithLink.module.scss";

import GoBackLink from "@/components/ui/GoBackLink/GoBackLink";
import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";

interface IProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

const TitleWithLink = ({
  children,
  tag = "h1",
  className,
}: PropsWithChildren<IProps>) => {
  return (
    <ContentContainer>
      <div className={`${styles.titleWrapper} ${className}`}>
        <GoBackLink className={styles.goBack} />
        <CustomTitle tag={tag} isCentered>
          {children}
        </CustomTitle>
      </div>
    </ContentContainer>
  );
};

export default TitleWithLink;
