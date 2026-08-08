export const routes = {
  home: "/",
  about: "/about",
  programs: "/programs",
  method: "/method",
  research: "/research",
  contact: "/contact",
  login: "/login",
  dashboard: "/dashboard",
  privacy: "/privacy",
  terms: "/terms",
  bookDiscovery: "https://cal.com/shane-curtis/30min",
  bookFoundingPartner: "https://cal.com/shane-curtis/founding-partner"
} as const;

export const primaryNavigation = [
  { label: "Method", href: routes.method },
  { label: "Programs", href: routes.programs },
  { label: "Research", href: routes.research },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact }
] as const;
