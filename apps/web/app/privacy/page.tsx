import PrivacyPage from "@/components/marketing/PrivacyPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  path: "/privacy",
  description: "Performance Rhythm Privacy Policy. Learn how we collect, use, and protect your personal information."
});

export default function Page() {
  return <PrivacyPage />;
}
