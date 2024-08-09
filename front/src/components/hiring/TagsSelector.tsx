"use client";

import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";
import { HireFormSetValueSchema } from "./HireForm";
import { commonTags } from "./data";

export function TagsSelector({
  setValue,
}: {
  setValue: HireFormSetValueSchema;
}) {
  const onChange = (
    tags: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    setValue(
      "tags",
      tags.map((tag) => {
        return {
          id: tag.value,
          text: tag.label,
        };
      })
    );
  };

  return (
    <CreatableSelect
      isClearable
      options={commonTags}
      isMulti
      onChange={onChange}
    />
  );
}
