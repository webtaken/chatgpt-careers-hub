"use server";

import { CustomRegister, authRegisterCreate } from "@/client";
import { setBasePathToAPI } from "./utils";

export async function signUp(data: CustomRegister) {
  try {
    setBasePathToAPI();
    await authRegisterCreate({ requestBody: { ...data } });
    return true;
  } catch (error: any) {
    console.log(error);
    return error.body;
  }
}
