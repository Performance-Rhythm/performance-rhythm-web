export function PerformanceSignal({
  className = "",
  color = "currentColor",
  accent = "#D97742",
  animated = false,
  title
}: {
  className?: string;
  color?: string;
  accent?: string;
  animated?: boolean;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 420 128"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M12 72H116C126 72 132 63 139 50L151 28C156 18 169 18 174 28L198 78C203 89 218 89 224 78L239 50C245 39 261 40 266 52L278 80C283 91 297 94 306 85L328 63C335 56 344 52 354 52H408"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "[stroke-dasharray:600] [stroke-dashoffset:600] motion-safe:animate-[draw_1.8s_ease-out_forwards]" : undefined}
      />
      <path d="M264 52L278 80" stroke={accent} strokeWidth="10" strokeLinecap="round" />
      <style>{`@keyframes draw { to { stroke-dashoffset: 0; } }`}</style>
    </svg>
  );
}
