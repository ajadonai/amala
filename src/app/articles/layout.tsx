import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    "Research, analysis, and commentary on women's negotiation, AI equity, and career outcomes by Women in Focus.",
  openGraph: {
    title: 'Articles | Women in Focus',
    description:
      "Research, analysis, and commentary on women's negotiation, AI equity, and career outcomes.",
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
