import type { ReactNode } from "react";

type Background = "default" | "white" | "neutral" | "primary";

const backgrounds: Record<Background, string> = {
  default: "bg-background text-primary",
  white: "bg-white text-primary",
  neutral: "bg-neutral text-primary",
  primary: "bg-primary text-background"
};

export function Section({
  children,
  id,
  background = "default",
  className = ""
}: {
  children: ReactNode;
  id?: string;
  background?: Background;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 lg:py-32 ${backgrounds[background]} ${className}`}>
      {children}
    </section>
  );
}
