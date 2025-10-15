"use server";

import { apiPlansList } from "@/client";
import { setBasePathToAPI } from "./utils";

export async function getPlans() {
  try {
    setBasePathToAPI();
    const plans = await apiPlansList();
    return plans;
  } catch (error) {
    return undefined;
  }
}
