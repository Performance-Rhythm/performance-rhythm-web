import { PageHero } from "@/components/marketing/PageBlocks";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Dashboard Coming Soon", path: "/dashboard" });

export default function DashboardPage() {
  return (
    <>
      <PageHero eyebrow="Future Platform" title="The Performance Rhythm dashboard is planned for a future platform release." intro="Phase 1 is focused on the public website and Founding Partner conversations. Future releases will support company portals, content libraries, assignments, progress, and role-based access." />
      <Section background="white">
        <Container className="text-center">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/programs">Explore Programs</Button>
            <Button href="/contact" variant="secondary">Book Discovery</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
