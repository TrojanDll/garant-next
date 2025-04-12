import { Controller, Control } from "react-hook-form";
import InputsSelector from "@/components/ui/InputsSelector/InputsSelector";
import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";

import styles from "./DynamicFormSection.module.scss";

interface Props {
  fields: IFieldConfig<IOsagoApplyForm>[];
  control: Control<IOsagoApplyForm>;
  className?: string;
  isTopItemSingle?: boolean;
}

const DynamicFormSection = ({ fields, control, className, isTopItemSingle = false }: Props) => {
  return (
    <>
      {fields.map((config, i) => (
        <div
          key={config.name}
          className={`${isTopItemSingle && i === 0 ? styles.singleInStroke : ""} ${
            styles.inputWrapper
          }`}
        >
          <Controller
            name={config.name}
            control={control}
            rules={config.required ? { required: "Обязательное поле" } : {}}
            render={({ field, fieldState }) => (
              <InputsSelector
                {...config}
                value={field.value}
                setValue={field.onChange}
                errorMessage={fieldState.error?.message}
                className={`${styles.input} ${
                  isTopItemSingle && i === 0 ? styles.inputSingleInStroke : ""
                } ${className}`}
              />
            )}
          />
        </div>
      ))}
    </>
  );
};

export default DynamicFormSection;
