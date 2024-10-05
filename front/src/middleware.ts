import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authTokenVerifyCreate } from "./client";
import { setBasePathToAPI } from "./lib/utils";

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
      setBasePathToAPI();
      const response = await authTokenVerifyCreate({
        requestBody: { token: tokenBack as string },
      });
      // @ts-expect-error
      if (response.code && response.code === "token_not_valid") {
        return NextResponse.redirect(url);
      }
      return res;
    }
  }
  return res;
}
