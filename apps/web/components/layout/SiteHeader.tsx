import { LogoHorizontal } from "@/components/brand/LogoHorizontal";
import { Button } from "@/components/ui/Button";
import { primaryNavigation, routes } from "@/lib/routes";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <LogoHorizontal className="flex items-center" />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          <Link href="/" className="text-sm font-bold text-primary/75 transition hover:text-primary">
            Home
          </Link>
          {primaryNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-bold text-primary/75 transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href={routes.bookDiscovery} size="sm">Book Discovery</Button>
        </div>
        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-full border border-primary/15 px-4 py-2 text-sm font-bold text-primary marker:hidden">
            Menu
          </summary>
          <div className="absolute right-0 mt-3 w-72 rounded-3xl border border-primary/10 bg-background p-4 shadow-medium">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              <Link href="/" className="rounded-2xl px-4 py-3 text-base font-bold text-primary hover:bg-neutral/60">
                Home
              </Link>
              {primaryNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-base font-bold text-primary hover:bg-neutral/60">
                  {item.label}
                </Link>
              ))}
              <Button href={routes.bookDiscovery} className="mt-3 w-full">Book Discovery</Button>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
