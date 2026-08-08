import AboutPage from "@/components/marketing/AboutPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  path: "/about",
  description: "Learn about Performance Rhythm: our mission to help organizations develop the human capacity that drives exceptional leadership, resilient cultures, and sustainable performance."
});

export default function Page() {
  return <AboutPage />;
}
