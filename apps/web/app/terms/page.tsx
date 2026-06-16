import { PageHero, EditorialSection } from "@/components/marketing/PageBlocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms", path: "/terms" });

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Terms of service placeholder." intro="Terms should be reviewed before publishing the production website or accepting inquiries through a functional form." />
      <EditorialSection title="Phase 1 scope">
        <p>This public website introduces Performance Rhythm, its programs, method, research direction, and contact path. Authenticated platform functionality belongs to later phases.</p>
      </EditorialSection>
    </>
  );
}
