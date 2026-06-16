import {
  AboutPreviewSection,
  AudienceSection,
  DifferenceSection,
  FinalCtaSection,
  FoundingPartnerSection,
  HeroSection,
  HiddenCostSection,
  HumanOperatingSystemSection,
  OutcomesSection,
  PlatformPreviewSection,
  ProgramsPreviewSection,
  ResearchCredibilitySection,
  SystemsSection,
  TrustSection
} from "@/components/marketing/HomeSections";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Human Capacity Development & Sustainable Performance",
  path: "/"
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HiddenCostSection />
      <SystemsSection />
      <HumanOperatingSystemSection />
      <DifferenceSection />
      <TrustSection />
      <OutcomesSection />
      <ResearchCredibilitySection />
      <AudienceSection />
      <ProgramsPreviewSection />
      <PlatformPreviewSection />
      <AboutPreviewSection />
      <FoundingPartnerSection />
      <FinalCtaSection />
    </>
  );
}
