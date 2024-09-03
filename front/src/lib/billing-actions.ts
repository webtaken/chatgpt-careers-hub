"use server";

import { plansList } from "@/client";
import { setBasePathToAPI } from "./utils";

export async function getPlans() {
  try {
    setBasePathToAPI();
    const plans = await plansList();
    return plans;
  } catch (error) {
    return undefined;
  }
}
