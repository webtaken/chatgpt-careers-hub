"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryHeader() {
  const pathname = usePathname();
  const [categoryName, setCategoryName] = useState<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/category/")) {
      const categorySlug = pathname.split("/category/")[1];
      if (categorySlug) {
        // Convert slug to readable category name
        const readableName = categorySlug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setCategoryName(`${readableName} Jobs`);
      }
    } else {
      setCategoryName(null);
    }
  }, [pathname]);

  if (!categoryName) return null;

  return (
    <div className="bg-blue-50 border-blue-200 py-2 rounded-md">
      <div className="mx-auto px-4">
        <h2 className="text-base font-semibold text-blue-900">
          {categoryName}
        </h2>
      </div>
    </div>
  );
}
