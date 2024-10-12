"use client";

import { JobsFilterFormSetValueSchema } from "../jobs/JobsFilterForm";
import { HireFormSetValueSchema } from "./HireForm";
import { commonLocations } from "./data";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { getLocations } from "@/lib/job-actions";

export function LocationSelector({
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
        "locations",
        options.map((option) => {
          return {
            id: option.value,
            name: option.label,
            type: option.group ? (option.group as string) : "city",
          };
        })
      );

    setValueFilter &&
      setValueFilter(
        "locations",
        options.map((option) => {
          return {
            id: option.value,
            name: option.label,
            type: option.group ? (option.group as string) : "city",
          };
        })
      );
  };

  const mockSearch = async (value: string): Promise<Option[]> => {
    const results = await getLocations(value);
    if (!results) {
      return [];
    }
    return results.map((location) => {
      return {
        value: String(location.id),
        label: location.location,
        group: location.location_type,
      };
    });
  };

  return (
    <MultipleSelector
      onSearch={async (value) => {
        let res = await mockSearch(value);
        res = res.concat(
          commonLocations.filter((location) =>
            location.value.toLowerCase().includes(value.toLowerCase())
          )
        );
        const uniqueResults = new Map<string, Option>();
        for (const option of res) {
          if (!uniqueResults.has(option.label.toLowerCase())) {
            uniqueResults.set(option.label.toLowerCase(), option);
          }
        }
        return Array.from(uniqueResults.values());
      }}
      triggerSearchOnFocus
      defaultOptions={defaultOptions}
      value={defaultValue}
      creatable={setValueFilter ? undefined : true}
      groupBy="group"
      onChange={onChange}
      placeholder="Type to search location..."
      loadingIndicator={
        <p className="py-2 text-center text-muted-foreground">searching...</p>
      }
      emptyIndicator={
        <p className="w-full text-center text-muted-foreground">
          No locations found.
        </p>
      }
    />
  );
}
