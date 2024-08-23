"use client";

import { LocationTypeEnum } from "@/client";
import { HireFormSetValueSchema } from "./HireForm";
import { LocationOption, GroupedOption, groupedOptions } from "./data";
import Select, { MultiValue, PropsValue } from "react-select";

export function LocationSelector({
  setValue,
  defaultValue,
}: {
  setValue: HireFormSetValueSchema;
  defaultValue?: PropsValue<LocationOption>;
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
      defaultValue={defaultValue}
      options={groupedOptions}
      onChange={onChange}
      isMulti
    />
  );
}
