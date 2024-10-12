"use client";
import { CategoriesListResponse } from "@/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesSelect({
  categories,
}: {
  categories: CategoriesListResponse;
}) {
  const router = useRouter();

  return (
    <Select
      onValueChange={(value) => {
        if (value === "all") {
          router.push("/");
        } else router.push(`/category/${value}/`);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category, index) => (
            <SelectItem
              key={`${category.slug}-${index}`}
              value={`${category.slug}`}
            >
              {category.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
