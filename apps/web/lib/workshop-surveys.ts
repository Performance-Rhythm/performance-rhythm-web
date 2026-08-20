export type CreateWorkshopInput = {
  company: string;
  sessionName: string;
  workshopDate: string;
  startTime: string;
};

export type WorkshopLinks = CreateWorkshopInput & {
  id: string;
  preSurveyUrl: string;
  postSurveyUrl: string;
  liveDashboardUrl: string;
};

export type CreateWorkshopResponse =
  | { ok: true; workshop: WorkshopLinks }
  | { ok: false; error: string };

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):(00|15|30|45)$/;

export function validateWorkshopInput(value: unknown): CreateWorkshopInput {
  if (!value || typeof value !== "object") throw new Error("Workshop details are required.");

  const record = value as Record<string, unknown>;
  const company = typeof record.company === "string" ? record.company.trim() : "";
  const sessionName = typeof record.sessionName === "string" ? record.sessionName.trim() : "";
  const workshopDate = typeof record.workshopDate === "string" ? record.workshopDate : "";
  const startTime = typeof record.startTime === "string" ? record.startTime : "";

  if (company.length < 2 || company.length > 120) throw new Error("Enter a valid company name.");
  if (sessionName.length < 2 || sessionName.length > 160) throw new Error("Enter a valid session name.");
  if (!DATE_PATTERN.test(workshopDate)) throw new Error("Enter a valid workshop date.");
  if (!TIME_PATTERN.test(startTime)) throw new Error("Choose a start time in a 15-minute increment.");

  return { company, sessionName, workshopDate, startTime };
}

function publicUrl(value: unknown, fieldName: string) {
  if (typeof value !== "string") throw new Error(`The backend did not return ${fieldName}.`);
  const url = new URL(value);
  if (url.protocol !== "https:") throw new Error(`The backend returned an invalid ${fieldName}.`);
  return url.toString();
}

export function normalizeWorkshopResponse(value: unknown, input: CreateWorkshopInput): WorkshopLinks {
  if (!value || typeof value !== "object") throw new Error("The survey service returned an invalid response.");
  const response = value as Record<string, unknown>;

  if (response.ok !== true) {
    throw new Error(typeof response.error === "string" ? response.error : "The survey service could not create the workshop.");
  }

  const workshop = response.workshop;
  if (!workshop || typeof workshop !== "object") throw new Error("The survey service did not return workshop links.");
  const record = workshop as Record<string, unknown>;

  return {
    ...input,
    id: typeof record.id === "string" && record.id ? record.id : `${input.workshopDate}-${input.startTime}`,
    preSurveyUrl: publicUrl(record.preSurveyUrl, "the pre-workshop survey URL"),
    postSurveyUrl: publicUrl(record.postSurveyUrl, "the post-workshop survey URL"),
    liveDashboardUrl: publicUrl(record.liveDashboardUrl, "the live dashboard URL")
  };
}
