import TermsPage from "@/components/marketing/TermsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Service",
  path: "/terms",
  description: "Performance Rhythm Terms of Service. Our conditions for using our website and services, workshops, and programs."
});

export default function Page() {
  return <TermsPage />;
}
