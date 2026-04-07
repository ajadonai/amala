import { MessageCircleIcon, HeartIcon, CalendarIcon } from '@/components/icons';

const PLACEHOLDER_STORIES = [
  {
    id: 1,
    displayName: 'Anonymous',
    timeAgo: '2 days ago',
    tag: 'Salary',
    title: 'My First Salary Negotiation',
    body: 'I finally asked for a raise after three years at the same company. My hands were shaking the entire time, but I walked out with a 15% increase. The key was having market data ready.',
    hearts: 24,
    replies: 11,
  },
  {
    id: 2,
    displayName: 'K.',
    timeAgo: '5 days ago',
    tag: 'AI Tools',
    title: 'I Used ChatGPT to Practice My Pitch',
    body: 'Before my promotion conversation, I role-played different scenarios with an AI chatbot. It helped me anticipate pushback I hadn\'t considered. Not perfect, but better than going in cold.',
    hearts: 18,
    replies: 7,
  },
  {
    id: 3,
    displayName: 'Anonymous',
    timeAgo: '1 week ago',
    tag: 'Global',
    title: 'Negotiating in Lagos vs. New York',
    body: 'I\'ve worked in both cities and the dynamics are completely different. In Lagos, relationships carry more weight. In New York, it\'s about leverage. Both require confidence women are rarely taught.',
    hearts: 41,
    replies: 19,
  },
  {
    id: 4,
    displayName: 'S.M.',
    timeAgo: '2 weeks ago',
    tag: 'Strategy',
    title: 'The "Collaborative Negotiation" Framework',
    body: 'Instead of framing my ask as adversarial, I positioned it as a mutual win. "Here\'s what I can deliver if we align on this." Changed everything about how my manager responded.',
    hearts: 33,
    replies: 9,
  },
];

const TAG_COLORS: Record<string, string> = {
  'Salary': 'var(--wine-800)',
  'AI Tools': 'var(--plum)',
  'Global': 'var(--sky)',
  'Strategy': 'var(--sage)',
  'Support': 'var(--coral)',
  'Research': 'var(--gold)',
};

const TOPIC_FILTERS = ['All', 'Salary', 'AI Tools', 'Strategy', 'Global', 'Support', 'Research'];

export default function ForumPage() {
  return (
    <div className="container-wide py-12 md:py-16">
      {/* ── Page Header ── */}
      <div className="mb-10 max-w-xl">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircleIcon size={20} className="text-wine-800" />
          <h1 className="font-serif text-ink-primary" style={{ fontSize: '1.75rem' }}>
            Share Your Story
          </h1>
        </div>
        <p className="text-ink-tertiary" style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
          A space for women to share negotiation experiences, exchange strategies,
          and support each other. Post anonymously or with a display name.
        </p>
      </div>

      {/* ── Topic Filters ── */}
      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border-secondary">
        {TOPIC_FILTERS.map((topic) => (
          <button
            key={topic}
            className={`tag ${topic === 'All' ? 'active' : ''}`}
            type="button"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* ── Submission Note ── */}
      <div className="card p-5 mb-8 border-dashed bg-bg-secondary">
        <p className="text-ink-secondary" style={{ fontSize: '0.9rem' }}>
          <span className="font-semibold text-ink-primary">Want to share?</span>{' '}
          Story submission will be available soon. No account needed — post
          anonymously or with a display name.
        </p>
      </div>

      {/* ── Stories Feed ── */}
      <div className="space-y-5">
        {PLACEHOLDER_STORIES.map((story) => (
          <article key={story.id} className="card p-6 hover:bg-bg-card-hover">
            {/* Meta row */}
            <div className="flex items-center gap-3 mb-3">
              {/* Avatar placeholder */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-sans font-semibold text-white"
                style={{
                  backgroundColor: TAG_COLORS[story.tag] || 'var(--wine-800)',
                  fontSize: '0.75rem',
                }}
              >
                {story.displayName === 'Anonymous' ? '?' : story.displayName[0]}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-medium text-ink-primary" style={{ fontSize: '0.875rem' }}>
                  {story.displayName}
                </span>
                <span className="text-ink-ghost">·</span>
                <span
                  className="font-sans font-medium"
                  style={{
                    fontSize: '0.75rem',
                    color: TAG_COLORS[story.tag] || 'var(--wine-800)',
                  }}
                >
                  {story.tag}
                </span>
                <span className="text-ink-ghost">·</span>
                <span className="flex items-center gap-1 text-ink-faint" style={{ fontSize: '0.75rem' }}>
                  <CalendarIcon size={12} />
                  {story.timeAgo}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3
              className="font-serif text-ink-primary mb-2 cursor-pointer hover:text-wine-800 transition-colors"
              style={{ fontSize: '1.125rem', lineHeight: 1.3 }}
            >
              {story.title}
            </h3>
            <p
              className="text-ink-secondary mb-4"
              style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}
            >
              {story.body}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-5 pt-3 border-t border-border-secondary">
              <span className="flex items-center gap-1.5 text-ink-faint hover:text-coral cursor-pointer transition-colors" style={{ fontSize: '0.8125rem' }}>
                <HeartIcon size={14} />
                {story.hearts}
              </span>
              <span className="flex items-center gap-1.5 text-ink-faint hover:text-wine-800 cursor-pointer transition-colors" style={{ fontSize: '0.8125rem' }}>
                <MessageCircleIcon size={14} />
                {story.replies} replies
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
