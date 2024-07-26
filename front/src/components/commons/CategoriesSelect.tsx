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
    <Select onValueChange={(value) => router.push(`/category/${value}/`)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories.map((category, index) => (
            <SelectItem
              key={`${category.slug}-${index}`}
              value={`${category.slug}`}
            >
              <Link href={`/category/${category.slug}`}>{category.text}</Link>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
