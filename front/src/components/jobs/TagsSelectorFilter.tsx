"use client";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { apiTagsListList } from "@/client";
import { JobsFilterFormSetValueSchema } from "../jobs/JobsFilterForm";

export function TagsSelectorFilter({
  defaultValue,
  setValueFilter,
}: {
  defaultValue?: Option[];
  setValueFilter?: JobsFilterFormSetValueSchema;
}) {
  const onChange = (options: Option[]) => {
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
    const tags = await apiTagsListList({ text: value });
    return (
      tags?.results?.map((tag) => ({
        value: String(tag.id),
        label: tag.text,
      })) ?? []
    );
  };

  return (
    <MultipleSelector
      onSearch={async (value) => {
        const res = await mockSearch(value);
        return res;
      }}
      triggerSearchOnFocus
      groupBy="group"
      hideSelectedBadges={true}
      onChange={onChange}
      value={defaultValue}
      placeholder="Search tag..."
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
