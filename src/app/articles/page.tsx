import { getAllArticles } from '@/sanity/lib/fetch';
import { STATIC_ARTICLES } from '@/data/articles';
import { ArticlesFeed, type ArticleItem } from '@/components/ArticlesFeed';

export const revalidate = 60;

const TAG_COLORS: Record<string, string> = {
  'AI & Equity': 'var(--plum)',
  Negotiation: 'var(--sage)',
  Research: '#9B7DB8',
  Policy: 'var(--coral)',
  'Women & Work': 'var(--wine-800)',
  Leadership: 'var(--gold)',
};

export default async function ArticlesPage() {
  const sanityArticles = await getAllArticles();

  // CMS articles (from Sanity)
  const cmsArticles: ArticleItem[] = sanityArticles.map((a) => ({
    id: a._id,
    title: a.title,
    excerpt: a.excerpt,
    tag: a.tag,
    date: new Date(a.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    readTime: `${a.readTime} min`,
    upvotes: 0,
    comments: 0,
    featured: a.featured,
    color: TAG_COLORS[a.tag] || 'var(--wine-800)',
    slug: a.slug,
  }));

  // Static articles (from data files)
  const staticArticles: ArticleItem[] = STATIC_ARTICLES.map((a) => ({
    id: `static-${a.slug}`,
    title: a.title,
    excerpt: a.excerpt,
    tag: a.tag,
    date: new Date(a.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    readTime: `${a.readTime} min`,
    upvotes: 0,
    comments: 0,
    featured: a.featured,
    color: TAG_COLORS[a.tag] || 'var(--wine-800)',
    slug: a.slug,
  }));

  // Merge: CMS articles first, then static articles
  const articles = [...cmsArticles, ...staticArticles];

  return <ArticlesFeed articles={articles} />;
}
