import React, { ReactNode } from "react";
import CustomSelect, { IOptions } from "../CustomSelect/CustomSelect";
import CustomInput from "../CustomInput/CustomInput";
import { TFieldType, TInputType } from "@/types/IFieldConfig";
import ButtonGroup, { TButtonGroupRequest, TButtonGroupType } from "../ButtonGroup/ButtonGroup";
import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";
import { personTypes, TPersonType } from "@/types/OsagoApplyForm/IOsagoApplyForm";
import usePersonType from "@/stores/OsagoApply/personType.store";

interface IProps {
  type: TFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
  className?: string;
  isError?: boolean;
  options?: IOptions[];
  buttons?: string[];
  buttonGroupType?: TButtonGroupType;
  inputType?: TInputType;
  isSearchable?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
}

const InputsSelector = ({
  name,
  setValue,
  type,
  value,
  className,
  errorMessage,
  isError,
  label,
  placeholder,
  required,
  options,
  buttons,
  buttonGroupType,
  inputType,
  isSearchable,
  tooltip,
  tooltipText,
}: IProps) => {
  const setPersonType = usePersonType((state) => state.setPersonType);

  const handleButtonGroupChange = (value: TButtonGroupRequest) => {
    setPersonType(personTypes[value.index]);

    setValue(value.value);
  };

  const renderComponent = (
    <>
      {type === "select" ? (
        <CustomSelect
          tooltip={tooltip}
          tooltipText={tooltipText}
          isSearchable={isSearchable}
          name={name}
          options={options as IOptions[]}
          label={label}
          placeholder={placeholder}
          required={required}
          key={name}
          selectedValue={value}
          setValue={(value: string) => setValue(value)}
          errorMessage={errorMessage}
          className={className}
        />
      ) : type === "input" ? (
        <CustomInput
          name={name}
          label={label}
          placeholder={placeholder}
          required={required}
          key={name}
          value={value}
          setValue={(value: string) => setValue(value)}
          errorMessage={errorMessage}
          className={className}
          inputType={inputType}
        />
      ) : type === "radio" ? (
        <ButtonGroup
          groupType={buttonGroupType ? buttonGroupType : "default"}
          defaultActiveIndex={0}
          name={name}
          items={buttons as string[]}
          key={name}
          onButtonClick={(value: TButtonGroupRequest) => handleButtonGroupChange(value)}
        />
      ) : (
        ""
      )}
    </>
  );

  return renderComponent;
};

export default InputsSelector;
