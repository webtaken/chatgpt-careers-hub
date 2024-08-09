"use client";

import { LocationTypeEnum } from "@/client";
import { HireFormSetValueSchema } from "./HireForm";
import { LocationOption, GroupedOption, groupedOptions } from "./data";
import Select, { MultiValue } from "react-select";

export function LocationSelector({
  setValue,
}: {
  setValue: HireFormSetValueSchema;
}) {
  const onChange = (
    locations: MultiValue<{
      value: string;
      label: string;
      type: LocationTypeEnum;
    }>
  ) => {
    setValue(
      "locations",
      locations.map((location) => {
        return {
          id: location.value,
          name: location.label,
          type: location.type,
        };
      })
    );
  };

  return (
    <Select<LocationOption, true, GroupedOption>
      options={groupedOptions}
      onChange={onChange}
      isMulti
    />
  );
}
