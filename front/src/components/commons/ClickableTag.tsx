"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "../ui/badge";
import { Tag } from "@/client";

export function ClickableTag({ tag }: { tag: Tag }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSelectTag = () => {
    const params = new URLSearchParams(searchParams);
    const tagsString = params.get("tags");
    let tags: string[] = [];
    if (tagsString) {
      tags = tagsString
        .split(",")
        .filter((tempTag) => tempTag !== "" && tempTag !== tag.id.toString());
    }
    tags.push(tag.id.toString());
    params.delete("tags");
    params.set("tags", tags.join(","));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Badge
      key={tag.id}
      className="hover:cursor-pointer bg-gray-200 text-gray-800 text-xs font-semibold"
      onClick={() => onSelectTag()}
    >
      {tag.text}
    </Badge>
  );
}
