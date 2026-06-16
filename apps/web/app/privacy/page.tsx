import { PageHero, EditorialSection } from "@/components/marketing/PageBlocks";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy policy placeholder." intro="Phase 1 privacy language should be reviewed before launch, especially before functional forms or analytics are enabled." />
      <EditorialSection title="Privacy-first implementation">
        <p>Phase 1 uses Plausible only for lightweight, privacy-friendly website analytics. No authentication, company portal data, assignments, or progress tracking are implemented in this phase.</p>
      </EditorialSection>
    </>
  );
}
