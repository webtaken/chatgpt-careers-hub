"use client";

import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";
import { HireFormSetValueSchema } from "./HireForm";
import { commonTags } from "./data";

export function TagsSelector({
  setValue,
  defaultValue,
}: {
  setValue: HireFormSetValueSchema;
  defaultValue?: { value: string; label: string }[];
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
      defaultValue={defaultValue}
      isClearable
      options={commonTags}
      isMulti
      onChange={onChange}
    />
  );
}
