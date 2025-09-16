"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { UseFormSetValue } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagsSelector } from "../hiring/TagsSelector";
import { LocationSelector } from "../hiring/LocationSelector";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Loader2Icon, RotateCcwIcon } from "lucide-react";
import { Option } from "../ui/multiple-selector";
import { parseNumbersList } from "@/lib/utils";
import { getBulkLocations, getBulkTags, getTags } from "@/lib/job-actions";

export type JobsFilterFormSetValueSchema = UseFormSetValue<{
  title: string;
  tags: {
    id: string;
    text: string;
  }[];
  locations: {
    id: string;
    name: string;
    type: string;
  }[];
}>;

export const JobsFilterFormSchema = z.object({
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

export function JobsFilterForm({
  variant = "inline",
}: {
  variant?: "sidebar" | "inline";
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [loading, startLoading] = useTransition();
  const [defaultTags, setDefaultTags] = useState<Option[]>([]);
  const [defaultLocations, setDefaultLocations] = useState<Option[]>([]);
  const form = useForm<z.infer<typeof JobsFilterFormSchema>>({
    resolver: zodResolver(JobsFilterFormSchema),
    defaultValues: {
      title: "",
      tags: [],
      locations: [],
    },
  });
  const { setValue } = form;

  async function onSubmit(data: z.infer<typeof JobsFilterFormSchema>) {
    startLoading(async () => {
      const params = new URLSearchParams(searchParams);
      if (data.title !== "") params.set("title", data.title);
      else params.delete("title");
      if (data.tags.length > 0)
        params.set("tags", data.tags.map((tag) => tag.id).join(","));
      else params.delete("tags");
      if (data.locations.length > 0)
        params.set(
          "locations",
          data.locations.map((location) => location.id).join(",")
        );
      else params.delete("locations");

      params.delete("page");
      params.delete("pageSize");
      replace(`${pathname}?${params.toString()}`);
    });
  }

  function handleReset() {
    startLoading(async () => {
      // Reset form to default values
      form.reset({
        title: "",
        tags: [],
        locations: [],
      });

      // Clear URL parameters
      const params = new URLSearchParams();
      replace(`${pathname}?${params.toString()}`);

      // Clear default values for tags and locations
      setDefaultTags([]);
      setDefaultLocations([]);
    });
  }

  useEffect(() => {
    const getTagsFunc = async (ids: number[]) => {
      const tags = await getBulkTags(ids);
      if (tags) {
        setDefaultTags(
          // @ts-expect-error
          tags.map((tag) => ({ value: String(tag.id), label: tag.text }))
        );
      }
    };
    const getLocationsFunc = async (ids: number[]) => {
      const locations = await getBulkLocations(ids);
      if (locations) {
        setDefaultLocations(
          // @ts-expect-error
          locations.map((location) => ({
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
  }, [searchParams]);

  const isSidebar = variant === "sidebar";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={
          isSidebar
            ? "space-y-4"
            : "space-y-4 p-4 bg-white shadow rounded-lg mb-8"
        }
      >
        <div
          className={
            isSidebar
              ? "grid grid-cols-1 gap-4"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          }
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    aria-label="job title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags, Keywords, or Stack</FormLabel>
                <FormControl>
                  <TagsSelector
                    setValueFilter={setValue}
                    defaultValue={defaultTags}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <LocationSelector
                    setValueFilter={setValue}
                    defaultValue={defaultLocations}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div
          className={
            isSidebar ? "flex flex-col gap-2" : "flex justify-end gap-2"
          }
        >
          <Button
            disabled={loading}
            type="submit"
            className={
              isSidebar
                ? "w-full flex items-center justify-center gap-x-2"
                : "flex items-center gap-x-2"
            }
          >
            {loading && <Loader2Icon className="w-3 h-3 animate-spin" />} Apply
          </Button>
          <Button
            disabled={loading}
            type="button"
            variant="outline"
            onClick={handleReset}
            className={
              isSidebar
                ? "w-full flex items-center justify-center gap-x-2"
                : "flex items-center gap-x-2"
            }
          >
            <RotateCcwIcon className="w-3 h-3" /> Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
