import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.performancerhythm.com"),
  title: "Performance Rhythm | Human Capacity Development",
  description:
    "Performance Rhythm helps organizations strengthen the human capacity that drives resilience, leadership effectiveness, sustainable performance, growth, and long-term impact."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-white">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
