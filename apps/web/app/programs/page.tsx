import ProgramsPage from "@/components/marketing/ProgramsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Programs",
  path: "/programs",
  description: "Explore Performance Rhythm programs: Signature Workshops, Leadership Programs, Corporate Programs, and Subscription Platform. Build resilience and sustainable performance."
});

export default function Page() {
  return <ProgramsPage />;
}
