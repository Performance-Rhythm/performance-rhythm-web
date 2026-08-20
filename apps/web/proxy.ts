import { NextRequest, NextResponse } from "next/server";

function secureEqual(left: string, right: string) {
  const maxLength = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;

  for (let index = 0; index < maxLength; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return difference === 0;
}

function unauthorized() {
  return new NextResponse("Staff sign-in required.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Performance Rhythm Staff", charset="UTF-8"'
    }
  });
}

export function proxy(request: NextRequest) {
  const staffUsername = process.env.STAFF_USERNAME;
  const staffPassword = process.env.STAFF_PASSWORD;

  if (!staffUsername || !staffPassword) {
    return new NextResponse("Staff access is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" }
    });
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return unauthorized();

  try {
    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(":");
    const username = separator >= 0 ? decoded.slice(0, separator) : "";
    const password = separator >= 0 ? decoded.slice(separator + 1) : "";

    if (!secureEqual(username, staffUsername) || !secureEqual(password, staffPassword)) {
      return unauthorized();
    }
  } catch {
    return unauthorized();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/staff/:path*", "/api/staff/:path*"]
};
