import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.5rem] border border-primary/10 bg-white/70 p-6 shadow-subtle ${className}`}>
      {children}
    </div>
  );
}
