import { PerformanceSignal } from "@/components/brand/PerformanceSignal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Input, Textarea } from "@/components/ui/FormField";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Discovery Conversation", path: "/contact" });

const publicEmail = "contact@performancerhythm.com";

const whatWeCover = [
  "What your organization is navigating",
  "Where stress, pressure, or capacity issues are showing up",
  "Which teams or leaders may benefit most",
  "Whether a workshop, program, or founding partner relationship makes sense",
  "What a practical next step could look like"
] as const;

const bestFit = [
  "Leadership Teams",
  "Customer Success Teams",
  "Customer Support Teams",
  "Sales Teams",
  "People Operations",
  "Healthcare Organizations",
  "Technology Companies"
] as const;

const whatThisIsNot = [
  "Not a high-pressure sales call",
  "Not a generic wellness conversation",
  "Not a clinical consultation",
  "Not a one-size-fits-all pitch"
] as const;

const discoveryFramework = [
  "Understanding your organization",
  "Identifying where capacity or resilience challenges are showing up",
  "Exploring fit for workshops, programs, or founding partner opportunities",
  "Identifying practical next steps"
] as const;

const interests = [
  "Signature Workshop",
  "Leadership Program",
  "Corporate Program",
  "Founding Partner Program",
  "Future Platform",
  "Not Sure Yet"
] as const;

export default function ContactPage() {
  return (
    <>
      <Section className="overflow-hidden pb-16 pt-20 sm:pt-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <Eyebrow>Discovery Conversation</Eyebrow>
            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight tracking-[-0.045em] text-primary sm:text-6xl">
              Let&apos;s explore whether Performance Rhythm is the right fit for your organization.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
              A discovery conversation is a focused, practical conversation about your organization’s goals, pressures, and opportunities to strengthen leadership, resilience, culture, and sustainable performance.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="/book" size="lg">Book A Discovery Conversation</Button>
              <Button href="#contact-form" variant="secondary" size="lg">Send A Note First</Button>
            </div>
          </div>
          <div className="relative min-h-80 rounded-[2rem] border border-primary/10 bg-white p-8 shadow-medium">
            <div className="absolute inset-6 rounded-[1.5rem] bg-neutral/60" />
            <div className="relative z-10">
              <div className="rounded-2xl bg-primary p-6 text-background shadow-subtle">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">30 Minute Conversation</p>
                <p className="mt-3 text-2xl font-bold leading-tight">Focused. Practical. Consultative. No pressure.</p>
              </div>
              <PerformanceSignal className="mt-10 w-full text-secondary" title="Performance Rhythm Signal" />
              <div className="mt-8 grid grid-cols-2 gap-3">
                {['Executive-friendly', 'Fit-focused', 'Practical next step', 'No obligation'].map((item) => (
                  <div key={item} className="rounded-2xl bg-background p-4 text-sm font-bold text-primary shadow-subtle">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-5">
            <ChecklistCard title="What We’ll Cover" items={whatWeCover} />
            <ChecklistCard title="Best Fit For" items={bestFit} />
            <ChecklistCard title="What This Is Not" items={whatThisIsNot} />
          </div>
          <div className="grid gap-6 lg:sticky lg:top-28">
            <Card className="border-accent/25 bg-neutral/45">
              <Eyebrow>Book</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-primary">Book A Discovery Conversation</h2>
              <p className="mt-4 text-sm leading-7 text-muted">Choose a time for a focused conversation about your organization’s goals and fit.</p>
              <Button href="mailto:contact@performancerhythm.com?subject=Discovery%20Conversation%20Request" className="mt-6">Book A Time</Button>
              <p className="mt-5 text-sm font-bold leading-6 text-primary/60">No pressure. No obligation. Just a practical conversation.</p>
              <p className="mt-4 rounded-2xl border border-primary/10 bg-background p-4 text-xs font-bold leading-6 text-muted">
                Phase 1 note: booking functionality will be connected before launch. For now, use {publicEmail}.
              </p>
            </Card>

            <div id="contact-form">
              <Card>
                <Eyebrow>Send A Note First</Eyebrow>
                <h2 className="mt-4 text-3xl font-bold leading-tight text-primary">Send A Note First</h2>
                <DiscoveryInquiryForm />
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="neutral">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <Eyebrow>Discovery Conversation Framework</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.035em] text-primary sm:text-5xl">A typical discovery conversation includes:</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {discoveryFramework.map((item, index) => (
                <Card key={item} className="bg-background">
                  <span className="text-sm font-bold text-accent">0{index + 1}</span>
                  <p className="mt-4 font-bold leading-7 text-primary">{item}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="rounded-[2rem] border border-primary/10 bg-primary p-8 text-background shadow-medium sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div>
              <Eyebrow className="text-accent">Prefer Email?</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">Reach out directly.</h2>
              <p className="mt-4 max-w-2xl text-sm font-bold leading-7 text-background/70">Use the public email below if you prefer to start the conversation outside the form.</p>
            </div>
            <Button href={`mailto:${publicEmail}`} variant="secondary" size="lg" className="mt-8 border-background/30 text-background hover:bg-background/10 lg:mt-0">
              {publicEmail}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ChecklistCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl bg-neutral/45 px-4 py-3 text-sm font-bold leading-6 text-primary">
            <span className="text-accent">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function DiscoveryInquiryForm() {
  return (
    <form className="mt-6 grid gap-5" aria-label="Discovery conversation inquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="name" label="Name *" name="name" autoComplete="name" required />
        <Input id="email" label="Work Email *" name="email" type="email" autoComplete="email" required />
      </div>
      <Input id="company" label="Company *" name="company" autoComplete="organization" required />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="role" label="Role" name="role" autoComplete="organization-title" />
        <Input id="organization-size" label="Organization Size" name="organizationSize" />
      </div>
      <label className="block text-sm font-bold text-primary" htmlFor="interest">
        Interest *
        <select
          id="interest"
          name="interest"
          required
          defaultValue=""
          className="mt-2 w-full rounded-2xl border border-primary/10 bg-background px-4 py-3 font-normal text-primary outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
        >
          <option value="" disabled>Select one</option>
          {interests.map((interest) => <option key={interest} value={interest}>{interest}</option>)}
        </select>
      </label>
      <Textarea id="message" label="What should we know?" name="message" />
      <label className="flex gap-3 rounded-2xl bg-neutral/45 p-4 text-sm font-bold leading-6 text-primary">
        <input className="mt-1 h-4 w-4 accent-[#D97742]" type="checkbox" name="consent" required />
        <span>I understand Performance Rhythm will use this information to respond to my inquiry.</span>
      </label>
      <p className="rounded-2xl border border-primary/10 bg-background p-4 text-xs font-bold leading-6 text-muted">
        Phase 1 form UI only. Submission handling will be connected before launch. Until then, please use {publicEmail}.
      </p>
      <button
        type="button"
        aria-disabled="true"
        className="cursor-not-allowed rounded-full bg-accent/70 px-6 py-4 font-bold text-white transition"
      >
        Send Message
      </button>
    </form>
  );
}
