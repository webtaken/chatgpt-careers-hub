"use server";

import { subscriptionsSubscribeCreate } from "@/client";
import { setBasePathToAPI } from "./utils";

export async function subscribe(email: string) {
  try {
    setBasePathToAPI();
    const status = await subscriptionsSubscribeCreate({
      requestBody: { email },
    });
    return status;
  } catch (error) {
    return undefined;
  }
}
