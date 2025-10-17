"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { SearchIcon, FilterIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LocationSelectorFilter } from "./LocationsSelectorFilter";
import { Option } from "../ui/multiple-selector";
import { parseNumbersList } from "@/lib/utils";
import { apiTagsListBulkRetrieveCreate } from "@/client";
import { apiLocationsListBulkRetrieveCreate } from "@/client";
import { TagsSelectorFilter } from "./TagsSelectorFilter";

const JobsFilterCardSchema = z.object({
  title: z.string(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
  locations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      type: z.string(),
    })
  ),
});

type JobsFilterCardData = z.infer<typeof JobsFilterCardSchema>;

export function JobsFilterCard({ jobsCount }: { jobsCount?: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [loading, startLoading] = useTransition();
  const [defaultTags, setDefaultTags] = useState<Option[]>([]);
  const [defaultLocations, setDefaultLocations] = useState<Option[]>([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const form = useForm<JobsFilterCardData>({
    resolver: zodResolver(JobsFilterCardSchema),
    defaultValues: {
      title: "",
      tags: [],
      locations: [],
    },
  });

  const { setValue, watch } = form;
  const watchedValues = watch();

  // Debounce the form values for real-time filtering
  const debouncedTitle = useDebounce(watchedValues.title, 500);
  const debouncedTags = useDebounce(watchedValues.tags, 300);
  const debouncedLocations = useDebounce(watchedValues.locations, 300);

  // Apply filters when debounced values change
  useEffect(() => {
    if (loading || !hasUserInteracted) return;

    startLoading(async () => {
      const params = new URLSearchParams(searchParams);

      if (debouncedTitle !== "") {
        params.set("title", debouncedTitle);
      } else {
        params.delete("title");
      }

      if (debouncedTags.length > 0) {
        params.set("tags", debouncedTags.map((tag) => tag.id).join(","));
      } else {
        params.delete("tags");
      }

      if (debouncedLocations.length > 0) {
        params.set(
          "locations",
          debouncedLocations.map((location) => location.id).join(",")
        );
      } else {
        params.delete("locations");
      }

      params.delete("page");
      params.delete("pageSize");
      replace(`${pathname}?${params.toString()}`);
    });
  }, [
    debouncedTitle,
    debouncedTags,
    debouncedLocations,
    pathname,
    replace,
    searchParams,
    loading,
    hasUserInteracted,
  ]);

  // Detect user interaction with form
  useEffect(() => {
    if (
      watchedValues.title ||
      watchedValues.tags.length > 0 ||
      watchedValues.locations.length > 0
    ) {
      setHasUserInteracted(true);
    }
  }, [watchedValues.title, watchedValues.tags, watchedValues.locations]);

  // Load initial values from URL params
  useEffect(() => {
    const getTagsFunc = async (ids: number[]) => {
      const tags = await apiTagsListBulkRetrieveCreate({
        requestBody: { ids: ids },
      });
      if (tags && tags.results) {
        setDefaultTags(
          tags.results.map((tag) => ({
            value: String(tag.id),
            label: tag.text,
          }))
        );
      }
    };

    const getLocationsFunc = async (ids: number[]) => {
      const locations = await apiLocationsListBulkRetrieveCreate({
        requestBody: { ids: ids },
      });
      if (locations && locations.results) {
        setDefaultLocations(
          locations.results.map((location) => ({
            value: String(location.id),
            label: location.location,
          }))
        );
      }
    };

    if (searchParams.has("tags")) {
      const tagIds = parseNumbersList(searchParams.get("tags"));
      if (tagIds) getTagsFunc(tagIds);
    }

    if (searchParams.has("locations")) {
      const locationsIds = parseNumbersList(searchParams.get("locations"));
      if (locationsIds) getLocationsFunc(locationsIds);
    }

    if (searchParams.has("title")) {
      form.setValue("title", searchParams.get("title") || "");
    }
  }, [searchParams, form]);

  const handleReset = () => {
    startLoading(async () => {
      form.reset({
        title: "",
        tags: [],
        locations: [],
      });

      setDefaultTags([]);
      setDefaultLocations([]);
      setHasUserInteracted(false);

      const params = new URLSearchParams();
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const removeTag = (tagId: string) => {
    const currentTags = watchedValues.tags.filter((tag) => tag.id !== tagId);
    setValue("tags", currentTags);
  };

  const removeLocation = (locationId: string) => {
    const currentLocations = watchedValues.locations.filter(
      (location) => location.id !== locationId
    );
    setValue("locations", currentLocations);
  };

  return (
    <div className="bg-white border shadow-sm rounded-lg p-6">
      {/* Main filter row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Title input */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Job title, company, or keyword"
              value={watchedValues.title}
              onChange={(e) => setValue("title", e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-purple-300"
            />
          </div>
        </div>

        {/* Location selector */}
        <div className="w-full lg:w-36">
          <div className="relative">
            <LocationSelectorFilter
              setValueFilter={setValue}
              defaultValue={defaultLocations}
            />
          </div>
        </div>

        {/* Tags selector */}
        <div className="w-full lg:w-36">
          <div className="relative">
            <TagsSelectorFilter
              setValueFilter={setValue}
              defaultValue={defaultTags}
            />
          </div>
        </div>

        {/* Filter icon and job count */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <FilterIcon className="w-4 h-4" />
          <span>{jobsCount?.toLocaleString() ?? 0} jobs found</span>
        </div>
      </div>

      {/* Active filter badges */}
      {(watchedValues.tags.length > 0 ||
        watchedValues.locations.length > 0) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {watchedValues.tags.map((tag) => (
              <div
                key={tag.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
              >
                <span>{tag.text}</span>
                <button
                  onClick={() => removeTag(tag.id)}
                  className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
            {watchedValues.locations.map((location) => (
              <div
                key={location.id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
              >
                <span>{location.name}</span>
                <button
                  onClick={() => removeLocation(location.id)}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
