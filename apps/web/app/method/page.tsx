import MethodPage from "@/components/marketing/MethodPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Method",
  path: "/method",
  description: "Learn the four-step Performance Rhythm Method: Notice, Reset, Strengthen, Repeat. Science-based practices for nervous system regulation and sustainable performance."
});

export default function Page() {
  return <MethodPage />;
}
