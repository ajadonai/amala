import { ClipboardCheckIcon, ClockIcon, GlobeIcon } from '@/components/icons';

const INFO_CARDS = [
  {
    icon: ClipboardCheckIcon,
    title: 'Focus',
    desc: 'How women approach negotiation in the workplace — salary, promotions, and everyday asks.',
  },
  {
    icon: ClockIcon,
    title: 'Duration',
    desc: '2–3 minutes. Short, thoughtful questions designed to capture your real experience.',
  },
  {
    icon: GlobeIcon,
    title: 'Privacy',
    desc: 'Completely anonymous. No emails collected. Your data shapes research, not profiles.',
  },
];

export default function SurveyPage() {
  return (
    <div className="container-narrow py-12 md:py-16">
      {/* ── Header ── */}
      <div className="mb-12 text-center">
        <p
          className="font-mono text-wine-800 mb-3"
          style={{ fontSize: '0.8125rem', letterSpacing: '0.05em' }}
        >
          ACTIVE RESEARCH
        </p>
        <h1
          className="font-serif text-ink-primary mb-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', lineHeight: 1.2 }}
        >
          Women, Negotiation &amp; AI
        </h1>
        <p
          className="text-ink-secondary mx-auto"
          style={{ fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: 520 }}
        >
          Your experience matters. This anonymous survey explores how women
          navigate negotiation at work — and how AI might help level the
          playing field.
        </p>
      </div>

      {/* ── Info Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {INFO_CARDS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-5 text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-wine-50 text-wine-800 mx-auto mb-3">
              <Icon size={20} />
            </div>
            <h3
              className="font-serif text-ink-primary mb-1.5"
              style={{ fontSize: '1rem' }}
            >
              {title}
            </h3>
            <p className="text-ink-tertiary" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* ── Survey Embed Area ── */}
      <div className="card p-8 text-center border-dashed mb-12">
        <div className="py-12">
          <ClipboardCheckIcon size={32} className="text-ink-ghost mx-auto mb-4" />
          <h3
            className="font-serif text-ink-primary mb-2"
            style={{ fontSize: '1.125rem' }}
          >
            Survey Embed
          </h3>
          <p className="text-ink-tertiary mb-1" style={{ fontSize: '0.9rem' }}>
            Google Form will be embedded here once the link is provided.
          </p>
          <p className="font-mono text-ink-faint" style={{ fontSize: '0.75rem' }}>
            Awaiting embed URL
          </p>
        </div>
      </div>

      {/* ── Why Your Voice Matters ── */}
      <section className="wine-gradient rounded-xl p-8 text-center">
        <h2
          className="font-serif text-white mb-3"
          style={{ fontSize: '1.375rem' }}
        >
          Why Your Voice Matters
        </h2>
        <p
          className="text-white/80 mx-auto"
          style={{ fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: 480 }}
        >
          Every response contributes to a growing body of research that aims
          to understand and dismantle the barriers women face in negotiation.
          Your story — even anonymized — has the power to shift policy,
          reshape training programs, and open new doors.
        </p>
      </section>
    </div>
  );
}
