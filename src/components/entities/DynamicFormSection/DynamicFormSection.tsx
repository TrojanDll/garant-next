"use client";

import {
  Controller,
  Control,
  UseFormTrigger,
  UseFormClearErrors,
} from "react-hook-form";
import InputsSelector from "@/components/ui/InputsSelector/InputsSelector";
import { IFieldConfig } from "@/types/IFieldConfig";
import { IOsagoApplyForm } from "@/types/OsagoApplyForm/IOsagoApplyForm";

import useOsagoApplyCarMark from "@/stores/OsagoApply/osagoApplyCarMark.store";

import usePersonType from "@/stores/OsagoApply/personType.store";

import styles from "./DynamicFormSection.module.scss";
import useCarBrand from "@/stores/Cars/carBrand.store";
import { TPersonType } from "@/types/user.types";
import useCurrientCarCategoryAndDuration from "@/stores/Policy/currientCarCategoryAndDuration.store";
import { useEffect, useState } from "react";

interface Props {
  fields: IFieldConfig<IOsagoApplyForm>[];
  control: Control<IOsagoApplyForm>;
  className?: string;
  isTopItemSingle?: boolean;
  owner?: TPersonType;
  formValidationTrigger?: UseFormTrigger<IOsagoApplyForm>;
  clearErrors?: UseFormClearErrors<IOsagoApplyForm>;
  personTypeID?: string;
}

const DynamicFormSection = ({
  fields,
  control,
  className,
  isTopItemSingle = false,
  owner,
  personTypeID,
  clearErrors,
}: Props) => {
  const isAnotherCarVisible = useOsagoApplyCarMark(
    (state) => state.isAnotherCarMark
  );
  const personTypeStore = usePersonType((state) => state.personType);
  const [personType, setPersonType] = useState<TPersonType>("individual");

  useEffect(() => {
    setPersonType(
      personTypeStore?.find((personType) => {
        if (personType.id === personTypeID) {
          return true;
        }
      })?.value || personTypeStore[0].value
    );
  }, [personTypeStore]);

  const setCarCategoryOsago = useCurrientCarCategoryAndDuration(
    (state) => state.setCarCategory
  );
  const setDurationOsago = useCurrientCarCategoryAndDuration(
    (state) => state.setDuration
  );
  const carCategoryOsago = useCurrientCarCategoryAndDuration(
    (state) => state.carCategory
  );
  const durationOsago = useCurrientCarCategoryAndDuration(
    (state) => state.duration
  );

  const fieldText = (
    field: IFieldConfig<IOsagoApplyForm>
  ): { label: string; placeholder: string | undefined } => {
    let label: string = field.label;
    let placeholder: string | undefined = field.placeholder;

    if (field.name === "fio" && personType === "legal_entity") {
      label = "Полное наименование";
      placeholder = "Введите полное наименование";
    } else if (
      field.name === "passport_number" &&
      personType === "legal_entity"
    ) {
      label = "ИНН";
      placeholder = "Введите ИНН";
    }

    if (field.name === "insurant_fio" && personType === "legal_entity") {
      label = "Полное наименование";
      placeholder = "Введите полное наименование";
    } else if (
      field.name === "insurant_passport_number" &&
      personType === "legal_entity"
    ) {
      label = "ИНН";
      placeholder = "Введите ИНН";
    }

    return { label, placeholder };
  };

  function handleDurationOptions(
    options:
      | {
          value: string;
          label: string;
        }[]
      | undefined
  ):
    | {
        value: string;
        label: string;
      }[]
    | undefined {
    let newOptions:
      | {
          value: string;
          label: string;
        }[]
      | undefined = undefined;

    if (
      carCategoryOsago ===
      "Автотранспортные средства , исползуемые в качестве такси и по найму"
    ) {
      newOptions = options?.filter((option) => option.label !== "До 15 суток");
    } else {
      let isContains: boolean = false;
      options?.forEach((option) => {
        if (option.label === "До 15 суток") {
          isContains = true;
        }
      });

      newOptions = options;

      if (!isContains) {
        newOptions?.unshift({
          label: "До 15 суток",
          value: "До 15 суток",
        });
      }
    }
    return newOptions ? newOptions : options;
  }

  function handleTransportCategoryOptions(
    options:
      | {
          value: string;
          label: string;
        }[]
      | undefined
  ):
    | {
        value: string;
        label: string;
      }[]
    | undefined {
    let newOptions:
      | {
          value: string;
          label: string;
        }[]
      | undefined = undefined;

    if (durationOsago === "До 15 суток") {
      newOptions = options?.filter(
        (option) =>
          option.label !==
          "Автотранспортные средства , исползуемые в качестве такси и по найму"
      );
    } else {
      let isContains: boolean = false;
      options?.forEach((option) => {
        if (
          option.label ===
          "Автотранспортные средства , исползуемые в качестве такси и по найму"
        ) {
          isContains = true;
        }
      });

      newOptions = options;

      if (!isContains) {
        newOptions?.push({
          label:
            "Автотранспортные средства , исползуемые в качестве такси и по найму",
          value:
            "Автотранспортные средства , исползуемые в качестве такси и по найму",
        });
      }
    }
    return newOptions ? newOptions : options;
  }

  return (
    <>
      {fields.map((config, i) => (
        <div
          key={config.name}
          className={`${
            isTopItemSingle && i === 0 ? styles.singleInStroke : ""
          } ${styles.inputWrapper}  ${
            config.name !== "vehicle_refined_make"
              ? styles.visible
              : isAnotherCarVisible
              ? styles.visible
              : styles.hidden
          }
          ${
            config.name !== "brand"
              ? ""
              : isAnotherCarVisible
              ? styles.singleInStroke
              : ""
          }    
          `}
        >
          <Controller
            name={config.name}
            control={control}
            rules={config.required ? { required: "Обязательное поле" } : {}}
            render={({ field, fieldState }) => (
              <InputsSelector
                owner={owner}
                value={field.value ? field.value : ""}
                setValue={(value) => {
                  if (clearErrors) {
                    clearErrors(config.name);
                  }

                  if (config.name === "transport_category") {
                    setCarCategoryOsago(value);
                  }

                  if (config.name === "duration_of_stay") {
                    setDurationOsago(value);
                  }

                  field.onChange(value);
                }}
                errorMessage={fieldState.error?.message}
                className={`${styles.input} ${className}  `}
                {...config}
                type={
                  config.name === "model" && isAnotherCarVisible
                    ? "input"
                    : config.type
                }
                label={fieldText(config).label}
                placeholder={fieldText(config).placeholder}
                options={
                  config.name === "duration_of_stay"
                    ? handleDurationOptions(config.options)
                    : config.name === "transport_category"
                    ? handleTransportCategoryOptions(config.options)
                    : config.options
                }
                personTypeID={personTypeID}
              />
            )}
          />
        </div>
      ))}
    </>
  );
};

export default DynamicFormSection;
