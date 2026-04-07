import { PenIcon, ClockIcon, ArrowUpIcon, MessageCircleIcon } from '@/components/icons';

const PLACEHOLDER_ARTICLES = [
  {
    id: 1,
    title: 'Can AI Close the Negotiation Gap?',
    excerpt: 'Exploring how AI-powered coaching tools might help women develop stronger negotiation strategies in the workplace.',
    tag: 'AI & Equity',
    date: 'Mar 2026',
    readTime: '6 min',
    upvotes: 42,
    comments: 8,
  },
  {
    id: 2,
    title: 'The $1 Million Question: Why Women Don\'t Negotiate',
    excerpt: 'Research shows women who negotiate starting salaries earn significantly more over their careers. So what holds them back?',
    tag: 'Negotiation',
    date: 'Feb 2026',
    readTime: '8 min',
    upvotes: 67,
    comments: 14,
  },
  {
    id: 3,
    title: 'Survey Insights: Negotiation Across Cultures',
    excerpt: 'Comparing negotiation patterns among women in Nigeria and the United States — similarities, differences, and implications.',
    tag: 'Research',
    date: 'Jan 2026',
    readTime: '10 min',
    upvotes: 35,
    comments: 6,
  },
  {
    id: 4,
    title: 'From Data to Policy: Making Research Actionable',
    excerpt: 'How to translate survey findings into workplace policy recommendations that actually get implemented.',
    tag: 'Policy',
    date: 'Dec 2025',
    readTime: '5 min',
    upvotes: 28,
    comments: 4,
  },
];

const TAG_COLORS: Record<string, string> = {
  'AI & Equity': 'var(--plum)',
  'Negotiation': 'var(--sage)',
  'Research': '#9B7DB8',
  'Policy': 'var(--coral)',
  'Women & Work': 'var(--wine-800)',
  'Leadership': 'var(--gold)',
};

export default function ArticlesPage() {
  return (
    <div className="container-wide py-12 md:py-16">
      {/* ── Page Header ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <PenIcon size={20} className="text-wine-800" />
          <h1 className="font-serif text-ink-primary" style={{ fontSize: '1.75rem' }}>
            Articles
          </h1>
        </div>
        <p className="text-ink-tertiary" style={{ fontSize: '0.9375rem', maxWidth: 480 }}>
          Research, analysis, and commentary on women&apos;s negotiation, AI equity,
          and career outcomes.
        </p>
      </div>

      {/* ── Tag Filter Bar ── */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border-secondary">
        {['All', 'AI & Equity', 'Negotiation', 'Research', 'Policy', 'Women & Work', 'Leadership'].map(
          (tag) => (
            <button
              key={tag}
              className={`tag ${tag === 'All' ? 'active' : ''}`}
              type="button"
            >
              {tag}
            </button>
          )
        )}
      </div>

      {/* ── Article Feed ── */}
      <div className="space-y-5">
        {PLACEHOLDER_ARTICLES.map((article) => (
          <article key={article.id} className="card p-6 hover:bg-bg-card-hover">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: TAG_COLORS[article.tag] || 'var(--wine-800)' }}
              />
              <span className="font-sans font-medium text-ink-tertiary" style={{ fontSize: '0.8125rem' }}>
                {article.tag}
              </span>
              <span className="text-ink-ghost">·</span>
              <span className="font-mono text-ink-faint" style={{ fontSize: '0.75rem' }}>
                {article.date}
              </span>
            </div>

            <h2
              className="font-serif text-ink-primary mb-2 hover:text-wine-800 transition-colors cursor-pointer"
              style={{ fontSize: '1.25rem', lineHeight: 1.3 }}
            >
              {article.title}
            </h2>

            <p
              className="text-ink-secondary mb-4"
              style={{ fontSize: '0.9375rem', lineHeight: 1.65, maxWidth: 640 }}
            >
              {article.excerpt}
            </p>

            <div className="flex items-center gap-5 pt-3 border-t border-border-secondary">
              <span className="flex items-center gap-1.5 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                <ArrowUpIcon size={14} />
                {article.upvotes}
              </span>
              <span className="flex items-center gap-1.5 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                <MessageCircleIcon size={14} />
                {article.comments}
              </span>
              <span className="flex items-center gap-1.5 text-ink-faint" style={{ fontSize: '0.8125rem' }}>
                <ClockIcon size={14} />
                {article.readTime}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
