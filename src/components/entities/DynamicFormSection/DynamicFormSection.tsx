import { Controller, Control } from "react-hook-form";
import InputsSelector from "@/components/ui/InputsSelector/InputsSelector";
import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";

import styles from "./DynamicFormSection.module.scss";
import { useEffect } from "react";
import usePersonType from "@/stores/OsagoApply/personType";

interface Props {
  fields: IFieldConfig<IOsagoApplyForm>[];
  control: Control<IOsagoApplyForm>;
  className?: string;
  isTopItemSingle?: boolean;
}

const DynamicFormSection = ({ fields, control, className, isTopItemSingle = false }: Props) => {
  const isAnotherCarVisible = useOsagoApplyCarMark((state) => state.isAnotherCarMark);
  const personType = usePersonType((state) => state.personType);

  const fieldText = (
    field: IFieldConfig<IOsagoApplyForm>
  ): { label: string; placeholder: string | undefined } => {
    let label: string = field.label;
    let placeholder: string | undefined = field.placeholder;

    if (field.name === "owner_fio" && personType === "legal_entity") {
      label = "Полное наименование";
      placeholder = "Введите полное наименование";
    } else if (field.name === "owner_passport_data" && personType === "legal_entity") {
      label = "ИНН";
      placeholder = "Введите ИНН";
    }

    return { label, placeholder };
  };

  return (
    <>
      {fields.map((config, i) => (
        <div
          key={config.name}
          className={`${isTopItemSingle && i === 0 ? styles.singleInStroke : ""} ${
            styles.inputWrapper
          }  ${
            config.name !== "vehicle_refined_make"
              ? styles.visible
              : isAnotherCarVisible
              ? styles.visible
              : styles.hidden
          }
          ${
            config.name !== "vehicle_make" ? "" : isAnotherCarVisible ? styles.singleInStroke : ""
          }    
          `}
        >
          <Controller
            name={config.name}
            control={control}
            rules={config.required ? { required: "Обязательное поле" } : {}}
            render={({ field, fieldState }) => (
              <InputsSelector
                value={field.value}
                setValue={field.onChange}
                errorMessage={fieldState.error?.message}
                className={`${styles.input} ${className}  `}
                {...config}
                type={
                  config.name === "vehicle_model" && isAnotherCarVisible ? "input" : config.type
                }
                label={fieldText(config).label}
                placeholder={fieldText(config).placeholder}
              />
            )}
          />
        </div>
      ))}
    </>
  );
};

export default DynamicFormSection;
