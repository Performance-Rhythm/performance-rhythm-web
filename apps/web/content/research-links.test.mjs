import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("./research.ts", import.meta.url), "utf8");
const marker = 'title: "Psychological Safety and Learning Behavior in Work Teams"';
const article = source.slice(source.indexOf(marker), source.indexOf(marker) + 700);

test("Edmondson 1999 citation uses the JSTOR stable HTTPS URL", () => {
  assert.ok(article.includes(marker));
  assert.match(article, /source: "Administrative Science Quarterly"/);
  assert.match(article, /year: "1999"/);
  assert.match(article, /url: "https:\/\/www\.jstor\.org\/stable\/2666999"/);
  assert.doesNotMatch(article, /doi\.org/);
  assert.doesNotMatch(article, /journals\.sagepub\.com/);
  assert.doesNotMatch(article, /http:\/\//);
});
