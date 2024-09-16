"use client";

import { HireFormSetValueSchema } from "./HireForm";
import { defaultCategories } from "@/data/constants";
import MultipleSelector, { Option } from "../ui/multiple-selector";

export function CategorySelector({
  setValue,
  defaultValue,
}: {
  setValue?: HireFormSetValueSchema;
  defaultValue?: Option[];
}) {
  // const [categories, setCategories] = useState<CategoriesListResponse>([]);

  // useEffect(() => {
  //   async function getCategoriesFromServer() {
  //     const categories = await getCategories();
  //     if (categories) {
  //       setCategories(categories);
  //     } else {
  //       setCategories(
  //         defaultCategories.map((category) => ({
  //           id: +category.value,
  //           text: category.label,
  //         }))
  //       );
  //     }
  //   }
  //   getCategoriesFromServer();
  // }, []);
  const onChange = (options: Option[]) => {
    setValue &&
      setValue(
        "categories",
        options.map((option) => {
          return {
            id: option.id as string,
            text: option.label,
          };
        })
      );
  };

  return (
    <MultipleSelector
      onChange={onChange}
      defaultOptions={defaultCategories.map((category) => ({
        value: category.label,
        label: category.label,
        id: category.value,
      }))}
      value={defaultValue}
      placeholder="Select categories you like..."
      emptyIndicator={
        <p className="w-full text-center text-muted-foreground">
          no categories found.
        </p>
      }
    />
  );
}
