import { Controller, Control } from "react-hook-form";
import InputsSelector from "@/components/ui/InputsSelector/InputsSelector";
import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/IOsagoApplyForm";

import useOsagoApplyCarMark from "@/stores/OsagoApplyCarMark/osagoApplyCarMark.store";

import styles from "./DynamicFormSection.module.scss";
import { useEffect } from "react";

interface Props {
  fields: IFieldConfig<IOsagoApplyForm>[];
  control: Control<IOsagoApplyForm>;
  className?: string;
  isTopItemSingle?: boolean;
}

const DynamicFormSection = ({ fields, control, className, isTopItemSingle = false }: Props) => {
  const isAnotherCarVisible = useOsagoApplyCarMark((state) => state.isAnotherCarMark);

  // const isRequired = (config: IFieldConfig<IOsagoApplyForm>) => {
  //   // const isAnother: boolean = config.name === "vehicle_refined_make";

  //   if (config.required) {
  //     if (config.name === "vehicle_refined_make" && !isAnotherCarVisible) {
  //       // if (isAnother) {
  //       //   console.log(false);
  //       // }
  //       return false;
  //     } else if (config.name === "vehicle_refined_make" && isAnotherCarVisible) {
  //       // if (isAnother) {
  //       //   console.log(true);
  //       // }
  //       return true;
  //     }

  //     // if (isAnother) {
  //     //   console.log(true);
  //     // }
  //     return true;
  //   }

  //   // if (isAnother) {
  //   //   console.log(false);
  //   // }
  //   return false;
  // };

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
              />
            )}
          />
        </div>
      ))}
    </>
  );
};

export default DynamicFormSection;
