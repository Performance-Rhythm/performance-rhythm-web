# WEB-11 security header proposal

Status: draft. Do not merge. Do not deploy. This branch is based on `master` and does not include the WEB-52/55/59 maintenance changes or the WEB-53 contrast proposal.

## Current production headers

`https://www.performancerhythm.com/` on 6 Nov 2026 returned:

- `strict-transport-security: max-age=63072000` (Vercel, no `includeSubDomains`, no `preload`)
- `access-control-allow-origin: *` on the static HTML response
- no `Content-Security-Policy`
- no `Content-Security-Policy-Report-Only`
- no `X-Content-Type-Options`
- no `X-Frame-Options`
- no `Referrer-Policy`
- no `Permissions-Policy`

`apps/web/next.config.ts` already sets `poweredByHeader: false`. Staff routes set cache and `X-Robots-Tag` only. There is no site-wide security header config.

## What this branch proposes

Enforced, and checked against the current pages:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`

Report-only, so the browser reports violations and still loads the page:

- `Content-Security-Policy-Report-Only` with `default-src 'self'`, images from `self` `data:` and `blob:`, styles `'unsafe-inline'` (the pages set inline styles), scripts `'self' 'unsafe-inline' https://plausible.io`, connect to `self` and `https://plausible.io`, `frame-src 'none'`, `frame-ancestors 'none'`, `form-action 'self'`, `object-src 'none'`

Not in this proposal:

- No `Strict-Transport-Security` from the app. Do not add `preload` or `includeSubDomains`. Preload is a one-way public commitment and needs a separate subdomain inventory.
- No enforcing `Content-Security-Policy`.
- No `X-Frame-Options`. `frame-ancestors` is report-only until someone confirms the site is not embedded.
- No `Cross-Origin-Embedder-Policy` or `Cross-Origin-Opener-Policy`. Those can break future embeds and payment or login popups.

## Integrations this policy is written around

- Cal.com and mailto/tel are normal links, not iframes. `frame-src 'none'` does not affect them. A later embedded scheduler would need `frame-src` and possibly a looser Permissions-Policy.
- Plausible loads only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set, from `https://plausible.io/js/script.js`.
- Montserrat is self-hosted by `next/font`. No runtime Google Fonts request is required.
- Images and the Next image optimizer are same-origin. Staff QR codes use `data:` image URLs.
- The staff sign-in form posts to `/api/staff/login` on this origin. The Apps Script call is server-side and is not governed by the browser CSP.
- No chat widget, map, video, or payment frame is present.

## Review before any merge

1. Confirm no partner page, deck, or Cal.com setup iframes `performancerhythm.com`. Only then consider `X-Frame-Options: DENY` or an enforced `frame-ancestors 'none'`.
2. Read a Report-Only report from a real browser session, including a page load with Plausible enabled, before anyone flips the policy to enforcing.
3. Enforcing CSP will need a nonce or hash plan for Next.js inline scripts. Shipping `'unsafe-inline'` as an enforced script policy is weak; shipping a strict script policy without a nonce test can blank the site.
4. Do not submit the domain to the HSTS preload list from this change.
5. `access-control-allow-origin: *` on the HTML response comes from the platform, not this config. Decide separately whether that should stay.
