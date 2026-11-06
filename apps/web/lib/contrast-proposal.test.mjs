import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function channel(hex, start) {
  const value = parseInt(hex.slice(start, start + 2), 16) / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function contrast(foreground, background) {
  const luminance = (hex) => {
    const normalized = hex.replace("#", "");
    return 0.2126 * channel(normalized, 0) + 0.7152 * channel(normalized, 2) + 0.0722 * channel(normalized, 4);
  };
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

const read = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("navy passes AA on white, copper, and steel; copper and steel fail for small text on white", () => {
  assert.ok(contrast("#0B1D2A", "#FFFFFF") >= 7);
  assert.ok(contrast("#0B1D2A", "#FAFAF8") >= 7);
  assert.ok(contrast("#0B1D2A", "#D97742") >= 4.5);
  assert.ok(contrast("#0B1D2A", "#C86A37") >= 4.5);
  assert.ok(contrast("#0B1D2A", "#5E8AA8") >= 4.5);
  assert.ok(contrast("#D97742", "#FFFFFF") < 4.5);
  assert.ok(contrast("#D97742", "#FFFFFF") >= 3);
  assert.ok(contrast("#5E8AA8", "#FFFFFF") < 4.5);
  assert.ok(contrast("#5E8AA8", "#FFFFFF") >= 3);
  assert.ok(contrast("#FFFFFF", "#D97742") < 4.5);
  assert.ok(contrast("#46606F", "#FFFFFF") >= 4.5);
});

test("small copper and steel copy is navy, and 19px copper eyebrows stay", () => {
  const research = read("../components/marketing/ResearchPage.tsx");
  const contact = read("../components/marketing/ContactPage.tsx");
  const about = read("../components/marketing/AboutPage.tsx");
  const method = read("../components/marketing/MethodPage.tsx");
  const programs = read("../components/marketing/ProgramsPage.tsx");
  const login = read("../app/staff/login/page.tsx");
  const layout = read("../app/layout.tsx");
  const button = read("../components/ui/Button.tsx");

  assert.match(research, /text-\[#0B1D2A\] underline decoration-\[#D97742\]/);
  assert.doesNotMatch(research, /text-xs font-bold text-\[#5E8AA8\]/);
  assert.doesNotMatch(research, /font-bold text-\[#D97742\] hover:text-\[#5E8AA8\]/);
  assert.match(research, /text-\[19px\][^\n]*text-accent/);

  assert.match(contact, /font-bold text-\[#0B1D2A\] underline decoration-\[#D97742\]/);
  assert.doesNotMatch(contact, /text-lg font-bold text-\[#D97742\]/);
  assert.match(contact, /text-\[19px\][^\n]*text-accent/);

  assert.doesNotMatch(about, /text-lg font-bold text-\[#D97742\]/);
  assert.doesNotMatch(about, /text-sm text-\[#5E8AA8\]/);
  assert.match(about, /text-\[19px\][^\n]*text-accent/);
  assert.match(about, /text-xl lg:text-2xl font-bold text-\[#D97742\]/);

  assert.doesNotMatch(method, /text-sm text-\[#5E8AA8\]/);
  assert.match(method, /text-\[19px\][^\n]*text-accent/);

  assert.doesNotMatch(programs, /text-sm font-bold text-\[#5E8AA8\]/);
  assert.match(login, /bg-accent px-6 py-3 font-bold text-\[#0B1D2A\]/);
  assert.doesNotMatch(login, /text-white/);
  assert.match(layout, /focus:bg-accent[^"]*focus:text-\[#0B1D2A\]/);
  assert.doesNotMatch(button, /hover:text-accent/);
});
