import { PerformanceSignal } from "./PerformanceSignal";

export function Submark({ className = "" }: { className?: string }) {
  return <PerformanceSignal className={className} color="#5E8AA8" />;
}
