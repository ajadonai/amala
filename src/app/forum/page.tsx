'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  MessageCircleIcon,
  CalendarIcon,
  SendIcon,
  ShieldIcon,
  ChevronDownIcon,
  CheckIcon,
} from '@/components/icons';

/* ═══════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════ */

interface Story {
  id: number;
  displayName: string;
  timeAgo: string;
  tag: string;
  title: string;
  body: string;
  hearts: number;
  replies: number;
}

const PLACEHOLDER_STORIES: Story[] = [
  {
    id: 1,
    displayName: 'Anonymous',
    timeAgo: '2 days ago',
    tag: 'Salary',
    title: 'My First Salary Negotiation',
    body: 'I finally asked for a raise after three years at the same company. My hands were shaking the entire time, but I walked out with a 15% increase. The key was having market data ready and practicing my pitch beforehand.',
    hearts: 24,
    replies: 11,
  },
  {
    id: 2,
    displayName: 'K.',
    timeAgo: '5 days ago',
    tag: 'AI Tools',
    title: 'I Used ChatGPT to Practice My Pitch',
    body: "Before my promotion conversation, I role-played different scenarios with an AI chatbot. It helped me anticipate pushback I hadn\u2019t considered. Not perfect, but better than going in cold.",
    hearts: 18,
    replies: 7,
  },
  {
    id: 3,
    displayName: 'Anonymous',
    timeAgo: '1 week ago',
    tag: 'Global',
    title: 'Negotiating in Lagos vs. New York',
    body: "I\u2019ve worked in both cities and the dynamics are completely different. In Lagos, relationships carry more weight. In New York, it\u2019s about leverage. Both require confidence women are rarely taught.",
    hearts: 41,
    replies: 19,
  },
  {
    id: 4,
    displayName: 'S.M.',
    timeAgo: '2 weeks ago',
    tag: 'Strategy',
    title: 'The \u201CCollaborative Negotiation\u201D Framework',
    body: "Instead of framing my ask as adversarial, I positioned it as a mutual win. \u201CHere\u2019s what I can deliver if we align on this.\u201D Changed everything about how my manager responded.",
    hearts: 33,
    replies: 9,
  },
  {
    id: 5,
    displayName: 'Anonymous',
    timeAgo: '2 weeks ago',
    tag: 'Support',
    title: 'When Negotiation Feels Impossible',
    body: "I was told \u2018the budget is frozen\u2019 three times before I learned it was a deflection. The fourth time, I asked to see the compensation band for my role. Suddenly there was room. Don\u2019t accept the first no.",
    hearts: 56,
    replies: 22,
  },
  {
    id: 6,
    displayName: 'Dr. N.',
    timeAgo: '3 weeks ago',
    tag: 'Research',
    title: 'What the Data Says About Women Who Ask',
    body: "I conducted a small study of 30 women in tech who regularly negotiate. The common thread wasn\u2019t confidence\u2009\u2014\u2009it was preparation. Every one of them had a system for tracking their contributions.",
    hearts: 47,
    replies: 15,
  },
  {
    id: 7,
    displayName: 'Anonymous',
    timeAgo: '1 month ago',
    tag: 'Salary',
    title: 'I Negotiated My First Remote Contract',
    body: "Freelancing was new to me and I almost accepted the first offer. A friend told me to ask for 30% more and explain the value. They said yes immediately\u2009\u2014\u2009which means I probably could\u2019ve asked for more.",
    hearts: 29,
    replies: 8,
  },
  {
    id: 8,
    displayName: 'M.A.',
    timeAgo: '1 month ago',
    tag: 'AI Tools',
    title: 'AI Helped Me Decode My Offer Letter',
    body: "I pasted my offer letter into Claude and asked it to identify what was negotiable. It flagged the equity vesting schedule and signing bonus as common leverage points I hadn\u2019t thought about.",
    hearts: 38,
    replies: 13,
  },
];

const TAG_COLORS: Record<string, string> = {
  Salary: 'var(--wine-800)',
  'AI Tools': 'var(--plum)',
  Global: 'var(--sky)',
  Strategy: 'var(--sage)',
  Support: 'var(--coral)',
  Research: 'var(--gold)',
};

const TOPIC_FILTERS = ['All', 'Salary', 'AI Tools', 'Strategy', 'Global', 'Support', 'Research'];
const STORIES_PER_PAGE = 4;

/* ═══════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════ */

function TopicPill({ tag }: { tag: string }) {
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <span className="forum-topic-pill" style={{ '--topic-color': color } as React.CSSProperties}>
      <span className="forum-topic-dot" />
      {tag}
    </span>
  );
}

function Avatar({ displayName, tag }: { displayName: string; tag: string }) {
  const isAnon = displayName === 'Anonymous';
  const color = TAG_COLORS[tag] || 'var(--wine-800)';
  return (
    <div className="forum-avatar" style={{ backgroundColor: color }}>
      {isAnon ? '?' : displayName[0].toUpperCase()}
    </div>
  );
}

function TopicSelect({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const topics = TOPIC_FILTERS.filter((t) => t !== 'All');

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input w-full flex items-center justify-between cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <span className="forum-topic-dot" style={{ '--topic-color': TAG_COLORS[value] || 'var(--wine-800)' } as React.CSSProperties} />
          {value}
        </span>
        <ChevronDownIcon size={14} className={`text-ink-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="forum-dropdown">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => { onChange(topic); setOpen(false); }}
                className={`forum-dropdown-item ${value === topic ? 'forum-dropdown-item--active' : ''}`}
              >
                <span className="forum-topic-dot" style={{ '--topic-color': TAG_COLORS[topic] } as React.CSSProperties} />
                {topic}
                {value === topic && <CheckIcon size={13} className="ml-auto" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SuccessToast({ show, onClose }: { show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="forum-toast">
      <span className="forum-toast-check">
        <CheckIcon size={13} />
      </span>
      <span className="forum-toast-text">Story submitted for review!</span>
    </div>
  );
}

function StoryCard({ story, isLiked, onToggleLike }: { story: Story; isLiked: boolean; onToggleLike: () => void }) {
  return (
    <article className="forum-story-card">
      <div className="forum-story-meta">
        <Avatar displayName={story.displayName} tag={story.tag} />
        <div className="forum-story-meta-text">
          <span className="forum-story-author">{story.displayName}</span>
          <span className="forum-story-sep">&middot;</span>
          <TopicPill tag={story.tag} />
          <span className="forum-story-sep">&middot;</span>
          <span className="forum-story-date">
            <CalendarIcon size={11} />
            {story.timeAgo}
          </span>
        </div>
      </div>

      <h3 className="forum-story-title">{story.title}</h3>
      <p className="forum-story-body">{story.body}</p>

      <div className="forum-story-actions">
        <button type="button" onClick={onToggleLike} className={`forum-story-heart ${isLiked ? 'forum-story-heart--active' : ''}`} aria-label={isLiked ? 'Unlike' : 'Like'}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill={isLiked ? 'var(--coral)' : 'none'} stroke={isLiked ? 'var(--coral)' : 'currentColor'} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
          {story.hearts + (isLiked ? 1 : 0)}
        </button>
        <span className="forum-story-replies">
          <MessageCircleIcon size={13} />
          {story.replies} {story.replies === 1 ? 'reply' : 'replies'}
        </span>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function ForumPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(STORIES_PER_PAGE);

  const [formOpen, setFormOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Salary');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyBody, setStoryBody] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('amala-forum-likes');
      if (stored) setLikedIds(new Set(JSON.parse(stored)));
    } catch { /* */ }
  }, []);

  const toggleLike = useCallback((id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem('amala-forum-likes', JSON.stringify([...next])); } catch { /* */ }
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    return PLACEHOLDER_STORIES.filter((s) => activeTag === 'All' || s.tag === activeTag);
  }, [activeTag]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setVisibleCount(STORIES_PER_PAGE);
  };

  const totalHearts = PLACEHOLDER_STORIES.reduce((sum, s) => sum + s.hearts, 0);

  const handleSubmit = () => {
    if (!storyBody.trim() || !storyTitle.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setShowToast(true);
      setStoryTitle('');
      setStoryBody('');
      setDisplayName('');
      setSelectedTopic('Salary');
      setFormOpen(false);
    }, 800);
  };

  const canSubmit = storyTitle.trim().length > 0 && storyBody.trim().length >= 20;

  return (
    <>
      <div className="forum-page">
        <div className="container-wide">
          {/* ── Header ── */}
          <header className="forum-header">
            <p className="section-label">Community</p>
            <div className="forum-title-row">
              <MessageCircleIcon size={20} className="forum-title-icon" />
              <h1 className="forum-page-title">Share Your Story</h1>
            </div>
            <p className="forum-page-desc">
              A safe space for women to share negotiation experiences, exchange
              strategies, and lift each other up. Post anonymously or with a
              display name&thinsp;&mdash;&thinsp;no account needed.
            </p>
            <div className="forum-stats-row">
              <span className="forum-stat-inline">
                <strong>{PLACEHOLDER_STORIES.length}</strong> stories
              </span>
              <span className="forum-stat-sep">&middot;</span>
              <span className="forum-stat-inline">
                <strong>{totalHearts}</strong> hearts
              </span>
              <span className="forum-stat-sep">&middot;</span>
              <span className="forum-stat-inline">
                <strong>6</strong> topics
              </span>
            </div>
          </header>

          {/* ── Submission Form ── */}
          <div className="forum-form-wrap">
            {!formOpen ? (
              <button type="button" onClick={() => setFormOpen(true)} className="forum-form-cta group">
                <span className="forum-form-cta-icon">
                  <SendIcon size={14} className="text-white" />
                </span>
                <span className="forum-form-cta-text">
                  <span className="forum-form-cta-title">Share your experience</span>
                  <span className="forum-form-cta-sub">Your story can help someone else. No account needed.</span>
                </span>
              </button>
            ) : (
              <div className="forum-form-expanded">
                <div className="forum-form-bar">
                  <span className="forum-form-bar-left">
                    <SendIcon size={14} className="forum-title-icon" />
                    <span className="forum-form-bar-title">Share your experience</span>
                  </span>
                  <button type="button" onClick={() => setFormOpen(false)} className="forum-form-close" aria-label="Close form">&times;</button>
                </div>
                <div className="forum-form-body">
                  <div className="forum-form-row">
                    <div>
                      <label className="forum-label">
                        Display name <span className="forum-label-opt">(optional)</span>
                      </label>
                      <input type="text" placeholder="Anonymous" value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={30} className="input" />
                    </div>
                    <div>
                      <label className="forum-label">Topic</label>
                      <TopicSelect value={selectedTopic} onChange={setSelectedTopic} />
                    </div>
                  </div>
                  <div className="forum-form-field">
                    <label className="forum-label">Title</label>
                    <input type="text" placeholder="Give your story a title..." value={storyTitle} onChange={(e) => setStoryTitle(e.target.value)} maxLength={100} className="input" />
                  </div>
                  <div className="forum-form-field">
                    <label className="forum-label">
                      Your story <span className="forum-label-opt">(min. 20 characters)</span>
                    </label>
                    <textarea placeholder="What happened? What did you learn? Your story can help someone else..." value={storyBody} onChange={(e) => setStoryBody(e.target.value)} rows={4} maxLength={2000} className="input" style={{ resize: 'none', lineHeight: 1.65 }} />
                    <div className="forum-char-count">
                      {storyBody.length} / 2,000
                    </div>
                  </div>
                  <div className="forum-form-footer">
                    <span className="forum-form-notice">
                      <ShieldIcon size={12} />
                      All stories are moderated before publishing
                    </span>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canSubmit || submitting}
                      className={`forum-submit-btn ${canSubmit && !submitting ? 'forum-submit-btn--active' : ''}`}
                    >
                      {submitting ? (
                        <>
                          <span className="forum-spinner" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <SendIcon size={13} />
                          Submit story
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Topic Filter ── */}
          <div className="forum-filters">
            <div className="art-tags-scroll">
              {TOPIC_FILTERS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleTagChange(topic)}
                  className={`tag ${topic === activeTag ? 'active' : ''}`}
                  type="button"
                >
                  {topic !== 'All' && (
                    <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: TAG_COLORS[topic] }} />
                  )}
                  {topic}
                </button>
              ))}
            </div>
            <p className="forum-count">
              {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
              {activeTag !== 'All' && ` in ${activeTag}`}
            </p>
          </div>

          {/* ── Story Feed ── */}
          <div className="forum-feed">
            {filtered.length === 0 && (
              <div className="forum-empty card">
                <MessageCircleIcon size={22} className="forum-empty-icon" />
                <p className="forum-empty-title">No stories yet</p>
                <p className="forum-empty-desc">Be the first to share a{activeTag !== 'All' ? ` ${activeTag.toLowerCase()}` : ''} story.</p>
              </div>
            )}

            {visible.map((story) => (
              <StoryCard key={story.id} story={story} isLiked={likedIds.has(story.id)} onToggleLike={() => toggleLike(story.id)} />
            ))}

            {hasMore && (
              <div className="forum-load-more">
                <button
                  onClick={() => setVisibleCount((prev) => prev + STORIES_PER_PAGE)}
                  className="art-load-btn"
                  type="button"
                >
                  Load more stories
                  <span className="art-load-remaining">({filtered.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SuccessToast show={showToast} onClose={() => setShowToast(false)} />

      <style jsx global>{`
        @keyframes forumToastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes forumSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes forumSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
