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
    params.set("tags", tag.id.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Badge
      key={tag.id}
      className="hover:cursor-pointer"
      onClick={() => onSelectTag()}
    >
      {tag.text}
    </Badge>
  );
}
