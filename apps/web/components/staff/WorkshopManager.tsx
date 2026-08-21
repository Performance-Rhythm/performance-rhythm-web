"use client";

import QRCode from "qrcode";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import type { CreateWorkshopResponse, WorkshopLinks } from "@/lib/workshop-surveys";

const fieldClass = "mt-2 w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-primary shadow-subtle outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";
const actionClass = "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
const workshopStartTimes = Array.from({ length: 76 }, (_, index) => {
  const totalMinutes = 5 * 60 + index * 15;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  const label = `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`;
  return { value, label };
});

function SurveyCard({ label, url, filename }: { label: string; url: string; filename: string }) {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, { width: 720, margin: 2, color: { dark: "#0B1D2A", light: "#FFFFFF" } })
      .then((dataUrl) => active && setQrDataUrl(dataUrl));
    return () => { active = false; };
  }, [url]);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <article className="rounded-[1.5rem] border border-primary/10 bg-white p-5 shadow-medium sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{label}</p>
      <div className="mx-auto mt-5 aspect-square w-full max-w-[360px] rounded-2xl border border-primary/10 bg-white p-3">
        {qrDataUrl ? <Image src={qrDataUrl} alt={`${label} QR code`} width={720} height={720} unoptimized className="h-full w-full" /> : <div className="h-full w-full animate-pulse rounded-xl bg-neutral" />}
      </div>
      <a href={url} target="_blank" rel="noreferrer" className="mt-5 block break-all text-sm text-secondary underline decoration-accent/40 underline-offset-4 hover:text-accent">
        {url}
      </a>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={copyLink} className={`${actionClass} bg-primary text-white hover:bg-secondary`}>
          {copied ? "Copied" : "Copy link"}
        </button>
        <a href={qrDataUrl || undefined} download={filename} aria-disabled={!qrDataUrl} className={`${actionClass} border border-primary/20 text-primary hover:bg-neutral ${!qrDataUrl ? "pointer-events-none opacity-50" : ""}`}>
          Download QR
        </a>
      </div>
    </article>
  );
}

export function WorkshopManager() {
  const [result, setResult] = useState<WorkshopLinks | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function createWorkshop(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setResult(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      company: String(form.get("company") || ""),
      sessionName: String(form.get("sessionName") || ""),
      workshopDate: String(form.get("workshopDate") || ""),
      startTime: String(form.get("startTime") || "")
    };

    try {
      const response = await fetch("/api/staff/workshops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const body = await response.json() as CreateWorkshopResponse;
      if (!body.ok) throw new Error(body.error);
      setResult(body.workshop);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create the workshop.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <form onSubmit={createWorkshop} className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-medium sm:p-9">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-bold text-primary">Company
            <input className={fieldClass} name="company" autoComplete="organization" maxLength={120} required placeholder="Acme Company" />
          </label>
          <label className="text-sm font-bold text-primary">Session name
            <input className={fieldClass} name="sessionName" maxLength={160} required placeholder="Leadership Reset Workshop" />
          </label>
          <label className="text-sm font-bold text-primary">Workshop date
            <input className={fieldClass} name="workshopDate" type="date" required />
          </label>
          <label className="text-sm font-bold text-primary">Start time
            <select className={fieldClass} name="startTime" defaultValue="" required>
              <option value="" disabled>Select a start time</option>
              {workshopStartTimes.map((time) => <option key={time.value} value={time.value}>{time.label}</option>)}
            </select>
          </label>
        </div>
        <button disabled={submitting} className={`${actionClass} mt-7 bg-accent px-7 text-white shadow-md hover:bg-secondary disabled:cursor-wait disabled:opacity-60`}>
          {submitting ? "Creating workshop…" : "Create Workshop"}
        </button>
        {error ? <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">{error}</p> : null}
      </form>

      {result ? (
        <section aria-live="polite" className="mt-10">
          <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-primary px-6 py-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-support">Workshop ready</p>
              <h2 className="mt-1 text-xl font-bold">{result.company} · {result.sessionName}</h2>
              <p className="mt-1 text-sm text-white/75">{result.workshopDate} at {result.startTime} MT</p>
            </div>
            <a href={result.liveDashboardUrl} target="_blank" rel="noreferrer" className={`${actionClass} bg-white text-primary hover:bg-neutral`}>
              Open Live Dashboard
            </a>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <SurveyCard label="Pre-workshop survey" url={result.preSurveyUrl} filename={`${result.id}-pre-survey-qr.png`} />
            <SurveyCard label="Post-workshop survey" url={result.postSurveyUrl} filename={`${result.id}-post-survey-qr.png`} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
