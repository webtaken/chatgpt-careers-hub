"use server";

import {
  apiSubscriptionsGetCountSubscriptionsRetrieve,
  apiSubscriptionsSubscribeCreate,
} from "@/client";
import { setBasePathToAPI } from "./utils";

export async function subscribe(email: string) {
  try {
    setBasePathToAPI();
    const status = await apiSubscriptionsSubscribeCreate({
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
    const response = await apiSubscriptionsGetCountSubscriptionsRetrieve();
    return response.count;
  } catch (error) {
    return undefined;
  }
}
