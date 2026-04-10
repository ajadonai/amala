'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  PenIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  BookmarkIcon,
  SearchIcon,
  ShareIcon,
  LinkIcon,
  TwitterIcon,
  LinkedInIcon,
} from '@/components/icons';

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  upvotes: number;
  comments: number;
  featured?: boolean;
  color: string;
  slug?: string; // present for CMS articles
}

const TAG_COLORS: Record<string, string> = {
  'AI & Equity': 'var(--plum)',
  Negotiation: 'var(--sage)',
  Research: '#9B7DB8',
  Policy: 'var(--coral)',
  'Women & Work': 'var(--wine-800)',
  Leadership: 'var(--gold)',
};

const TAG_LIST = ['All', 'AI & Equity', 'Negotiation', 'Research', 'Policy', 'Women & Work', 'Leadership'];
const ARTICLES_PER_PAGE = 6;

/* ═══════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════ */

function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function TagPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <span className="art-tag-pill" style={{ '--tag-color': color } as React.CSSProperties}>
      <span className="art-tag-dot" />
      {tag}
    </span>
  );
}

function ArticleMeta({ date, readTime }: { date: string; readTime: string }) {
  return (
    <span className="art-meta">
      {date}<span className="art-meta-sep">&middot;</span>{readTime} read
    </span>
  );
}

function ArticleThumb({ title, color }: { title: string; color: string }) {
  const seed = title.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rot = (seed % 40) - 20;
  const size1 = 28 + (seed % 20);
  const size2 = 20 + ((seed * 3) % 16);
  const x1 = 10 + (seed % 30);
  const y1 = 8 + ((seed * 2) % 24);

  return (
    <div className="art-thumb" style={{ '--thumb-color': color } as React.CSSProperties}>
      <svg viewBox="0 0 80 80" className="art-thumb-svg">
        <rect x={x1} y={y1} width={size1} height={size1} rx="4" fill="currentColor" opacity="0.25" transform={`rotate(${rot} 40 40)`} />
        <circle cx={50 - (seed % 15)} cy={50 - (seed % 15)} r={size2 / 2} fill="currentColor" opacity="0.15" />
        <rect x="10" y={55 - (seed % 10)} width={40 + (seed % 15)} height="3" rx="1.5" fill="currentColor" opacity="0.2" />
      </svg>
    </div>
  );
}

function ShareMenu({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setOpen(false);
  };

  const encodedTitle = encodeURIComponent(title + ' — Women in Focus');
  const encodedUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';

  return (
    <div className="art-share-wrap">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="art-action art-action--save"
        aria-label="Share this article"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <ShareIcon size={13} />
        <span>Share</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="art-share-dropdown" role="menu" aria-label="Share options">
            <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="art-share-item" role="menuitem" onClick={() => setOpen(false)}>
              <TwitterIcon size={13} /> Post on X
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="art-share-item" role="menuitem" onClick={() => setOpen(false)}>
              <LinkedInIcon size={13} /> Share on LinkedIn
            </a>
            <button type="button" className="art-share-item" role="menuitem" onClick={handleCopy}>
              <LinkIcon size={13} /> Copy link
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ArticleActions({ article }: { article: ArticleItem }) {
  return (
    <div className="art-actions">
      <button className="art-action" type="button">
        <ArrowUpIcon size={13} />
        <span>{article.upvotes}</span>
      </button>
      <button className="art-action" type="button">
        <MessageCircleIcon size={13} />
        <span>{article.comments}</span>
      </button>
      <button className="art-action" type="button">
        <BookmarkIcon size={13} />
        <span>Save</span>
      </button>
      <ShareMenu title={article.title} />
    </div>
  );
}

/** Wraps article card content in a link if slug exists */
function ArticleLink({ slug, children }: { slug?: string; children: React.ReactNode }) {
  if (!slug) return <>{children}</>;
  return (
    <Link href={`/articles/${slug}`} className="art-card-link">
      {children}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   ARTICLES FEED
   ═══════════════════════════════════════════════════ */

export function ArticlesFeed({ articles }: { articles: ArticleItem[] }) {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesTag = activeTag === 'All' || a.tag === activeTag;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [articles, activeTag, searchQuery]);

  const featured = filtered.find((a) => a.featured);
  const regular = filtered.filter((a) => !a.featured);
  const visible = regular.slice(0, visibleCount);
  const hasMore = visibleCount < regular.length;

  const handleTagChange = (tag: string) => { setActiveTag(tag); setVisibleCount(ARTICLES_PER_PAGE); };
  const handleSearch = (value: string) => { setSearchQuery(value); setVisibleCount(ARTICLES_PER_PAGE); };

  return (
    <div className="articles-page">
      <div className="container-wide">
        {/* ── Header ── */}
        <header className="art-header">
          <p className="section-label">Published work</p>
          <div className="art-title-row">
            <PenIcon size={20} className="art-title-icon" />
            <h1 className="art-page-title">Articles</h1>
          </div>
          <p className="art-page-desc">
            Research, analysis, and commentary on women&apos;s negotiation,
            AI equity, and career outcomes.
          </p>
        </header>

        {/* ── Filters ── */}
        <div className="art-filters">
          <div className="art-tags-scroll">
            {TAG_LIST.map((tag) => (
              <button key={tag} onClick={() => handleTagChange(tag)} className={`tag ${tag === activeTag ? 'active' : ''}`} type="button">
                {tag !== 'All' && <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: TAG_COLORS[tag] }} />}
                {tag}
              </button>
            ))}
          </div>

          <div className="art-search-row">
            <div className="search-wrap art-search">
              <SearchIcon size={15} />
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className="input input-with-icon" />
            </div>
            <p className="art-count" aria-live="polite" role="status">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              {activeTag !== 'All' && ` in ${activeTag}`}
            </p>
          </div>
        </div>

        {/* ── Feed ── */}
        <div className="art-feed">
          {filtered.length === 0 && (
            <div className="art-empty card">
              <SearchIcon size={24} className="art-empty-icon" />
              <p className="art-empty-title">No articles found</p>
              <p className="art-empty-desc">Try adjusting your filters or search query.</p>
            </div>
          )}

          {/* Featured */}
          {featured && (
            <article className="art-featured">
              <div className="art-featured-content">
                <ArticleLink slug={featured.slug}>
                  <span className="art-featured-badge"><StarIcon size={11} /> Featured</span>
                  <div className="art-card-meta">
                    <TagPill tag={featured.tag} />
                    <ArticleMeta date={featured.date} readTime={featured.readTime} />
                  </div>
                  <h2 className="art-featured-title">{featured.title}</h2>
                  <p className="art-featured-excerpt">{featured.excerpt}</p>
                </ArticleLink>
                <ArticleActions article={featured} />
              </div>
              <ArticleThumb title={featured.title} color={featured.color} />
            </article>
          )}

          {/* Regular */}
          {visible.map((article) => (
            <article key={article.id} className="art-card art-card--with-thumb">
              <div className="art-card-body">
                <ArticleLink slug={article.slug}>
                  <div className="art-card-meta">
                    <TagPill tag={article.tag} />
                    <ArticleMeta date={article.date} readTime={article.readTime} />
                  </div>
                  <h2 className="art-card-title">{article.title}</h2>
                  <p className="art-card-excerpt">{article.excerpt}</p>
                </ArticleLink>
                <ArticleActions article={article} />
              </div>
              <ArticleThumb title={article.title} color={article.color} />
            </article>
          ))}

          {hasMore && (
            <div className="art-load-more">
              <button onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)} className="art-load-btn" type="button">
                Load more articles
                <span className="art-load-remaining">({regular.length - visibleCount} remaining)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
