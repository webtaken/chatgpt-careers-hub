"use server";

import { CustomRegister, apiAuthRegisterCreate } from "@/client";
import { setBasePathToAPI } from "./utils";

export async function signUp(data: CustomRegister) {
  try {
    setBasePathToAPI();
    await apiAuthRegisterCreate({ requestBody: { ...data } });
    return true;
  } catch (error: any) {
    console.log(error);
    return error.body;
  }
}
