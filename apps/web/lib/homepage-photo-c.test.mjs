import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { getImgProps } = require("next/dist/shared/lib/get-img-props.js");
const defaultLoader = require("next/dist/shared/lib/image-loader.js").default;

const ROOT_PX = 16;
const PHOTO_SRC = "/images/workshop-breathwork-c.webp";
const PHOTO_ALT = "Team practicing guided breathwork around a conference table";

function readSizesConstant() {
  const source = readFileSync(new URL("./homepage-photo-c.ts", import.meta.url), "utf8");
  const match = source.match(/HOMEPAGE_PHOTO_C_SIZES\s*=\s*\n?\s*"([^"]+)"/);
  assert.ok(match, "homepage photo C sizes constant should be a string");
  return match[1];
}

function imageProps(sizes) {
  return getImgProps(
    {
      src: PHOTO_SRC,
      alt: PHOTO_ALT,
      width: 1536,
      height: 1024,
      ...(sizes ? { sizes } : {})
    },
    { defaultLoader, blurComplete: false, showAltText: false }
  ).props;
}

function parseSrcset(srcset) {
  return srcset.split(",").map((part) => {
    const [url, descriptor] = part.trim().split(/\s+/);
    const queryWidth = Number(new URL(url, "https://example.test").searchParams.get("w"));
    if (descriptor.endsWith("w")) {
      return { url, queryWidth, width: Number(descriptor.slice(0, -1)), density: null };
    }
    if (descriptor.endsWith("x")) {
      return { url, queryWidth, width: null, density: Number(descriptor.slice(0, -1)) };
    }
    throw new Error(`Unrecognized srcset descriptor: ${descriptor}`);
  });
}

function splitSizes(sizes) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < sizes.length; index += 1) {
    const character = sizes[index];
    if (character === "(") depth += 1;
    else if (character === ")") depth -= 1;
    else if (character === "," && depth === 0) {
      parts.push(sizes.slice(start, index).trim());
      start = index + 1;
    }
  }
  parts.push(sizes.slice(start).trim());
  return parts;
}

function lengthPx(expression, viewport) {
  const value = expression.trim();
  if (value.endsWith("px") && !value.includes("calc")) return Number(value.slice(0, -2));

  const divided = value.match(/^calc\(\(([\d.]+)px - ([\d.]+)rem - ([\d.]+)rem\) \/ ([\d.]+)\)$/);
  if (divided) {
    const [, width, paddingRem, gapRem, divisor] = divided;
    return (Number(width) - Number(paddingRem) * ROOT_PX - Number(gapRem) * ROOT_PX) / Number(divisor);
  }

  const padded = value.match(/^calc\(([\d.]+)px - ([\d.]+)rem\)$/);
  if (padded) return Number(padded[1]) - Number(padded[2]) * ROOT_PX;

  const viewportWidth = value.match(/^calc\(([\d.]+)vw - ([\d.]+)rem\)$/);
  if (viewportWidth) return (Number(viewportWidth[1]) / 100) * viewport - Number(viewportWidth[2]) * ROOT_PX;

  throw new Error(`Unsupported sizes length: ${value}`);
}

function slotWidth(sizes, viewport) {
  for (const part of splitSizes(sizes)) {
    const media = part.match(/^\(([^)]+)\)\s+(.+)$/);
    if (!media) return lengthPx(part, viewport);
    const [feature, rawValue] = media[1].split(":").map((piece) => piece.trim());
    const minWidth = Number(rawValue.replace("px", ""));
    if (feature === "min-width" && viewport >= minWidth) return lengthPx(media[2], viewport);
  }
  throw new Error(`No sizes clause matched viewport ${viewport}`);
}

/** CSS width of photo C: padded Tailwind container, two columns from lg. */
function renderedWidth(viewport) {
  const padding = 3 * ROOT_PX;
  const gap = 4 * ROOT_PX;
  const container = [1536, 1280, 1024, 768, 640].find((max) => viewport >= max) ?? viewport;
  const content = container - padding;
  return viewport >= 1024 ? (content - gap) / 2 : content;
}

function chosenDownloadWidth(props, viewport, dpr) {
  const candidates = parseSrcset(props.srcSet);
  if (candidates[0].density != null) {
    const sorted = [...candidates].sort((a, b) => a.density - b.density);
    return (sorted.find((candidate) => candidate.density >= dpr) ?? sorted.at(-1)).queryWidth;
  }
  const target = slotWidth(props.sizes, viewport) * dpr;
  const sorted = [...candidates].sort((a, b) => a.width - b.width);
  return (sorted.find((candidate) => candidate.width >= target) ?? sorted.at(-1)).queryWidth;
}

const SIZES = readSizesConstant();

test("homepage photo C keeps its asset, crop, and layout classes", () => {
  const source = readFileSync(new URL("../components/marketing/HomeRedesign.tsx", import.meta.url), "utf8");
  const image = source.slice(source.indexOf('src="/images/workshop-breathwork-c.webp"') - 40, source.indexOf('src="/images/workshop-breathwork-c.webp"') + 500);
  assert.match(image, /src="\/images\/workshop-breathwork-c\.webp"/);
  assert.match(image, new RegExp(`alt="${PHOTO_ALT}"`));
  assert.match(image, /width=\{1536\}/);
  assert.match(image, /height=\{1024\}/);
  assert.match(image, /sizes=\{HOMEPAGE_PHOTO_C_SIZES\}/);
  assert.match(image, /className="w-full h-auto rounded-lg"/);
  assert.doesNotMatch(image, /object-cover|object-contain/);
});

test("sizes match the rendered photo C box and phones request a smaller file", () => {
  const sized = imageProps(SIZES);
  const unsized = imageProps(undefined);
  const viewports = [360, 390, 430, 600, 640, 700, 768, 900, 1024, 1100, 1280, 1440, 1536, 1920];

  for (const viewport of viewports) {
    const rendered = renderedWidth(viewport);
    const slot = slotWidth(SIZES, viewport);
    assert.ok(Math.abs(slot - rendered) < 0.5, `${viewport}px slot ${slot} should equal rendered ${rendered}`);
    for (const dpr of [1, 2, 3]) {
      const download = chosenDownloadWidth(sized, viewport, dpr);
      assert.ok(download + 0.5 >= rendered * dpr, `${viewport}px @${dpr}x downloads ${download}, below rendered ${rendered * dpr}`);
    }
  }

  for (const viewport of [360, 390, 412, 430]) {
    for (const dpr of [2, 3]) {
      const withSizes = chosenDownloadWidth(sized, viewport, dpr);
      const withoutSizes = chosenDownloadWidth(unsized, viewport, dpr);
      assert.ok(withSizes < withoutSizes, `${viewport}px @${dpr}x expected a smaller download than ${withoutSizes}, got ${withSizes}`);
    }
  }

  assert.match(sized.srcSet, /\s640w,/);
  assert.match(unsized.srcSet, /\s1x,/);
  assert.match(unsized.srcSet, /\s2x$/);
});
