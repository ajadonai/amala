import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import Markdown from 'react-markdown';
import { getArticleBySlug, getArticleSlugs } from '@/sanity/lib/fetch';
import { STATIC_ARTICLES } from '@/data/articles';
import { urlFor } from '@/sanity/lib/client';
import { ChevronRightIcon } from '@/components/icons';

const TAG_COLORS: Record<string, string> = {
  'AI & Equity': 'var(--plum)',
  Negotiation: 'var(--sage)',
  Research: '#9B7DB8',
  Policy: 'var(--coral)',
  'Women & Work': 'var(--wine-800)',
  Leadership: 'var(--gold)',
};

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
  const sanitySlugs = await getArticleSlugs();
  const staticSlugs = STATIC_ARTICLES.map((a) => a.slug);
  const allSlugs = [...new Set([...sanitySlugs, ...staticSlugs])];
  return allSlugs.map((slug) => ({ slug }));
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

  // Try Sanity first
  const sanityArticle = await getArticleBySlug(slug);
  if (sanityArticle) {
    return {
      title: sanityArticle.title,
      description: sanityArticle.excerpt,
      openGraph: {
        title: `${sanityArticle.title} | Women in Focus`,
        description: sanityArticle.excerpt,
        type: 'article',
        publishedTime: sanityArticle.publishedAt,
      },
    };
  }

  // Fall back to static
  const staticArticle = STATIC_ARTICLES.find((a) => a.slug === slug);
  if (staticArticle) {
    return {
      title: staticArticle.title,
      description: staticArticle.excerpt,
      openGraph: {
        title: `${staticArticle.title} | Women in Focus`,
        description: staticArticle.excerpt,
        type: 'article',
        publishedTime: staticArticle.publishedAt,
      },
    };
  }

  return { title: 'Article Not Found' };
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

  // Try Sanity first
  const sanityArticle = await getArticleBySlug(slug);

  // Fall back to static
  const staticArticle = !sanityArticle
    ? STATIC_ARTICLES.find((a) => a.slug === slug)
    : null;

  if (!sanityArticle && !staticArticle) notFound();

  const title = sanityArticle?.title || staticArticle!.title;
  const excerpt = sanityArticle?.excerpt || staticArticle!.excerpt;
  const tag = sanityArticle?.tag || staticArticle!.tag;
  const publishedAt = sanityArticle?.publishedAt || staticArticle!.publishedAt;
  const readTime = sanityArticle?.readTime || staticArticle!.readTime;
  const institution = staticArticle?.institution;
  const color = TAG_COLORS[tag] || 'var(--wine-800)';

  const date = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="articles-page">
      <article className="container-narrow article-view">
        {/* Breadcrumb */}
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <Link href="/articles" className="article-breadcrumb-link">
            Articles
          </Link>
          <ChevronRightIcon size={12} />
          <span className="article-breadcrumb-current">{tag}</span>
        </nav>

        {/* Header */}
        <header className="article-header">
          <span
            className="art-tag-pill"
            style={{ '--tag-color': color } as React.CSSProperties}
          >
            <span className="art-tag-dot" />
            {tag}
          </span>

          <h1 className="article-title">{title}</h1>

          <p className="article-excerpt">{excerpt}</p>

          <div className="article-meta-bar">
            <span className="article-author">Amala Okafor</span>
            {institution && (
              <>
                <span className="article-meta-sep">&middot;</span>
                <span>{institution}</span>
              </>
            )}
            <span className="article-meta-sep">&middot;</span>
            <time dateTime={publishedAt}>{date}</time>
            <span className="article-meta-sep">&middot;</span>
            <span>{readTime} min read</span>
          </div>
        </header>

        {/* Body */}
        <div className="article-body">
          {sanityArticle?.body ? (
            <PortableText value={sanityArticle.body as PortableTextBlock[]} components={ptComponents} />
          ) : staticArticle?.body ? (
            <Markdown>{staticArticle.body}</Markdown>
          ) : null}
        </div>

        {/* Footer nav */}
        <footer className="article-footer-nav">
          <Link href="/articles" className="btn-outline">
            &larr; Back to articles
          </Link>
        </footer>
      </article>
    </div>
  );
}
