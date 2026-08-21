import { NextRequest, NextResponse } from "next/server";
import { createStaffSessionToken } from "@/lib/staff-auth";

function unavailable() {
  return new NextResponse("Staff access is not configured.", {
    status: 503,
    headers: { "Cache-Control": "no-store" }
  });
}

function apiUnauthorized() {
  return NextResponse.json(
    { ok: false, error: "Staff sign-in required." },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );
}

export async function proxy(request: NextRequest) {
  const staffUsername = process.env.STAFF_USERNAME;
  const staffPassword = process.env.STAFF_PASSWORD;
  if (!staffUsername || !staffPassword) return unavailable();

  const { pathname, search } = request.nextUrl;
  if (pathname === "/staff/login" || pathname === "/api/staff/login") return NextResponse.next();

  const expectedToken = await createStaffSessionToken(staffUsername, staffPassword);
  const suppliedToken = request.cookies.get("pr_staff_session")?.value || "";
  if (suppliedToken !== expectedToken) {
    if (pathname.startsWith("/api/")) return apiUnauthorized();
    const loginUrl = new URL("/staff/login", request.url);
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/staff/:path*", "/api/staff/:path*"]
};
