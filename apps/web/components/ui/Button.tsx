import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-subtle hover:bg-secondary focus-visible:ring-accent",
  secondary: "border border-primary/20 bg-transparent text-primary hover:border-primary hover:bg-neutral/45 focus-visible:ring-primary",
  text: "text-primary underline decoration-accent/40 underline-offset-8 hover:text-accent focus-visible:ring-accent"
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm sm:text-base",
  lg: "px-7 py-4 text-base sm:text-lg"
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = ""
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
