import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// login path
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

    if(isPublicPath && token) {
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

  // const isProtectedPath = path === "/profile" || path === "/";
}
//see "Matching Paths" below to learn more about how to match paths

//matching paths
export const config = {
  matcher: ["/", "/login", "/profile", "/signup", "/verifyemail"],
};
