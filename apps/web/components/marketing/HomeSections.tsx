import { PerformanceSignal } from "@/components/brand/PerformanceSignal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { homepage } from "@/content/homepage";
import { routes } from "@/lib/routes";
import type { ReactNode } from "react";

export function HeroSection() {
  const hero = homepage.hero;
  return (
    <Section className="overflow-hidden pb-20 pt-20 sm:pt-28 lg:pt-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.055em] text-primary sm:text-5xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{hero.subheadline}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg">{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">{hero.secondaryCta.label}</Button>
          </div>
          <p className="mt-6 max-w-xl text-sm font-bold leading-6 text-primary/55">
            Built for leadership teams, managers, and organizations pursuing sustainable performance.
          </p>
        </div>
        <div className="relative min-h-72 rounded-[2rem] border border-primary/10 bg-white/60 p-8 shadow-medium lg:min-h-[34rem]">
          <div className="absolute inset-6 rounded-[1.5rem] bg-gradient-to-br from-neutral/70 to-background" />
          <PerformanceSignal className="relative z-10 mt-20 w-full text-secondary" animated title="Performance Rhythm ECG / Performance Signal" />
          <div className="relative z-10 mt-12 grid gap-4 sm:grid-cols-3">
            {['Systems', 'Human Capacity', 'Sustainable Performance'].map((item) => (
              <div key={item} className="rounded-2xl border border-primary/10 bg-background/80 p-4 text-sm font-bold text-primary shadow-subtle">{item}</div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function HiddenCostSection() {
  const section = homepage.hiddenCost;
  return (
    <Section background="neutral">
      <Container>
        <SectionIntro eyebrow="Challenge" title={section.headline} intro={section.intro} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {section.costs.map(([title, description]) => (
            <Card key={title}>
              <div className="h-1 w-12 rounded-full bg-accent" />
              <h3 className="mt-5 text-xl font-bold text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function SystemsSection() {
  const section = homepage.systems;
  return (
    <Section background="white">
      <Container>
        <SectionIntro eyebrow="Human Capacity" title={section.headline} intro={section.intro} />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Card className="h-full border-primary/15 bg-white p-8">
            <h3 className="text-3xl font-bold tracking-[-0.03em]">{section.optimizedTitle}</h3>
            <ul className="mt-8 grid gap-4">
              {section.optimized.map((item) => <li className="rounded-2xl bg-neutral/55 px-5 py-4 text-lg font-bold" key={item}>{item}</li>)}
            </ul>
          </Card>
          <div className="hidden flex-col items-center gap-4 lg:flex">
            <PerformanceSignal className="h-20 w-44 rotate-90 text-secondary" />
            <span className="rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white">Missing Layer</span>
          </div>
          <Card className="h-full border-accent/30 bg-background p-8 shadow-medium">
            <h3 className="text-3xl font-bold tracking-[-0.03em]">{section.ignoredTitle}</h3>
            <ul className="mt-8 grid gap-4">
              {section.ignored.map((item) => <li className="rounded-2xl bg-white px-5 py-4 text-lg font-bold text-primary shadow-subtle" key={item}>{item}</li>)}
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export function HumanOperatingSystemSection() {
  const section = homepage.hos;
  return (
    <Section>
      <Container>
        <SectionIntro eyebrow="Human Operating System" title={section.headline} intro={section.intro} />
        <div className="mt-14 rounded-[2rem] border border-primary/10 bg-white p-5 shadow-medium sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.15fr_0.95fr] lg:items-center">
            <FlowColumn title="What Teams Face" tone="neutral" items={section.inputs} />
            <HumanCapacityDiagram factors={section.factors} />
            <FlowColumn title="What Improves" tone="output" items={section.outputs} />
          </div>
          <div className="mx-auto mt-8 max-w-3xl rounded-[1.5rem] border border-secondary/20 bg-background p-6 text-center text-sm font-bold leading-7 text-muted">
            {section.note}
          </div>
        </div>
        <div className="mt-8 text-center">
          <Button href={routes.method} variant="secondary">Explore The Method</Button>
        </div>
      </Container>
    </Section>
  );
}

function FlowColumn({ title, items, tone }: { title: string; items: readonly string[]; tone: "neutral" | "output" }) {
  return (
    <div className="rounded-[1.75rem] border border-primary/10 bg-background p-5">
      <h3 className="text-2xl font-bold text-primary">{title}</h3>
      <div className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-subtle">
            <span className={`h-3 w-3 shrink-0 rounded-full ${tone === "output" ? "bg-secondary" : index === 0 ? "bg-accent" : "bg-support"}`} />
            <span className="text-sm font-bold text-primary">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HumanCapacityDiagram({ factors }: { factors: readonly string[] }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-primary p-6 text-background shadow-medium sm:p-8">
      <div className="absolute inset-x-6 top-1/2 hidden h-px bg-background/15 lg:block" />
      <div className="absolute left-8 right-8 top-8 h-24 rounded-full border border-background/10" />
      <div className="relative mx-auto flex min-h-[22rem] max-w-md flex-col items-center justify-center">
        <div className="absolute inset-8 rounded-full border border-background/10" />
        <div className="absolute inset-16 rounded-full border border-secondary/25" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-background/10" />
        <div className="absolute bottom-0 top-0 left-1/2 w-px bg-background/10" />
        <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full border border-accent/40 bg-background text-center text-primary shadow-medium">
          <span className="px-4 text-lg font-bold leading-6">Human Capacity</span>
        </div>
        <PerformanceSignal className="absolute left-1/2 top-1/2 z-0 w-[21rem] -translate-x-1/2 -translate-y-1/2 text-secondary/65" />
        <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2 rounded-full bg-background px-4 py-2 text-xs font-bold text-primary shadow-subtle">{factors[0]}</div>
        <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-white shadow-subtle">{factors[1]}</div>
        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-background px-4 py-2 text-xs font-bold text-primary shadow-subtle">{factors[2]}</div>
        <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white shadow-subtle">{factors[3]}</div>
      </div>
      <p className="relative z-10 mt-5 text-center text-xl font-bold leading-7">Capacity determines how pressure becomes behavior.</p>
    </div>
  );
}

export function DifferenceSection() {
  const section = homepage.difference;
  return (
    <Section background="white">
      <Container>
        <SectionIntro eyebrow="Difference" title={section.headline} intro={section.intro} />
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {section.cards.map(([title, description], index) => (
            <Card key={title} className={index === 3 ? "border-accent/30 bg-neutral/45" : ""}>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}


export function TrustSection() {
  const section = homepage.trust;
  return (
    <Section background="white">
      <Container>
        <SectionIntro eyebrow="Trust" title={section.headline} intro={section.intro} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {section.cards.map(([title, description]) => (
            <Card key={title} className="relative overflow-hidden">
              <div className="absolute left-0 top-0 h-1 w-full bg-secondary" />
              <h3 className="mt-3 text-xl font-bold text-primary">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ResearchCredibilitySection() {
  const section = homepage.researchCredibility;
  return (
    <Section background="neutral">
      <Container>
        <SectionIntro eyebrow="Research Credibility" title={section.headline} intro={section.intro} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {section.cards.map(([title, description], index) => (
            <ResearchCard key={title} title={title} description={description} index={index} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={section.cta.href} variant="secondary">{section.cta.label}</Button>
        </div>
      </Container>
    </Section>
  );
}

function ResearchCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <Card className="overflow-hidden bg-background p-0">
      <ResearchVisual index={index} />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
      </div>
    </Card>
  );
}

function ResearchVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="relative h-36 overflow-hidden bg-white p-5">
        <div className="absolute inset-x-5 top-1/2 h-px bg-primary/10" />
        <PerformanceSignal className="absolute left-5 right-5 top-8 h-20 w-[calc(100%-2.5rem)] text-secondary" />
        <div className="absolute right-12 top-12 h-5 w-5 rounded-full border-4 border-background bg-accent shadow-subtle" />
        <div className="absolute bottom-5 left-5 rounded-full bg-neutral px-3 py-1 text-xs font-bold text-primary">Attention</div>
        <div className="absolute bottom-5 right-5 rounded-full bg-neutral px-3 py-1 text-xs font-bold text-primary">Recovery</div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative h-36 overflow-hidden bg-white p-5">
        <div className="grid h-full grid-cols-5 items-end gap-3">
          {[62, 78, 84, 48, 70].map((height, i) => (
            <div key={i} className="rounded-t-2xl bg-support/45" style={{ height: `${height}%` }}>
              <div className={`${i === 3 ? 'bg-accent' : 'bg-secondary'} h-2 rounded-full`} />
            </div>
          ))}
        </div>
        <div className="absolute left-5 top-5 rounded-full bg-neutral px-3 py-1 text-xs font-bold text-primary">Demand</div>
        <div className="absolute right-5 top-5 rounded-full bg-background px-3 py-1 text-xs font-bold text-primary shadow-subtle">Recovery</div>
      </div>
    );
  }
  return (
    <div className="relative h-36 overflow-hidden bg-white p-5">
      <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary text-background shadow-medium">
        <span className="flex h-full items-center justify-center text-xs font-bold">Leader</span>
      </div>
      {[
        ['Trust', 'left-5 top-6'],
        ['Judgment', 'right-5 top-6'],
        ['Culture', 'left-8 bottom-6'],
        ['Communication', 'right-8 bottom-6']
      ].map(([label, pos]) => (
        <div key={label} className={`absolute ${pos} rounded-full bg-neutral px-3 py-2 text-xs font-bold text-primary shadow-subtle`}>{label}</div>
      ))}
      <div className="absolute left-[28%] top-[31%] h-px w-20 rotate-[18deg] bg-secondary/40" />
      <div className="absolute right-[28%] top-[31%] h-px w-20 -rotate-[18deg] bg-secondary/40" />
      <div className="absolute bottom-[33%] left-[29%] h-px w-20 -rotate-[22deg] bg-secondary/40" />
      <div className="absolute bottom-[33%] right-[29%] h-px w-20 rotate-[22deg] bg-secondary/40" />
    </div>
  );
}

export function AudienceSection() {
  const section = homepage.audience;
  return (
    <Section>
      <Container>
        <SectionIntro eyebrow="Who We Work With" title={section.headline} intro={section.intro} />
        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
          {section.groups.map((group) => (
            <div key={group} className="rounded-full border border-primary/10 bg-white px-5 py-3 text-sm font-bold text-primary shadow-subtle sm:text-base">
              {group}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function ProgramsPreviewSection() {
  const section = homepage.programs;
  return (
    <Section>
      <Container>
        <SectionIntro eyebrow="Programs" title={section.headline} intro={section.intro} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {section.cards.map(([title, description]) => (
            <Card key={title}>
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href={routes.programs}>Explore Programs</Button>
          <Button href="#founding-partners" variant="secondary">Learn About Founding Partners</Button>
        </div>
      </Container>
    </Section>
  );
}

export function PlatformPreviewSection() {
  const section = homepage.platform;
  return (
    <Section background="white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.04em] text-primary sm:text-5xl">{section.headline}</h2>
            <p className="mt-6 text-lg leading-8 text-muted">{section.intro}</p>
            <div className="mt-8 rounded-[1.5rem] border border-primary/10 bg-neutral/50 p-5 text-sm font-bold leading-7 text-primary">
              {section.disclaimer}
            </div>
          </div>
          <div className="grid gap-5 xl:grid-cols-2">
            <ContentLibraryMockup />
            <LearningPathMockup />
            <ManagerInsightsMockup />
            <CompanyDashboardMockup />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function MockupShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[1.75rem] border border-primary/10 bg-background p-4 shadow-medium">
      <div className="rounded-[1.35rem] border border-primary/10 bg-white p-4">
        <div className="flex items-center justify-between gap-4 border-b border-primary/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-accent" />
            <span className="h-3 w-3 rounded-full bg-support" />
            <span className="h-3 w-3 rounded-full bg-secondary" />
          </div>
          <span className="rounded-full bg-secondary/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">Preview</span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
}

function ContentLibraryMockup() {
  const library = homepage.platform.contentLibrary;
  return (
    <MockupShell title={library.title}>
      <div className="rounded-2xl border border-primary/10 bg-background px-4 py-3 text-sm font-bold text-primary/55">Search: resilience, leadership, recovery</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {library.categories.map((category, index) => <span key={category} className={`${index === 0 ? 'bg-primary text-background' : 'bg-neutral text-primary'} rounded-full px-3 py-1 text-xs font-bold`}>{category}</span>)}
      </div>
      <div className="mt-5 grid gap-3">
        {library.items.map(([title, meta], index) => (
          <div key={title} className="grid grid-cols-[auto_1fr] gap-3 rounded-2xl bg-background p-3">
            <span className={`${index === 1 ? 'bg-accent' : 'bg-secondary'} mt-1 h-9 w-9 rounded-xl`} />
            <div>
              <p className="text-sm font-bold text-primary">{title}</p>
              <p className="mt-1 text-xs font-bold text-muted">{meta}</p>
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

function LearningPathMockup() {
  const path = homepage.platform.learningPath;
  return (
    <MockupShell title={path.title}>
      <p className="text-sm font-bold text-muted">{path.subtitle}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-support/30">
        <div className="h-full w-2/5 rounded-full bg-secondary" />
      </div>
      <div className="relative mt-5 grid gap-3 pl-5">
        <div className="absolute bottom-5 left-[1.93rem] top-5 w-px bg-support/50" />
        {path.steps.map((step, index) => (
          <div key={step} className="relative grid grid-cols-[auto_1fr] gap-3 rounded-2xl bg-background p-3">
            <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${index < 2 ? 'bg-secondary text-white' : 'bg-neutral text-primary'}`}>0{index + 1}</span>
            <div>
              <p className="text-sm font-bold leading-6 text-primary">{step}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-support/25">
                <div className={`${index < 2 ? 'w-full bg-secondary' : index === 2 ? 'w-1/3 bg-accent' : 'w-0 bg-secondary'} h-full rounded-full`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

function ManagerInsightsMockup() {
  const insights = homepage.platform.managerInsights;
  return (
    <MockupShell title={insights.title}>
      <p className="text-sm font-bold text-muted">Team: {insights.team}</p>
      <div className="mt-5 grid gap-4">
        {insights.stats.map(([label, value], index) => (
          <div key={label} className="rounded-2xl bg-background p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold text-muted">{label}</span>
              <span className="text-lg font-bold text-primary">{value}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-support/25">
              <div className={`${index === 0 ? 'w-3/4 bg-secondary' : index === 1 ? 'w-3/5 bg-accent' : 'w-5/6 bg-secondary'} h-full rounded-full`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-accent/20 bg-neutral/70 p-4 text-xs font-bold leading-6 text-primary">{insights.note}</div>
    </MockupShell>
  );
}

function CompanyDashboardMockup() {
  const dashboard = homepage.platform.companyDashboard;
  return (
    <MockupShell title={dashboard.title}>
      <div className="grid grid-cols-3 gap-3">
        {dashboard.stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-background p-3 text-center">
            <p className="text-xl font-bold text-primary">{value}</p>
            <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.08em] text-muted">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-primary p-4 text-background">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Current Focus</p>
        <p className="mt-2 font-bold">{dashboard.focus}</p>
        <PerformanceSignal className="mt-4 w-full text-secondary" />
      </div>
      <div className="mt-5 grid gap-3">
        {['Leadership Resilience Path', 'Customer Success Team', 'Organization Signals'].map((item, index) => (
          <div key={item} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-full bg-background px-4 py-2 text-sm font-bold text-primary">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span>{item}</span>
            <span className="text-xs text-muted">0{index + 1}</span>
          </div>
        ))}
      </div>
    </MockupShell>
  );
}

export function OutcomesSection() {
  const section = homepage.outcomes;
  return (
    <Section background="neutral">
      <Container>
        <SectionIntro eyebrow="Organizational Impact" title={section.headline} intro={section.intro} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {section.cards.map(([title, description], index) => (
            <Card key={title}>
              <span className="text-sm font-bold text-accent">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function FoundingPartnerSection() {
  const section = homepage.foundingPartners;
  return (
    <Section id="founding-partners" background="white">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-accent/20 bg-neutral p-8 shadow-medium sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-14">
          <div>
            <Eyebrow>Founding Partner Program · Limited Early Partnerships</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{section.headline}</h2>
            <p className="mt-6 text-lg leading-8 text-muted">{section.intro}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href="/programs#founding-partners">Explore Founding Partners</Button>
              <Button href={routes.contact} variant="secondary">Book Discovery</Button>
            </div>
          </div>
          <div className="grid gap-3">
            {section.benefits.map((benefit) => <div key={benefit} className="rounded-2xl bg-background px-5 py-4 font-bold text-primary shadow-subtle">{benefit}</div>)}
            <div className="rounded-2xl bg-primary px-5 py-4 font-bold text-background shadow-subtle">Select organizations only during the founding partner phase.</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function AboutPreviewSection() {
  const section = homepage.about;
  return (
    <Section>
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white p-8 shadow-medium">
          <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-secondary/25" />
          <div className="absolute right-12 top-12 h-16 w-16 rounded-full border border-accent/25" />
          <div className="relative">
            <div className="flex items-end gap-4">
              <span className="text-7xl font-bold tracking-[-0.08em] text-secondary">17+</span>
              <span className="pb-3 text-lg font-bold text-primary">Years Leading Teams</span>
            </div>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-muted">Healthcare Technology Leadership</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Sales', 'Marketing', 'Customer Success', 'Support', 'Implementation'].map((item, index) => (
                <div key={item} className={`${index === 2 ? 'sm:col-span-2' : ''} rounded-2xl bg-neutral p-4 font-bold text-primary`}>
                  <span className="mr-2 text-accent">0{index + 1}</span>{item}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-primary p-5 text-background">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Repeated Pattern</p>
              <p className="mt-2 text-sm font-bold leading-6">Stress was undermining talented people.</p>
            </div>
            <PerformanceSignal className="mt-10 w-full text-secondary" />
          </div>
        </div>
        <div>
          <Eyebrow>Founder Story</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{section.headline}</h2>
          <p className="mt-6 text-lg leading-8 text-muted">{section.intro}</p>
          <ul className="mt-6 grid gap-3">
            {section.points.map((point) => <li key={point} className="font-bold text-primary">• {point}</li>)}
          </ul>
          <Button href={routes.about} variant="secondary" className="mt-8">Meet The Founder</Button>
        </div>
      </Container>
    </Section>
  );
}

export function FinalCtaSection() {
  const section = homepage.finalCta;
  return (
    <Section background="primary">
      <Container className="text-center">
        <Eyebrow>Next Step</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight text-background sm:text-6xl">{section.headline}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-background/75">{section.intro}</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm font-bold leading-7 text-support">{section.reassurance}</p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href={routes.contact} size="lg">Book A Discovery Conversation</Button>
          <Button href={routes.programs} variant="secondary" size="lg" className="border-background/30 text-background hover:bg-background/10">Explore Programs</Button>
        </div>
      </Container>
    </Section>
  );
}
