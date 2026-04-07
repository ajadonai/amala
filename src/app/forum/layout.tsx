import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discussion',
  description:
    'A community space for women to share negotiation experiences, exchange strategies, and support each other anonymously.',
  openGraph: {
    title: 'Discussion | Amala Okafor',
    description:
      'Share your negotiation experience anonymously and help other women navigate workplace conversations.',
  },
};

export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
