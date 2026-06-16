import { LogoHorizontal } from "@/components/brand/LogoHorizontal";
import { primaryNavigation, routes } from "@/lib/routes";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-neutral/60 py-14 text-primary">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
        <div>
          <LogoHorizontal />
          <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
            Performance Rhythm helps organizations develop the human capacity that drives exceptional leadership, resilient cultures, sustainable performance, meaningful growth, and long-term impact.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Explore</h2>
          <div className="mt-4 grid gap-3 text-sm font-bold text-primary/75">
            {primaryNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Platform</h2>
          <div className="mt-4 grid gap-3 text-sm font-bold text-primary/75">
            <Link href={routes.login}>Login — Coming Soon</Link>
            <Link href={routes.dashboard}>Dashboard — Coming Soon</Link>
            <Link href={routes.privacy}>Privacy</Link>
            <Link href={routes.terms}>Terms</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-5 text-xs text-muted sm:px-8 lg:px-10">© {new Date().getFullYear()} Performance Rhythm. Internal Balance. External Performance.</div>
    </footer>
  );
}
