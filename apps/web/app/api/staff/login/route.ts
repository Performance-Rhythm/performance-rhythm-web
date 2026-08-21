import { NextResponse } from "next/server";
import { createStaffSessionToken, secureEqual } from "@/lib/staff-auth";

function safeNext(value: FormDataEntryValue | null) {
  const path = typeof value === "string" ? value : "";
  return path.startsWith("/staff/") && !path.startsWith("//") ? path : "/staff/workshops";
}

export async function POST(request: Request) {
  const form = await request.formData();
  const username = String(form.get("username") || "");
  const password = String(form.get("password") || "");
  const next = safeNext(form.get("next"));
  const expectedUsername = process.env.STAFF_USERNAME || "";
  const expectedPassword = process.env.STAFF_PASSWORD || "";

  if (!expectedUsername || !expectedPassword) {
    return new NextResponse("Staff access is not configured.", { status: 503 });
  }

  if (!secureEqual(username, expectedUsername) || !secureEqual(password, expectedPassword)) {
    const failure = new URL("/staff/login", request.url);
    failure.searchParams.set("error", "1");
    failure.searchParams.set("next", next);
    return NextResponse.redirect(failure, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set("pr_staff_session", await createStaffSessionToken(expectedUsername, expectedPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
