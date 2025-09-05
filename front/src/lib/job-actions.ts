"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import {
  CreateLocation,
  JobsListListData,
  LocationTypeEnum,
  TagsListListData,
  categoriesList,
  jobsBySlugRetrieve,
  jobsCreate,
  jobsList,
  jobsListList,
  jobsPartialUpdate,
  locationsCreateLocationsCreate,
  locationsListBulkRetrieveCreate,
  locationsListList,
  orderGetCheckoutUrlCreate,
  tagsCreateTagsCreate,
  tagsListBulkRetrieveCreate,
  tagsListTopTagsList,
  tagsListList,
  Tag,
} from "@/client";
import { z } from "zod";
import { setBasePathToAPI, setCredentialsToAPI } from "./utils";
import { FormSchema } from "@/components/hiring/HireForm";
import { auth } from "@/auth";
import { getPlans } from "./billing-actions";

export async function getCategories() {
  try {
    setBasePathToAPI();
    const categories = await categoriesList();
    return categories;
  } catch (error) {
    return undefined;
  }
}

export async function getJobs(filters: JobsListListData) {
  try {
    noStore();
    setBasePathToAPI();
    const jobsResponse = await jobsListList({ ...filters });
    return jobsResponse;
  } catch (error) {
    return undefined;
  }
}

export async function getUserJobs() {
  try {
    noStore();
    await setCredentialsToAPI();
    const jobsResponse = await jobsList();
    return jobsResponse;
  } catch (error) {
    return undefined;
  }
}

export async function createJob(data: z.infer<typeof FormSchema>) {
  const createTagsAndLocations = async () => {
    const tagNames = data.tags.map((tag) => tag.text);
    const locationNames: CreateLocation[] = data.locations.map((location) => ({
      location: location.name,
      location_type: location.type as LocationTypeEnum,
    }));
    let promises = [
      tagsCreateTagsCreate({ requestBody: { tags: tagNames } }),
      locationsCreateLocationsCreate({
        requestBody: { locations: locationNames },
      }),
    ];
    const [tagNamesResponse, locationNamesResponse] = await Promise.allSettled(
      promises
    );
    const tagIds =
      tagNamesResponse.status === "fulfilled"
        ? tagNamesResponse.value.map((item) => item.id)
        : [];
    const locationIds =
      locationNamesResponse.status === "fulfilled"
        ? locationNamesResponse.value.map((item) => item.id)
        : [];
    return {
      tagIds,
      locationIds,
    };
  };
  try {
    await setCredentialsToAPI();
    const session: any = await auth();
    if (session.user.is_staff) {
      let { tagIds, locationIds } = await createTagsAndLocations();
      let categoryIds = data.categories.map((category) => +category.id);
      const job = await jobsCreate({
        // @ts-expect-error
        requestBody: {
          user: session.user.pk as number,
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
          verified: data.verified,
        },
      });
      return job;
    }

    const plans = await getPlans();
    if (!plans) {
      throw Error("Not plans found");
    }

    let { tagIds, locationIds } = await createTagsAndLocations();
    let categoryIds = data.categories.map((category) => +category.id);
    const job = await jobsCreate({
      // @ts-expect-error
      requestBody: {
        user: session.user.pk as number,
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
        verified: data.verified,
        visible: false,
      },
    });
    const selectedPlan = plans.find(
      (plan) => plan.variant_id === +process.env.JOB_POST_VARIANT!
    );
    const checkoutURL = await orderGetCheckoutUrlCreate({
      requestBody: {
        receipt_button_text: "Go to Dashboard",
        receipt_thank_you_note: "Thanks for posting on chatgpt-jobs!",
        redirect_url: `${process.env.AUTH_URL!}/dashboard`,
        user_id: session.user.pk as number,
        job_id: job.id,
        email: data.companyEmail,
        variant_id: selectedPlan!.variant_id,
      },
    });
    return checkoutURL;
  } catch (error) {
    console.log(error);
    return undefined;
  } finally {
    revalidatePath("/");
  }
}

export async function updateJob(id: number, data: z.infer<typeof FormSchema>) {
  try {
    await setCredentialsToAPI();
    const tagNames = data.tags.map((tag) => tag.text);
    const locationNames: CreateLocation[] = data.locations.map((location) => ({
      location: location.name,
      location_type: location.type as LocationTypeEnum,
    }));
    let promises = [
      tagsCreateTagsCreate({ requestBody: { tags: tagNames } }),
      locationsCreateLocationsCreate({
        requestBody: { locations: locationNames },
      }),
    ];

    const [tagNamesResponse, locationNamesResponse] = await Promise.allSettled(
      promises
    );

    const tagIds =
      tagNamesResponse.status === "fulfilled"
        ? tagNamesResponse.value.map((item) => item.id)
        : [];
    const locationIds =
      locationNamesResponse.status === "fulfilled"
        ? locationNamesResponse.value.map((item) => item.id)
        : [];
    const categoryIds = data.categories.map((category) => +category.id);
    const job = await jobsPartialUpdate({
      id: id,
      requestBody: {
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
        verified: data.verified,
      },
    });
    return job;
  } catch (error) {
    console.log(error);
    return undefined;
  } finally {
    revalidatePath("/");
  }
}

export async function getJobBySlug(slug: string) {
  try {
    const job = await jobsBySlugRetrieve({ slug: slug });
    return job;
  } catch (error) {
    return undefined;
  }
}

export async function getTags(data: TagsListListData) {
  try {
    const tags = await tagsListList({ ...data });
    return tags.results;
  } catch (error) {
    return undefined;
  }
}

export async function getBulkTags(ids: number[]) {
  try {
    const tags = await tagsListBulkRetrieveCreate({
      requestBody: { ids: ids },
    });
    return tags;
  } catch (error) {
    return undefined;
  }
}

export async function getLocations(text: string) {
  try {
    const locations = await locationsListList({ location: text });
    return locations.results;
  } catch (error) {
    return undefined;
  }
}

export async function getBulkLocations(ids: number[]) {
  try {
    const locations = await locationsListBulkRetrieveCreate({
      requestBody: { ids: ids },
    });
    return locations;
  } catch (error) {
    return undefined;
  }
}

export async function getWeeklyTopTags() {
  try {
    const tags = await tagsListTopTagsList();
    return tags as unknown as Tag[];
  } catch (error) {
    return undefined;
  }
}
