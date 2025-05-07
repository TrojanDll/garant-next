"use client";

import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { ICreateNsPolicyRequest } from "@/types/policy.types";
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import NsApplyInsuredListItem from "@/components/entities/NsApplyInsuredListItem/NsApplyInsuredListItem";
import Button from "@/components/ui/Button/Button";
import { defaultInsuredValues } from "@/components/widgets/NsApply/NsApply";

interface IProps {
  control: Control<ICreateNsPolicyRequest, any, ICreateNsPolicyRequest>;
  fields: FieldArrayWithId<ICreateNsPolicyRequest, "insured", "id">[];
  append: UseFieldArrayAppend<ICreateNsPolicyRequest, "insured">;
  remove: UseFieldArrayRemove;
}

// const insuredIds: string[] = [`${uuidv4()}`];

const NsApplyInsuredList = ({ control, fields, append, remove }: IProps) => {
  return (
    <div>
      {/* {fields.map((field, index) => (
        <NsApplyInsuredListItem
          control={control}
          itemIndex={index}
          key={field.id}
        />
      ))} */}
      {/* {insuredListItems} */}

      {fields.map((field, index) => (
        <NsApplyInsuredListItem
          removeItem={() => remove(index)}
          control={control}
          itemIndex={index}
          key={field.id}
          field={field}
        />
      ))}

      <Button
        type="button"
        onClickEvent={() => {
          console.log("click");
          append(defaultInsuredValues);
        }}
      >
        add
      </Button>
    </div>
  );
};

export default NsApplyInsuredList;
