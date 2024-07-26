"use server";

import { categoriesList } from "@/client";
import { setBasePathToAPI } from "./utils";

export async function getCategories() {
  try {
    setBasePathToAPI();
    const categories = await categoriesList();
    return categories;
  } catch (error) {
    return undefined;
  }
}
