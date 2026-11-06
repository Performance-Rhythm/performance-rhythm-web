import type { NextConfig } from "next";

/**
 * WEB-11 proposal. Report-Only CSP does not block. HSTS is not set here:
 * Vercel already sends max-age without preload, and this proposal does not
 * add includeSubDomains or preload.
 */
const contentSecurityPolicyReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://plausible.io",
  "connect-src 'self' https://plausible.io",
  "frame-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:"
].join("; ");

const proposedSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()"
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: contentSecurityPolicyReportOnly
  }
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: proposedSecurityHeaders }];
  }
};

export default nextConfig;
