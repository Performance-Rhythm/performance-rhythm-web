import ProgramsPage from "@/components/marketing/ProgramsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Programs",
  path: "/programs",
  description: "Explore Performance Rhythm workshops, leadership programs, corporate programs, and practical reinforcement options for resilient, sustainable performance."
});

export default function Page() {
  return <ProgramsPage />;
}
