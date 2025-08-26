import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { authTokenVerifyCreate, OpenAPI } from "./client";

import { auth } from "@/auth";

// // API Paths to be restricted.
const protectedRoutes = ["/hiring", "/dashboard"];

export default auth(async (req) => {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  if (!req.auth && protectedRoutes.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: req,
    });
    let url = new URL("/signin", req.url);
    // check not logged in.
    if (!token) {
      return Response.redirect(url);
    } else {
      const tokenBack = token["access_token"];
      if (!tokenBack) {
        return Response.redirect(url);
      }
      OpenAPI.BASE = process.env.BASE_PATH_API!;
      try {
        await authTokenVerifyCreate({
          requestBody: { token: tokenBack as string },
        });
      } catch (error) {
        console.log("Token verify error:", error);
        return Response.redirect(url);
      }
      return res;
    }
  }
  return res;
});
