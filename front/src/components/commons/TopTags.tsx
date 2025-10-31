import { Skeleton } from "../ui/skeleton";
import { apiTagsListTopTagsList, TagWithFrequency } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";
import { Suspense } from "react";
import { TrendingUp } from "lucide-react";

// New panel variant to place in the upper-left area
export function TrendingTagsPanel() {
  return (
    <Suspense fallback={<TopTagsPanelSkeleton />}>
      <TrendingTagsPanelWrapper />
    </Suspense>
  );
}

function TopTagItem({ tag }: { tag: TagWithFrequency }) {
  return (
    <div
      key={tag.id}
      className="group relative inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[12px] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-slate-600/60"
    >
      <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
      <span className="font-medium tracking-tight truncate max-w-[7rem]">
        {tag.text}
      </span>
      <span className="text-[11px] text-slate-600 dark:text-slate-400 bg-white/60 dark:bg-black/20 px-1 rounded border border-slate-200/70 dark:border-slate-600/60">
        {tag.frequency}
      </span>
    </div>
  );
}

async function TrendingTagsPanelWrapper() {
  try {
    setBasePathToAPI();
    const response = await apiTagsListTopTagsList();
    const topTags = (response as unknown as TagWithFrequency[]) || [];
    if (!topTags || topTags.length === 0) return null;
    return (
      <aside className="rounded-md border bg-card p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <h3 className="text-sm font-semibold">Trends</h3>
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex flex-wrap gap-1.5 h-[140px] overflow-auto">
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
    <div className="rounded-md border bg-card p-3">
      <div className="h-4 w-24 bg-muted rounded mb-2" />
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-14" />
        ))}
      </div>
    </div>
  );
}
