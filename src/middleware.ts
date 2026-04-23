import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || "fallback-dev-secret-do-not-use-in-prod"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login) with JWT
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("sparq-admin-session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect /account routes — check for Neon Auth session cookie
  if (pathname.startsWith("/account")) {
    const hasSession =
      request.cookies.get("__Secure-neon-auth.session_token")?.value ||
      request.cookies.get("neon-auth.session_token")?.value;
    if (!hasSession) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
