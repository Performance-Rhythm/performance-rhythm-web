import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, cta }: { eyebrow: string; title: string; intro: string; cta?: { label: string; href: string } }) {
  return (
    <Section className="pt-20 sm:pt-28">
      <Container className="max-w-5xl text-center">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.045em] text-primary sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">{intro}</p>
        {cta ? <Button href={cta.href} size="lg" className="mt-9">{cta.label}</Button> : null}
      </Container>
    </Section>
  );
}

export function SimpleGrid({
  eyebrow,
  title,
  intro,
  items,
  columns = "lg:grid-cols-3"
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: ReadonlyArray<{ title: string; description: string }>;
  columns?: string;
}) {
  return (
    <Section background="white">
      <Container>
        <SectionIntro eyebrow={eyebrow} title={title} intro={intro} />
        <div className={`mt-12 grid gap-5 md:grid-cols-2 ${columns}`}>
          {items.map((item) => (
            <Card key={item.title}>
              <h2 className="text-2xl font-bold text-primary">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function EditorialSection({ eyebrow, title, children, dark = false }: { eyebrow?: string; title: string; children: ReactNode; dark?: boolean }) {
  return (
    <Section background={dark ? "primary" : "neutral"}>
      <Container className="max-w-4xl text-center">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className={`mt-4 text-3xl font-bold leading-tight sm:text-5xl ${dark ? "text-background" : "text-primary"}`}>{title}</h2>
        <div className={`mx-auto mt-6 max-w-3xl text-lg leading-8 ${dark ? "text-background/75" : "text-muted"}`}>{children}</div>
      </Container>
    </Section>
  );
}
