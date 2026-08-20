import { NextResponse } from "next/server";
import {
  normalizeWorkshopResponse,
  validateWorkshopInput,
  type CreateWorkshopResponse
} from "@/lib/workshop-surveys";

export const dynamic = "force-dynamic";

function json(body: CreateWorkshopResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store" }
  });
}

export async function POST(request: Request) {
  try {
    const endpoint = process.env.SURVEY_APPS_SCRIPT_WEB_APP_URL;
    const authorizationToken = process.env.SURVEY_APPS_SCRIPT_API_KEY;
    const spreadsheetId = process.env.SURVEY_SPREADSHEET_ID;

    if (!endpoint || !authorizationToken || !spreadsheetId) {
      return json({ ok: false, error: "The workshop survey service is not configured yet." }, 503);
    }

    const input = validateWorkshopInput(await request.json());
    const backendResponse = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "createWorkshop",
        authorizationToken,
        spreadsheetId,
        timeZone: "America/Denver",
        ...input
      }),
      signal: AbortSignal.timeout(60_000)
    });

    if (!backendResponse.ok) {
      return json({ ok: false, error: "The survey service is temporarily unavailable." }, 502);
    }

    const workshop = normalizeWorkshopResponse(await backendResponse.json(), input);
    return json({ ok: true, workshop }, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create the workshop.";
    const status = message.startsWith("Enter ") || message.includes("required") ? 400 : 502;
    return json({ ok: false, error: message }, status);
  }
}
