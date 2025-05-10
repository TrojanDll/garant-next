import React from "react";

import styles from "./SocialLinks.module.scss";

import SvgSelector from "../SvgSelector/SvgSelector";
import { ESvgName } from "@/constants/svg-ids.constants";

interface IProps {
  className?: string;
}

const SocialLinks = ({ className }: IProps) => {
  return (
    <div className={`${styles.socialLinks} ${className}`}>
      <a href="">
        <SvgSelector id={ESvgName.TELEGRAM_ROUNDED} />
      </a>
      <a href="">
        <SvgSelector id={ESvgName.WHATSAPP_ROUNDED} />
      </a>
      <a href="">
        <SvgSelector id={ESvgName.EMAIL_ROUNDED} />
      </a>
    </div>
  );
};

export default SocialLinks;
