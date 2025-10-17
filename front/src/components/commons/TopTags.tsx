import { Skeleton } from "../ui/skeleton";
import { ClickableTag } from "./ClickableTag";
import { apiTagsListTopTagsList, Tag } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";
import { Suspense } from "react";

// New panel variant to place in the upper-left area
export function TrendingTagsPanel() {
  return (
    <Suspense fallback={<TopTagsPanelSkeleton />}>
      <TrendingTagsPanelWrapper />
    </Suspense>
  );
}

function TopTagItem({ tag }: { tag: Tag }) {
  return <ClickableTag key={tag.id} tag={tag} />;
}

async function TrendingTagsPanelWrapper() {
  try {
    setBasePathToAPI();
    const response = await apiTagsListTopTagsList();
    const topTags = response as unknown as Tag[];
    if (!topTags || topTags.length === 0) return null;

    return (
      <aside className="rounded-md border bg-card p-4">
        <h3 className="text-sm font-semibold mb-3">Trending Tags</h3>
        <div className="flex flex-wrap gap-2 h-[200px] overflow-auto">
          {topTags.map((tag) => (
            <TopTagItem key={tag.id} tag={tag} />
          ))}
        </div>
      </aside>
    );
  } catch (error) {
    console.error("Error fetching top tags:", error);
    return null;
  }
}

export function TopTagsPanelSkeleton() {
  return (
    <div className="rounded-md border bg-card p-4">
      <div className="h-5 w-28 bg-muted rounded mb-3" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16" />
        ))}
      </div>
    </div>
  );
}
