import Link from "next/link";
import { apiCategoriesList } from "@/client";
import {
  BookOpenIcon,
  PaletteIcon,
  PencilIcon,
  ShoppingBagIcon,
  MicroscopeIcon,
  MegaphoneIcon,
  CodeIcon,
  MessageSquareIcon,
  TagsIcon,
} from "lucide-react";

const categoryIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  education: BookOpenIcon,
  design: PaletteIcon,
  writing: PencilIcon,
  sales: ShoppingBagIcon,
  research: MicroscopeIcon,
  marketing: MegaphoneIcon,
  "software-engineering": CodeIcon,
  "prompt-engineering": MessageSquareIcon,
  "data-annotation": TagsIcon,
  legal: BookOpenIcon,
};

const categoryBGColorMap: Record<string, string> = {
  education: "bg-blue-500/10",
  design: "bg-pink-500/10",
  writing: "bg-green-500/10",
  sales: "bg-yellow-500/10",
  research: "bg-purple-500/10",
  marketing: "bg-orange-500/10",
  "software-engineering": "bg-red-500/10",
  "prompt-engineering": "bg-teal-500/10",
  "data-annotation": "bg-indigo-500/10",
  legal: "bg-gray-500/10",
};

const categoryTextColorClassMap: Record<string, string> = {
  education: "text-blue-800",
  design: "text-pink-800",
  writing: "text-green-800",
  sales: "text-yellow-800",
  research: "text-purple-800",
  marketing: "text-orange-800",
  "software-engineering": "text-red-800",
  "prompt-engineering": "text-teal-800",
  "data-annotation": "text-indigo-800",
  legal: "text-gray-800",
};

const categoryBorderColorClassMap: Record<string, string> = {
  education: "border-blue-800",
  design: "border-pink-800",
  writing: "border-green-800",
  sales: "border-yellow-800",
  research: "border-purple-800",
  marketing: "border-orange-800",
  "software-engineering": "border-red-800",
  "prompt-engineering": "border-teal-800",
  "data-annotation": "border-indigo-800",
  legal: "border-gray-800",
};

export default async function CategoriesNavigator() {
  const categories = await apiCategoriesList();
  if (!categories || categories.length === 0) return null;

  return (
    <nav className="px-4 py-2 bg-white rounded-md border space-y-2">
      <h2 className="text-base font-semibold">Job Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const slug = cat.slug || cat.text.toLowerCase();
          const Icon = categoryIconMap[slug] || TagsIcon;
          const textColorClass =
            categoryTextColorClassMap[slug] || "text-gray-800";
          const borderColorClass =
            categoryBorderColorClassMap[slug] || "border-gray-800";
          return (
            <Link
              key={cat.id}
              href={`/category/${slug}`}
              className={`rounded-md border px-3 py-2 text-sm ${categoryBGColorMap[slug]} ${textColorClass} ${borderColorClass}`}
            >
              <Icon className="w-3 h-3 stroke-2" />
              <span className="truncate text-xs">{cat.text}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
