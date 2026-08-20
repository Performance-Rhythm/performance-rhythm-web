# Workshop Survey API Contract

The website calls the Google Apps Script deployment only from the server-side route `POST /api/staff/workshops`. The Apps Script URL, authorization token, and spreadsheet ID must never be returned to the browser.

Authoritative Apps Script project ID: `1dRyOkWMwDQV-PMqPGtwm0qnYgcnEklm2UbYVAz9X4ZdsEiomLyXzpiJi`.

## Apps Script request

Deploy the Apps Script project as a web app that accepts a JSON body in `doPost(e)`:

```json
{
  "action": "createWorkshop",
  "authorizationToken": "server-side shared secret",
  "spreadsheetId": "1N5s99wi3-lMRiRJEqomV7h1rG9yEXCgKQSzxQ5Bqknw",
  "company": "Example Company",
  "sessionName": "Leadership Reset Workshop",
  "workshopDate": "2026-09-15",
  "startTime": "09:00",
  "timeZone": "America/Denver"
}
```

The backend compares `authorizationToken` with `WORKSHOP_API_KEY` stored in Apps Script Properties, rejects unknown actions, validates every field, and opens only the configured spreadsheet. The token must not be stored in the Sheet. Start times use 15-minute increments.

## Successful response

Return JSON with an HTTP-compatible success payload:

```json
{
  "ok": true,
  "workshop": {
    "id": "stable-workshop-id",
    "preSurveyUrl": "https://docs.google.com/forms/d/e/.../viewform",
    "postSurveyUrl": "https://docs.google.com/forms/d/e/.../viewform",
    "liveDashboardUrl": "https://docs.google.com/spreadsheets/d/.../edit#gid=123"
  }
}
```

Only public respondent URLs and the staff dashboard URL may be returned. Do not return form edit URLs, participant responses, email addresses, the authorization token, or internal configuration values.

The post-workshop form owns follow-up opt-in: it contains the required 7/14/30-day tracking yes/no question and the optional attendee email field. There is no separate enrollment form. The website must not receive or display a legacy enrollment URL/QR, attendee email addresses, or individual follow-up links; the Apps Script system emails those links privately to opted-in participants.

## Error response

```json
{
  "ok": false,
  "error": "A short staff-safe explanation"
}
```

The Next.js route validates inputs and normalizes URLs again before returning them to the staff UI. Server logs should retain technical details; browser responses should not include stack traces or Google API errors.
