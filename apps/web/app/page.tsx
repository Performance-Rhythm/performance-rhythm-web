import HomeRedesign from '@/components/marketing/HomeRedesign';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Corporate Nervous System Regulation',
  path: '/',
  description: 'Evidence-informed workshops and programs that help employees and leaders regulate stress, recover more effectively, and perform with greater clarity and resilience.',
});

export default function HomePage() {
  return <HomeRedesign />;
}
