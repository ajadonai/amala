import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Survey — Women, Negotiation & AI',
  description:
    'Take a 2–3 minute anonymous survey exploring how women navigate negotiation at work and how AI might help level the playing field.',
  openGraph: {
    title: 'Survey — Women, Negotiation & AI | Women in Focus',
    description:
      'Your experience matters. This anonymous survey explores how women navigate negotiation at work.',
  },
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
