import type { Metadata } from "next";

const siteName = "Performance Rhythm";
const defaultDescription =
  "Performance Rhythm helps organizations strengthen the human capacity that drives resilience, leadership effectiveness, sustainable performance, growth, and long-term impact.";

export function pageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  index = true
}: {
  title: string;
  description?: string;
  path?: string;
  index?: boolean;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.performancerhythm.com";
  const url = `${siteUrl}${path}`;

  return {
    title: `${title} | ${siteName}`,
    description,
    robots: index ? undefined : { index: false, follow: false },
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type: "website",
      images: [
        {
          url: `${siteUrl}/brand/og-default.png`,
          width: 1200,
          height: 630,
          alt: "Performance Rhythm — Internal Balance. External Performance."
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
      images: [`${siteUrl}/brand/og-default.png`]
    }
  };
}
