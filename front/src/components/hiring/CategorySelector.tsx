"use client";

import { CategoriesListResponse, Category } from "@/client";
import { HireFormSetValueSchema } from "./HireForm";
import Select, { MultiValue } from "react-select";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/job-actions";

export function CategorySelector({
  setValue,
  defaultValue,
}: {
  setValue: HireFormSetValueSchema;
  defaultValue?: { value: string; label: string }[];
}) {
  const [categories, setCategories] = useState<CategoriesListResponse>([]);

  useEffect(() => {
    async function getCategoriesFromServer() {
      const categories = await getCategories();
      if (categories) {
        setCategories(categories);
      }
    }
    getCategoriesFromServer();
  }, []);

  const onChange = (
    categories: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    setValue(
      "categories",
      categories.map((category) => {
        return {
          id: category.value,
          text: category.label,
        };
      })
    );
  };

  return (
    <Select
      defaultValue={defaultValue}
      options={categories.map((category) => {
        return {
          value: String(category.id),
          label: category.text,
        };
      })}
      onChange={onChange}
      isMulti
    />
  );
}
