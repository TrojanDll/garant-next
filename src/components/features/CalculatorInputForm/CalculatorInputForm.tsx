import React, { useRef } from "react";
import { Form, FormProps, Input, Select } from "antd";

import styles from "./CalculatorInputForm.module.scss";

const CalculatorInputForm = () => {
  return (
    <Select
        className="basic-single"
        classNamePrefix="selectskdbvskdv"
        defaultValue={colourOptions[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={colourOptions}
      />
  );
};

export default CalculatorInputForm;
