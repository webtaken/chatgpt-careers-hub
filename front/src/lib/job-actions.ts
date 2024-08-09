"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  CreateLocation,
  JobsListData,
  LocationTypeEnum,
  categoriesList,
  jobsCreate,
  jobsList,
  locationsCreateLocationsCreate,
  tagsCreateTagsCreate,
} from "@/client";
import { z } from "zod";
import { setBasePathToAPI } from "./utils";
import { FormSchema } from "@/components/hiring/HireForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function getCategories() {
  try {
    setBasePathToAPI();
    const categories = await categoriesList();
    return categories;
  } catch (error) {
    return undefined;
  }
}

export async function getJobs(filters: JobsListData) {
  try {
    noStore();
    setBasePathToAPI();
    const jobsResponse = await jobsList({ ...filters });
    return jobsResponse;
  } catch (error) {
    return undefined;
  }
}

export async function createJob(data: z.infer<typeof FormSchema>) {
  try {
    setBasePathToAPI();
    const session: any = await getServerSession(authOptions);
    if (session.user.is_staff) {
      const tagNames = data.tags.map((tag) => tag.text);
      const locationNames: CreateLocation[] = data.locations.map(
        (location) => ({
          location: location.name,
          location_type: location.type as LocationTypeEnum,
        })
      );
      let promises = [
        tagsCreateTagsCreate({ requestBody: { tags: tagNames } }),
        locationsCreateLocationsCreate({
          requestBody: { locations: locationNames },
        }),
      ];

      const [tagNamesResponse, locationNamesResponse] =
        await Promise.allSettled(promises);

      const tagIds =
        tagNamesResponse.status === "fulfilled"
          ? tagNamesResponse.value.map((item) => item.id)
          : [];
      const locationIds =
        locationNamesResponse.status === "fulfilled"
          ? locationNamesResponse.value.map((item) => item.id)
          : [];
      const categoryIds = data.categories.map((category) => +category.id);
      console.log(session);
      const job = await jobsCreate({
        // @ts-expect-error
        requestBody: {
          user: session.user.pk,
          company_name: data.companyName,
          title: data.title,
          description: data.description,
          tags: tagIds,
          location: locationIds,
          category: categoryIds,
          remote: data.remote,
          apply_url: data.applyURL,
          apply_by_email: data.applyByEmail,
          apply_email: data.applyEmail,
          company_email: data.companyEmail,
          pin_on_top: data.pinOnTop,
          verified: false,
        },
      });
      return job;
    }
    console.log("no staff");
    return true;
  } catch (error) {
    console.log(error);
    return undefined;
  } finally {
    revalidatePath("/");
  }
}
