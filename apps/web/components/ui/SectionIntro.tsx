import { Eyebrow } from "./Eyebrow";

export function SectionIntro({
  eyebrow,
  title,
  intro,
  align = "center",
  className = ""
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">{title}</h2>
      {intro ? <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{intro}</p> : null}
    </div>
  );
}
