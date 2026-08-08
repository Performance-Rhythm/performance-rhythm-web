import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-[#D97742] text-white shadow-md hover:bg-[#5E8AA8] hover:shadow-lg focus-visible:ring-[#D97742]",
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
  const isExternal = href.startsWith("http") || href.startsWith("//") || href.includes("cal.com") || href.includes("calendly");
  const buttonClass = `inline-flex items-center justify-center rounded-full font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link
      href={href}
      className={buttonClass}
    >
      {children}
    </Link>
  );
}
