import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authTokenVerifyCreate, OpenAPI } from "./client";

// API Paths to be restricted.
const protectedRoutes = ["/hiring", "/dashboard"];

export default async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
    });

    let url = new URL("/signin", request.url);
    // check not logged in.
    if (!token) {
      return NextResponse.redirect(url);
    } else {
      const tokenBack = token["access_token"];
      if (!tokenBack) {
        return NextResponse.redirect(url);
      }
      OpenAPI.BASE = process.env.BASE_PATH_API!;
      try {
        await authTokenVerifyCreate({
          requestBody: { token: tokenBack as string },
        });
      } catch (error) {
        console.log("Token verify error:", error);
        return NextResponse.redirect(url);
      }
      return res;
    }
  }
  return res;
}
