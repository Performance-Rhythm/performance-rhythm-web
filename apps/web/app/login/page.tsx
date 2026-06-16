import { PageHero } from "@/components/marketing/PageBlocks";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Login Coming Soon", path: "/login" });

export default function LoginPage() {
  return (
    <>
      <PageHero eyebrow="Platform Reserved" title="Login access is coming in a future release." intro="Performance Rhythm is currently building the platform foundation for company portals, content libraries, and guided learning experiences." />
      <Section background="white">
        <Container className="text-center">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/">Return Home</Button>
            <Button href="/contact" variant="secondary">Book Discovery</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
