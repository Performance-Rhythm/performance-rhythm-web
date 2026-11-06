import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("./programs.ts", import.meta.url), "utf8");

function featuredDetails() {
  const start = source.indexOf("featured:");
  const detailsStart = source.indexOf("details:", start);
  const detailsEnd = source.indexOf("],", detailsStart);
  return source.slice(detailsStart, detailsEnd);
}

test("12-week program states four in-person sessions inside twelve, without fixed in-person weeks", () => {
  const details = featuredDetails();
  assert.match(
    details,
    /Week 1 in-person kickoff \(90 minutes\) and 11 weekly 60-minute live sessions, 12 sessions in all/
  );
  assert.match(
    details,
    /Three of the 11 weekly sessions are in person, scheduled with the team, and each replaces that week's virtual session/
  );
  assert.match(
    details,
    /Brief check-ins at the start, midpoint, and Week 12, with an aggregate cohort report/
  );
  assert.doesNotMatch(details, /Weeks 4, 8, and 12/);
  assert.doesNotMatch(details, /Week 4|Week 8/);
  assert.doesNotMatch(source, /in-person reinforcement sessions at Weeks 4, 8, and 12/);
});
