"use client";

import React, { useEffect } from "react";

import styles from "./NsApply.module.scss";

import CustomTitle from "@/components/ui/CustomTitle/CustomTitle";
import ContentContainer from "@/components/ui/ContentContainer/ContentContainer";
import Substrate from "@/components/ui/Substrate/Substrate";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import {
  EGenders,
  ICreateNsPolicyRequest,
  IInsuredCreationFilelds,
} from "@/types/policy.types";
import NsApplyInsuredList from "@/components/features/NsApplyInsuredList/NsApplyInsuredList";
import Button from "@/components/ui/Button/Button";
import NsApplyStaticFields from "@/components/entities/NsApplyStaticFields/NsApplyStaticFields";

export const defaultInsuredValues: IInsuredCreationFilelds = {
  date_of_birth: "",
  fio: "",
  gender: EGenders.MAN,
  passport_number: "",
};

const NsApply = () => {
  const { control, handleSubmit } = useForm<ICreateNsPolicyRequest>({
    defaultValues: {
      insured: [defaultInsuredValues],
      duration_of_stay: "",
      promocode: "",
      start_date: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "insured",
    control,
  });

  function onSubmit(data: ICreateNsPolicyRequest): void {
    console.log("form data:", data);
  }

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  return (
    <section className={styles.root}>
      <ContentContainer>
        <CustomTitle tag="h1" isCentered>
          Оформить полис от несчастного случая в Абхазии
        </CustomTitle>

        <form action="" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Substrate withShadow="light" className={styles.substrate}>
            <NsApplyInsuredList
              control={control}
              fields={fields}
              append={append}
              remove={remove}
            />

            <div className={styles.staticFieldsWrapper}>
              <NsApplyStaticFields control={control} />
            </div>

            <Button type="submit" variant="wide" className={styles.submitButton}>
              Рассчитать
            </Button>
          </Substrate>
        </form>
      </ContentContainer>
    </section>
  );
};

export default NsApply;
