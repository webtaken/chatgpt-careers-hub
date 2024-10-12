"use client";

import { HireFormSetValueSchema } from "./HireForm";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { getTags } from "@/lib/job-actions";
import { JobsFilterFormSetValueSchema } from "../jobs/JobsFilterForm";
import { useEffect, useState } from "react";

export function TagsSelector({
  setValue,
  setValueFilter,
  defaultValue,
  defaultOptions,
}: {
  setValue?: HireFormSetValueSchema;
  setValueFilter?: JobsFilterFormSetValueSchema;
  defaultValue?: Option[];
  defaultOptions?: Option[];
}) {
  const onChange = (options: Option[]) => {
    setValue &&
      setValue(
        "tags",
        options.map((option) => {
          return {
            id: option.value,
            text: option.label,
          };
        })
      );

    setValueFilter &&
      setValueFilter(
        "tags",
        options.map((option) => {
          return {
            id: option.value,
            text: option.label,
          };
        })
      );
  };

  const mockSearch = async (value: string): Promise<Option[]> => {
    const results = await getTags({ text: value });
    if (!results) {
      return [];
    }
    return results.map((tag) => {
      return {
        value: String(tag.id),
        label: tag.text,
      };
    });
  };

  return (
    <MultipleSelector
      onSearch={async (value) => {
        const res = await mockSearch(value);
        return res;
      }}
      defaultOptions={defaultOptions}
      triggerSearchOnFocus
      creatable={setValueFilter ? undefined : true}
      groupBy="group"
      value={defaultValue}
      onChange={onChange}
      placeholder="Type to search tag..."
      loadingIndicator={
        <p className="py-2 text-center text-muted-foreground">searching...</p>
      }
      emptyIndicator={
        <p className="w-full text-center text-muted-foreground">
          no tags found.
        </p>
      }
    />
  );
}
