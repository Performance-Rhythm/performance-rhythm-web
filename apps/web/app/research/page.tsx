import ResearchPage from "@/components/marketing/ResearchPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research",
  path: "/research",
  description: "A curated evidence library on stress and cognition, burnout and work design, breathing, mindfulness, leadership, psychological safety, and current workforce research."
});

export default function Page() {
  return <ResearchPage />;
}
