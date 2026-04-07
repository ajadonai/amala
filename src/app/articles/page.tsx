'use client';

import { useState, useMemo } from 'react';
import {
  PenIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  BookmarkIcon,
  SearchIcon,
} from '@/components/icons';

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

interface Article {
  id: number;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readTime: string;
  upvotes: number;
  comments: number;
  featured?: boolean;
}

const PLACEHOLDER_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Can AI close the negotiation gap?',
    excerpt:
      'Exploring how AI-powered coaching tools might help women develop stronger negotiation strategies in the workplace\u2009—\u2009and whether the technology can truly level a playing field shaped by decades of systemic bias.',
    tag: 'AI & Equity',
    date: 'Mar 15, 2026',
    readTime: '6 min',
    upvotes: 42,
    comments: 8,
    featured: true,
  },
  {
    id: 2,
    title: "The $1 million question: why women don\u2019t negotiate",
    excerpt:
      'Research shows women who negotiate starting salaries earn significantly more over their careers. So what holds them back?',
    tag: 'Negotiation',
    date: 'Feb 28, 2026',
    readTime: '8 min',
    upvotes: 67,
    comments: 14,
  },
  {
    id: 3,
    title: 'Survey insights: negotiation across cultures',
    excerpt:
      'Comparing negotiation patterns among women in Nigeria and the United States\u2009—\u2009similarities, differences, and implications.',
    tag: 'Research',
    date: 'Jan 12, 2026',
    readTime: '10 min',
    upvotes: 35,
    comments: 6,
  },
  {
    id: 4,
    title: 'From data to policy: making research actionable',
    excerpt:
      'How to translate survey findings into workplace policy recommendations that actually get implemented.',
    tag: 'Policy',
    date: 'Dec 5, 2025',
    readTime: '5 min',
    upvotes: 28,
    comments: 4,
  },
  {
    id: 5,
    title: 'The invisible tax: emotional labor in negotiation',
    excerpt:
      "Women don\u2019t just negotiate for less\u2009—\u2009they navigate a minefield of social penalties that men never face. Here\u2019s what the data shows.",
    tag: 'Women & Work',
    date: 'Nov 18, 2025',
    readTime: '7 min',
    upvotes: 53,
    comments: 11,
  },
  {
    id: 6,
    title: 'Redefining leadership: negotiation as a core competency',
    excerpt:
      "Why organizations that teach women to negotiate aren\u2019t just being equitable\u2009—\u2009they\u2019re building stronger leadership pipelines.",
    tag: 'Leadership',
    date: 'Oct 30, 2025',
    readTime: '6 min',
    upvotes: 39,
    comments: 9,
  },
  {
    id: 7,
    title: 'What 500 survey responses taught me about asking for more',
    excerpt:
      'The patterns that emerged from our largest dataset yet\u2009—\u2009and why the findings surprised even us.',
    tag: 'Research',
    date: 'Oct 8, 2025',
    readTime: '9 min',
    upvotes: 44,
    comments: 7,
  },
  {
    id: 8,
    title: 'Bias in the algorithm: when AI hiring tools fail women',
    excerpt:
      'A deep dive into how resume-screening AI can perpetuate gender bias in hiring\u2009—\u2009and what we can do about it.',
    tag: 'AI & Equity',
    date: 'Sep 22, 2025',
    readTime: '8 min',
    upvotes: 61,
    comments: 16,
  },
  {
    id: 9,
    title: 'The confidence myth: rethinking what holds women back',
    excerpt:
      "It\u2019s not about confidence. It\u2019s about systems. Here\u2019s why the \u2018lean in\u2019 narrative misses the point entirely.",
    tag: 'Women & Work',
    date: 'Sep 5, 2025',
    readTime: '6 min',
    upvotes: 72,
    comments: 21,
  },
  {
    id: 10,
    title: 'Pay transparency laws: progress or performance?',
    excerpt:
      'New legislation is forcing companies to disclose salary ranges. But do these laws actually help women negotiate better?',
    tag: 'Policy',
    date: 'Aug 14, 2025',
    readTime: '7 min',
    upvotes: 31,
    comments: 5,
  },
  {
    id: 11,
    title: 'Negotiation scripts that actually work',
    excerpt:
      'Practical, research-backed language for salary conversations, promotion asks, and benefit negotiations.',
    tag: 'Negotiation',
    date: 'Jul 29, 2025',
    readTime: '5 min',
    upvotes: 88,
    comments: 23,
  },
  {
    id: 12,
    title: 'Leading while female: the double bind of authority',
    excerpt:
      "Women who negotiate assertively are penalized. Women who don\u2019t are overlooked. The research on this bind\u2009—\u2009and ways through it.",
    tag: 'Leadership',
    date: 'Jul 10, 2025',
    readTime: '8 min',
    upvotes: 46,
    comments: 12,
  },
];

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
    <span
      className="art-tag-pill"
      style={{ '--tag-color': color } as React.CSSProperties}
    >
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

function ArticleActions({ article }: { article: Article }) {
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
      <button className="art-action art-action--save" type="button">
        <BookmarkIcon size={13} />
        <span>Save</span>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function ArticlesPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);

  const filtered = useMemo(() => {
    return PLACEHOLDER_ARTICLES.filter((a) => {
      const matchesTag = activeTag === 'All' || a.tag === activeTag;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  }, [activeTag, searchQuery]);

  const featured = filtered.find((a) => a.featured);
  const regular = filtered.filter((a) => !a.featured);
  const visible = regular.slice(0, visibleCount);
  const hasMore = visibleCount < regular.length;

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(ARTICLES_PER_PAGE);
  };

  return (
    <div className="articles-page">
      <div className="container-wide">
        {/* ── Page Header ── */}
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
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`tag ${tag === activeTag ? 'active' : ''}`}
                type="button"
              >
                {tag !== 'All' && (
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                    style={{ backgroundColor: TAG_COLORS[tag] }}
                  />
                )}
                {tag}
              </button>
            ))}
          </div>

          <div className="art-search-row">
            <div className="search-wrap art-search">
              <SearchIcon size={15} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="input input-with-icon"
              />
            </div>
            <p className="art-count">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              {activeTag !== 'All' && ` in ${activeTag}`}
            </p>
          </div>
        </div>

        {/* ── Feed ── */}
        <div className="art-feed">
          {/* No results */}
          {filtered.length === 0 && (
            <div className="art-empty card">
              <SearchIcon size={24} className="art-empty-icon" />
              <p className="art-empty-title">No articles found</p>
              <p className="art-empty-desc">Try adjusting your filters or search query.</p>
            </div>
          )}

          {/* Featured Article */}
          {featured && (
            <article className="art-featured">
              <span className="art-featured-badge">
                <StarIcon size={11} />
                Featured
              </span>

              <div className="art-card-meta">
                <TagPill tag={featured.tag} />
                <ArticleMeta date={featured.date} readTime={featured.readTime} />
              </div>

              <h2 className="art-featured-title">{featured.title}</h2>
              <p className="art-featured-excerpt">{featured.excerpt}</p>
              <ArticleActions article={featured} />
            </article>
          )}

          {/* Regular Articles */}
          {visible.map((article) => (
            <article key={article.id} className="art-card">
              <div className="art-card-meta">
                <TagPill tag={article.tag} />
                <ArticleMeta date={article.date} readTime={article.readTime} />
              </div>

              <h2 className="art-card-title">{article.title}</h2>
              <p className="art-card-excerpt">{article.excerpt}</p>
              <ArticleActions article={article} />
            </article>
          ))}

          {/* Load More */}
          {hasMore && (
            <div className="art-load-more">
              <button
                onClick={() => setVisibleCount((prev) => prev + ARTICLES_PER_PAGE)}
                className="art-load-btn"
                type="button"
              >
                Load more articles
                <span className="art-load-remaining">
                  ({regular.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
