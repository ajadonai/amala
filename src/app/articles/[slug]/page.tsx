import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { getArticleBySlug, getArticleSlugs } from '@/sanity/lib/fetch';
import { urlFor } from '@/sanity/lib/client';
import { ChevronRightIcon } from '@/components/icons';

/* ═══════════════════════════════════════════════════
   TAG → ACCENT COLOR MAP
   ═══════════════════════════════════════════════════ */

const TAG_COLORS: Record<string, string> = {
  'AI & Equity': 'var(--plum)',
  Negotiation: 'var(--sage)',
  Research: '#9B7DB8',
  Policy: 'var(--coral)',
  'Women & Work': 'var(--wine-800)',
  Leadership: 'var(--gold)',
};

/* ═══════════════════════════════════════════════════
   PORTABLE TEXT COMPONENTS
   ═══════════════════════════════════════════════════ */

/* eslint-disable @typescript-eslint/no-explicit-any */
const ptComponents: any = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string; caption?: string } }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="article-figure">
          <img
            src={urlFor(value).width(720).auto('format').url()}
            alt={value.alt || ''}
            loading="lazy"
            className="article-image"
          />
          {value.caption && (
            <figcaption className="article-caption">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: { href: string; blank?: boolean } }) => {
      const target = value?.blank ? '_blank' : undefined;
      return (
        <a href={value?.href || '#'} target={target} rel={target ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    },
  },
  block: {
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="article-blockquote">{children}</blockquote>
    ),
  },
};

/* ═══════════════════════════════════════════════════
   STATIC PARAMS (for SSG)
   ═══════════════════════════════════════════════════ */

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ═══════════════════════════════════════════════════
   METADATA
   ═══════════════════════════════════════════════════ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Amala Okafor`,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) notFound();

  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const color = TAG_COLORS[article.tag] || 'var(--wine-800)';

  return (
    <div className="articles-page">
      <article className="container-narrow article-view">
        {/* Breadcrumb */}
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <Link href="/articles" className="article-breadcrumb-link">
            Articles
          </Link>
          <ChevronRightIcon size={12} />
          <span className="article-breadcrumb-current">{article.tag}</span>
        </nav>

        {/* Header */}
        <header className="article-header">
          <span
            className="art-tag-pill"
            style={{ '--tag-color': color } as React.CSSProperties}
          >
            <span className="art-tag-dot" />
            {article.tag}
          </span>

          <h1 className="article-title">{article.title}</h1>

          <p className="article-excerpt">{article.excerpt}</p>

          <div className="article-meta-bar">
            <span className="article-author">Amala Okafor</span>
            <span className="article-meta-sep">&middot;</span>
            <time dateTime={article.publishedAt}>{date}</time>
            <span className="article-meta-sep">&middot;</span>
            <span>{article.readTime} min read</span>
          </div>
        </header>

        {/* Body */}
        {article.body && (
          <div className="article-body">
            <PortableText value={article.body as PortableTextBlock[]} components={ptComponents} />
          </div>
        )}

        {/* Footer nav */}
        <footer className="article-footer-nav">
          <Link href="/articles" className="btn-outline">
            ← Back to articles
          </Link>
        </footer>
      </article>
    </div>
  );
}
