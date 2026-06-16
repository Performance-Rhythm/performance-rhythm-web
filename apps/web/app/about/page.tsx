import { PageHero, SimpleGrid, EditorialSection } from "@/components/marketing/PageBlocks";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About", path: "/about" });

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Performance Rhythm"
        title="Helping organizations understand the people behind performance."
        intro="Performance Rhythm exists to help organizations create environments where people can perform, lead, grow, and thrive—professionally and personally—while driving exceptional organizational performance, growth, and impact."
        cta={{ label: "Book A Discovery Conversation", href: "/contact" }}
      />
      <Section background="white">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Founder Story</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">Built from real organizational pressure.</h2>
          </div>
          <div className="text-lg leading-8 text-muted">
            <p>Shane Curtis spent more than 17 years leading teams in healthcare technology across sales, marketing, customer success, customer service, and implementation.</p>
            <p className="mt-5">He saw talented employees and leaders struggle not because they lacked skill, intelligence, or motivation, but because chronic stress was quietly undermining their capacity to perform, communicate, lead, and thrive.</p>
          </div>
        </Container>
      </Section>
      <SimpleGrid
        eyebrow="Brand Principles"
        title="Human, scientific, grounded, and built for sustainable performance."
        items={[
          { title: "Human Centered", description: "People do not leave their humanity at the office door. Work influences life, and life influences work." },
          { title: "Scientifically Credible", description: "We explain performance through physiology, psychology, neuroscience, leadership, and human performance science." },
          { title: "Long-Term Performance", description: "The goal is not less ambition. The goal is performance and growth that can be sustained." }
        ]}
      />
      <EditorialSection eyebrow="Core Belief" title="Human flourishing and organizational success reinforce one another." dark>
        <p>Organizations achieve their greatest performance, growth, and impact when their people thrive—professionally, personally, and collectively.</p>
        <Button href="/programs" className="mt-8">Explore Programs</Button>
      </EditorialSection>
    </>
  );
}
