import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const headers = config.slice(config.indexOf("const proposedSecurityHeaders"));

test("proposal sends report-only CSP and safe headers, and does not commit HSTS preload", () => {
  assert.match(headers, /Content-Security-Policy-Report-Only/);
  assert.doesNotMatch(headers, /key:\s*"Content-Security-Policy"/);
  assert.doesNotMatch(headers, /Strict-Transport-Security/);
  assert.doesNotMatch(headers, /preload/);
  assert.doesNotMatch(headers, /includeSubDomains/);
  assert.doesNotMatch(config, /X-Frame-Options/);
  assert.match(config, /X-Content-Type-Options", value: "nosniff"/);
  assert.match(config, /Referrer-Policy", value: "strict-origin-when-cross-origin"/);
  assert.match(config, /camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\)/);
  assert.match(config, /https:\/\/plausible\.io/);
  assert.match(config, /img-src 'self' data: blob:/);
  assert.match(config, /frame-src 'none'/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /form-action 'self'/);
});
