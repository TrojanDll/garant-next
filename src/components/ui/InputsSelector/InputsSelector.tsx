import React from "react";
import CustomSelect, { IOptions } from "../CustomSelect/CustomSelect";
import CustomInput from "../CustomInput/CustomInput";
import { TFieldType } from "@/types/IFieldConfig";
import ButtonGroup, { TButtonGroupRequest, TButtonGroupType } from "../ButtonGroup/ButtonGroup";

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
}: IProps) => {
  const renderComponent = (
    <>
      {type === "select" ? (
        <CustomSelect
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
        />
      ) : type === "radio" ? (
        <ButtonGroup
          groupType={buttonGroupType ? buttonGroupType : "default"}
          defaultActiveIndex={0}
          name={name}
          items={buttons as string[]}
          key={name}
          onButtonClick={(value: TButtonGroupRequest) => setValue(value.value)}
        />
      ) : (
        ""
      )}
    </>
  );

  return renderComponent;
};

export default InputsSelector;
