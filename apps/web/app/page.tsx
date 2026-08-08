import { Metadata } from 'next';
import HomeRedesign from '@/components/marketing/HomeRedesign';

export const metadata: Metadata = {
  title: 'Corporate Nervous System Regulation | Performance Rhythm',
  description: 'Evidence-informed workshops and programs that help employees and leaders regulate stress, recover more effectively, and perform with greater clarity and resilience.',
  openGraph: {
    title: 'Performance Rhythm | Help Your People Recover From Stress',
    description: 'Practical, science-informed workshops and programs that help teams regulate stress and perform sustainably.',
    images: [
      {
        url: '/brand/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Performance Rhythm - Ancient Biology. Modern Workplace.'
      }
    ]
  }
};

export default function HomePage() {
  return <HomeRedesign />;
}
