import { PerformanceSignal } from "@/components/brand/PerformanceSignal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";

export const metadata = pageMetadata({ title: "Thank You", path: "/thank-you", index: false });

const nextSteps = [
  "We review your goals and context.",
  "We identify the most relevant next step.",
  "We follow up to continue the conversation."
] as const;

export default function ThankYouPage() {
  return (
    <>
      <Section className="overflow-hidden pt-20 sm:pt-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>Thank You</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.045em] text-primary sm:text-6xl">Thank You</h1>
            <div className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              <p>Thanks for reaching out to Performance Rhythm.</p>
              <p className="mt-3">We’ll review your note and follow up with a practical next step.</p>
            </div>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href={routes.home} size="lg">Return Home</Button>
              <Button href={routes.method} variant="secondary" size="lg">Explore The Method</Button>
            </div>
          </div>
          <div className="relative rounded-[2rem] border border-primary/10 bg-white p-8 shadow-medium">
            <div className="absolute inset-6 rounded-[1.5rem] bg-neutral/55" />
            <PerformanceSignal className="relative z-10 mt-12 w-full text-secondary" title="Performance Rhythm Signal" />
            <div className="relative z-10 mt-10 rounded-2xl bg-background p-5 text-sm font-bold leading-7 text-primary shadow-subtle">
              Focused. Practical. Consultative. No pressure.
            </div>
          </div>
        </Container>
      </Section>
      <Section background="white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Eyebrow>What Happens Next</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-primary sm:text-5xl">What Happens Next</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {nextSteps.map((step, index) => (
                <Card key={step}>
                  <span className="text-sm font-bold text-accent">0{index + 1}</span>
                  <p className="mt-4 font-bold leading-7 text-primary">{step}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
