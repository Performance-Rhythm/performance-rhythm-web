import { PageHero, SimpleGrid, EditorialSection } from "@/components/marketing/PageBlocks";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { programs } from "@/content/programs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Programs", path: "/programs" });

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Practical experiences for resilience, leadership, and sustainable performance."
        intro="Performance Rhythm offers workshops, leadership programs, corporate programs, and future platform access designed to help organizations translate insight into practical change."
        cta={{ label: "Book A Discovery Conversation", href: "/contact" }}
      />
      <SimpleGrid
        eyebrow="Offerings"
        title="Designed for organizations that believe people drive performance."
        items={programs.map((program) => ({ title: program.title, description: program.description }))}
        columns="lg:grid-cols-4"
      />
      <Section id="founding-partners" background="neutral">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">Founding Partner Program</h2>
              <p className="mt-5 text-lg leading-8 text-muted">Performance Rhythm is partnering with a select group of organizations to validate, refine, and evolve a new approach to leadership development, resilience, and sustainable performance.</p>
              <Button href="/contact" className="mt-8">Start A Founding Partner Conversation</Button>
            </div>
            <Card>
              {['Preferred pricing', 'Direct access to the founders', 'Early access to future programs', 'Opportunities to influence future offerings', 'Long-term partnership opportunities'].map((item) => (
                <p key={item} className="border-b border-primary/10 py-4 font-bold last:border-0">{item}</p>
              ))}
            </Card>
          </div>
        </Container>
      </Section>
      <EditorialSection title="Transformation is not created by a single experience." eyebrow="Platform Preview">
        <p>Transformation is created through consistent practice. Future platform access will reinforce workshops through breathwork sessions, meditation content, educational trainings, learning paths, and company-specific content libraries.</p>
      </EditorialSection>
    </>
  );
}
