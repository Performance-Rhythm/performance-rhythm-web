import ProgramsPage from "@/components/marketing/ProgramsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs | Performance Rhythm",
  description: "Explore Performance Rhythm programs: Signature Workshops, Leadership Programs, Corporate Programs, and Subscription Platform. Build resilience and sustainable performance."
};

export default function Page() {
  return <ProgramsPage />;
}
