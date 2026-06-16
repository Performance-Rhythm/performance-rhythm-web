import Link from "next/link";
import { PerformanceSignal } from "./PerformanceSignal";

export function LogoHorizontal({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 font-bold text-primary ${className}`} aria-label="Performance Rhythm home">
      <PerformanceSignal className="h-8 w-20 text-secondary" />
      <span className="text-base tracking-[-0.02em] sm:text-lg">Performance Rhythm</span>
    </Link>
  );
}
