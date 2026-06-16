export type PlausibleEvent =
  | "Discovery CTA Click"
  | "Contact Form Started"
  | "Contact Form Submitted"
  | "Programs CTA Click"
  | "Founding Partner CTA Click"
  | "Method Page CTA Click"
  | "Research Resource Click"
  | "Login Placeholder Viewed"
  | "Dashboard Placeholder Viewed";

declare global {
  interface Window {
    plausible?: (event: PlausibleEvent, options?: { props?: Record<string, string> }) => void;
  }
}

export function trackPlausibleEvent(event: PlausibleEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
