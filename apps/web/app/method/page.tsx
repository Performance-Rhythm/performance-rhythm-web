import { PageHero, SimpleGrid, EditorialSection } from "@/components/marketing/PageBlocks";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Method", path: "/method" });

export default function MethodPage() {
  return (
    <>
      <PageHero
        eyebrow="The Method"
        title="Performance follows human capacity."
        intro="The Performance Rhythm Method helps organizations understand the internal conditions that influence behavior, communication, decision-making, resilience, and sustainable performance."
        cta={{ label: "Talk Through The Method", href: "/contact" }}
      />
      <SimpleGrid
        eyebrow="Human Operating System"
        title="State influences how people lead, communicate, recover, and perform."
        items={[
          { title: "Awareness", description: "Helping individuals recognize the internal conditions influencing behavior, focus, and communication." },
          { title: "Regulation", description: "Practical tools that support nervous system regulation, recovery, and clearer decision-making." },
          { title: "Resilience", description: "Building the ability to recover, adapt, and remain effective under pressure." },
          { title: "Sustainable Performance", description: "Strengthening the capacity required for consistent performance without chronic overload." }
        ]}
        columns="lg:grid-cols-4"
      />
      <EditorialSection title="Nervous system regulation is a mechanism, not the brand destination." eyebrow="Scientific, Not Spiritual" dark>
        <p>Performance Rhythm uses physiology, psychology, neuroscience, leadership science, and human performance science to help organizations understand practical pathways to resilience and sustainable performance.</p>
        <Button href="/research" className="mt-8">Explore Research</Button>
      </EditorialSection>
    </>
  );
}
