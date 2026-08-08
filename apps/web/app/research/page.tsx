import ResearchPage from "@/components/marketing/ResearchPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Research",
  path: "/research",
  description: "Science-backed research on stress, burnout, breathwork, meditation, leadership, and workplace wellness programs. Evidence-informed insights for organizational performance."
});

export default function Page() {
  return <ResearchPage />;
}
