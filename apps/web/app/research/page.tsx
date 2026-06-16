import { PageHero, SimpleGrid, EditorialSection } from "@/components/marketing/PageBlocks";
import { researchTopics } from "@/content/research";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Research", path: "/research" });

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Evidence-informed ideas for leadership, resilience, recovery, and performance."
        intro="Performance Rhythm uses research from stress physiology, burnout prevention, leadership science, breathwork, resilience, and human performance to keep the work grounded and practical."
      />
      <SimpleGrid
        eyebrow="Resource Areas"
        title="A future content hub for leaders building healthier high-performance organizations."
        items={researchTopics.map((topic) => ({ title: topic.title, description: `${topic.category}: ${topic.description}` }))}
        columns="lg:grid-cols-4"
      />
      <EditorialSection title="Research page note" eyebrow="Phase 1">
        <p>This Phase 1 page establishes the research hub structure. Full articles, citations, and downloadable guides can be expanded as the content library grows.</p>
      </EditorialSection>
    </>
  );
}
