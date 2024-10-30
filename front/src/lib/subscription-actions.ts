"use server";

import {
  subscriptionsGetCountSubscriptionsRetrieve,
  subscriptionsSubscribeCreate,
} from "@/client";
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

export async function getSubscriptionsCount() {
  try {
    setBasePathToAPI();
    const response = await subscriptionsGetCountSubscriptionsRetrieve();
    return response.count;
  } catch (error) {
    return undefined;
  }
}
