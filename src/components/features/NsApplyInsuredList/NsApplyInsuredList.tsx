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

interface IProps {
  control: Control<ICreateNsPolicyRequest, any, ICreateNsPolicyRequest>;
  fields: FieldArrayWithId<ICreateNsPolicyRequest, "insured", "id">[];
  // append: UseFieldArrayAppend<ICreateNsPolicyRequest, "insured">;
  // remove: UseFieldArrayRemove;
}

// const insuredIds: string[] = [`${uuidv4()}`];

const NsApplyInsuredList = ({ control, fields }: IProps) => {
  const [insuredCount, setInsuredCount] = useState(1);
  const [insuredListItems, setInsuredListItems] = useState<React.JSX.Element[]>();
  const [insuredIds, setInsuredIds] = useState<string[]>([`${uuidv4()}`]);

  function renderInsuredListItems(insuredIdsList: string[]) {
    let renderingItems = [];

    // for (let i = 0; i < count; i++) {
    //   renderingItems.push(
    //     <NsApplyInsuredListItem
    //       // removeItem={}
    //       control={control}
    //       itemIndex={i}
    //       key={`insuredItem.${i}`}
    //     />
    //   );
    // }

    renderingItems = insuredIdsList.map((id, i) => (
      <NsApplyInsuredListItem
        removeItem={() => removeInsuredItemId(id)}
        control={control}
        itemIndex={i}
        id={id}
        key={id}
      />
    ));

    return renderingItems;
  }

  function addInsuredItemId() {
    // insuredIds.push(uuidv4());
    setInsuredIds((prev) => [...prev, uuidv4()]);
  }

  function removeInsuredItemId(id: string) {
    setInsuredIds((prev) => [...prev].filter((item) => item !== id));
  }

  useEffect(() => {
    console.log("change");
    setInsuredListItems(renderInsuredListItems(insuredIds));
  }, [insuredIds]);

  return (
    <div>
      {/* {fields.map((field, index) => (
        <NsApplyInsuredListItem
          control={control}
          itemIndex={index}
          key={field.id}
        />
      ))} */}
      {insuredListItems}

      <Button type="button" onClickEvent={addInsuredItemId}>
        add
      </Button>
    </div>
  );
};

export default NsApplyInsuredList;
