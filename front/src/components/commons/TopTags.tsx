import { Skeleton } from "../ui/skeleton";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ClickableTag } from "./ClickableTag";
import { apiTagsListTopTagsList } from "@/client";
import { setBasePathToAPI } from "@/lib/utils";
import { Suspense } from "react";

export function TopTagsSkeleton() {
  return (
    <div className="flex items-center gap-x-2">
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} className="h-6 w-12" />
      ))}
    </div>
  );
}

export function TopTags() {
  return (
    <Suspense fallback={<TopTagsSkeleton />}>
      <TopTagsWrapper />
    </Suspense>
  );
}

async function TopTagsWrapper() {
  try {
    setBasePathToAPI();
    const response = await apiTagsListTopTagsList();
    const topTags = response.results;

    if (!topTags || topTags.length === 0) return null;

    return (
      <div className="w-full space-y-2">
        <p className="text-center font-medium">Hot Topics 🔥</p>
        <ScrollArea className="w-full">
          <div className="flex items-center w-11/12 gap-x-2 mt-2 mb-3">
            {topTags.map((tag) => (
              <ClickableTag key={tag.id} tag={tag} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    );
  } catch (error) {
    console.error("Error fetching top tags:", error);
    return null;
  }
}

export function TopTagsBar() {
  return (
    <Suspense fallback={<TopTagsSkeleton />}>
      <TopTagsBarWrapper />
    </Suspense>
  );
}

async function TopTagsBarWrapper() {
  try {
    setBasePathToAPI();
    const response = await apiTagsListTopTagsList();
    const topTags = response.results;
    console.log("topTags", topTags);
    if (!topTags || topTags.length === 0) return null;

    return (
      <div className="rounded-md border bg-card px-3 sm:px-5 md:px-6 py-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Trending tags
            </h3>
          </div>
          <ScrollArea className="w-full">
            <div className="flex items-center gap-2">
              {topTags.map((tag) => (
                <ClickableTag key={tag.id} tag={tag} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching top tags:", error);
    return null;
  }
}
