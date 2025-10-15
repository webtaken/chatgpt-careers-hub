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

export default async function CategoriesNavigator() {
  const categories = await apiCategoriesList();
  if (!categories || categories.length === 0) return null;

  return (
    <nav className="px-2 sm:px-5 md:px-20 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const slug = cat.slug || cat.text.toLowerCase();
          const Icon = categoryIconMap[slug] || TagsIcon;
          return (
            <Link
              key={cat.id}
              href={`/category/${slug}`}
              className="flex items-center gap-2 rounded-md border bg-card hover:bg-accent transition-colors px-3 py-2 text-sm"
            >
              <Icon className="w-4 h-4" />
              <span className="truncate">{cat.text}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
