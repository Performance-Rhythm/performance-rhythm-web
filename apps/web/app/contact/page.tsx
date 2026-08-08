import ContactPage from "@/components/marketing/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Discovery Conversation",
  path: "/contact",
  description: "Book a discovery conversation with Performance Rhythm to explore how we can help your organization develop human capacity, resilience, and sustainable performance."
});

export default function Page() {
  return <ContactPage />;
}
