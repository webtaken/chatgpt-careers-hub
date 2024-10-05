import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// API Paths to be restricted.
const protectedRoutes = ["/hiring", "/dashboard"];

export default async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
    });
    console.log(token);
    // check not logged in.
    if (!token) {
      const url = new URL("/signin", request.url);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
