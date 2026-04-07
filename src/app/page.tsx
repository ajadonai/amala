import Link from 'next/link';
import {
  MailIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
} from '@/components/icons';

const PILLARS = [
  {
    num: '01',
    title: 'Survey research',
    desc: 'Large-scale surveys exploring how women approach salary negotiation, promotion asks, and workplace advocacy across industries.',
    color: 'var(--sage)',
  },
  {
    num: '02',
    title: 'AI & equity',
    desc: 'Investigating how AI tools can either widen or close the negotiation gap — from coaching bots to biased hiring algorithms.',
    color: 'var(--plum)',
  },
  {
    num: '03',
    title: 'Advocacy',
    desc: 'Translating research into actionable frameworks, workshops, and policy recommendations that empower women at every career stage.',
    color: 'var(--gold)',
  },
];

const STATS = [
  { value: '6+', label: 'Publications' },
  { value: '500+', label: 'Survey responses' },
  { value: '2', label: 'Countries' },
  { value: '1', label: 'Mission' },
];

const FOCUS_AREAS = [
  {
    title: 'Women & negotiation',
    desc: 'Why women negotiate less, what happens when they do, and how to change the default.',
    color: 'var(--wine-800)',
  },
  {
    title: 'AI in career equity',
    desc: 'Can AI coaching tools actually help — or do they replicate the same biases?',
    color: 'var(--plum)',
  },
  {
    title: 'Cross-cultural dynamics',
    desc: 'Comparing workplace negotiation norms between Nigeria, the US, and beyond.',
    color: 'var(--sage)',
  },
  {
    title: 'Policy & systemic change',
    desc: 'Moving from individual strategies to institutional reform and pay transparency.',
    color: 'var(--gold)',
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-mono text-ink-faint mb-3"
      style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
    >
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <div className="container-wide">
      {/* ═══ Hero ═══ */}
      <section className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-[1fr_340px] gap-10 md:gap-16 items-center">
        {/* Left — Copy */}
        <div>
          <p
            className="font-mono text-wine-800 mb-4"
            style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}
          >
            RESEARCHER · ADVOCATE · WRITER
          </p>
          <h1
            className="font-serif text-ink-primary mb-5"
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
              fontWeight: 600,
            }}
          >
            Advancing women through{' '}
            <span className="text-wine italic">research &amp; technology</span>
          </h1>
          <p
            className="text-ink-secondary mb-8"
            style={{ fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: 520 }}
          >
            I study how women negotiate, how AI shapes career equity, and what
            it takes to close the gap. My work bridges data, lived experience,
            and policy.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:amalaokafor01@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-sans font-semibold text-white bg-wine-800 hover:bg-wine-700 shadow-sm hover:shadow-wine transition-all duration-200"
              style={{ fontSize: '0.9375rem' }}
            >
              <MailIcon size={16} />
              Get in touch
            </a>
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-[10px] font-sans font-semibold text-ink-primary border border-border-primary hover:border-wine-300 hover:text-wine-800 transition-all duration-200"
              style={{ fontSize: '0.9375rem' }}
            >
              Read my work
              <ChevronRightIcon size={16} />
            </Link>
          </div>
        </div>

        {/* Right — Quote Card */}
        <div className="relative hidden md:block">
          {/* Offset background */}
          <div
            className="absolute rounded-2xl bg-wine-100"
            style={{ top: -8, left: -8, right: 8, bottom: 8, zIndex: 0 }}
          />
          {/* Card */}
          <div className="relative card rounded-2xl p-8" style={{ zIndex: 1 }}>
            <p
              className="font-serif text-wine-400 leading-none mb-2"
              style={{ fontSize: '3rem' }}
            >
              &ldquo;
            </p>
            <p
              className="font-serif text-ink-secondary italic mb-5"
              style={{ fontSize: '1.0625rem', lineHeight: 1.6 }}
            >
              Negotiation isn&apos;t a soft skill — it&apos;s an economic lever.
              And right now, that lever is broken for half the workforce.
            </p>
            <p
              className="font-sans text-ink-tertiary font-medium"
              style={{ fontSize: '0.8125rem' }}
            >
              — Amala Okafor
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div
        className="bg-wine-400 mb-12 rounded-full"
        style={{ width: 48, height: 2 }}
      />

      {/* ═══ Research Pillars ═══ */}
      <section className="mb-16">
        <SectionLabel>Foundation</SectionLabel>
        <h2
          className="font-serif text-ink-primary mb-6"
          style={{ fontSize: '1.625rem', letterSpacing: '-0.025em' }}
        >
          Research pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="card p-7 relative overflow-hidden hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ backgroundColor: pillar.color }}
              />
              <p
                className="font-mono text-ink-faint mb-4"
                style={{ fontSize: '0.6875rem' }}
              >
                {pillar.num}
              </p>
              <h3
                className="font-serif text-ink-primary mb-2"
                style={{ fontSize: '1.0625rem' }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-ink-tertiary"
                style={{ fontSize: '0.875rem', lineHeight: 1.65 }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section className="mb-16">
        <SectionLabel>Impact</SectionLabel>
        <h2
          className="font-serif text-ink-primary mb-6"
          style={{ fontSize: '1.625rem', letterSpacing: '-0.025em' }}
        >
          By the numbers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4 rounded-xl bg-bg-secondary border border-border-secondary"
            >
              <p
                className="font-serif text-wine-800 mb-1"
                style={{ fontSize: '2rem', fontWeight: 600 }}
              >
                {stat.value}
              </p>
              <p
                className="text-ink-tertiary font-sans"
                style={{ fontSize: '0.8125rem' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ What I Write About ═══ */}
      <section className="mb-16">
        <SectionLabel>Themes</SectionLabel>
        <h2
          className="font-serif text-ink-primary mb-6"
          style={{ fontSize: '1.625rem', letterSpacing: '-0.025em' }}
        >
          What I write about
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FOCUS_AREAS.map((area) => (
            <div
              key={area.title}
              className="card flex gap-3.5 p-5 hover:shadow-sm transition-all duration-200"
            >
              <div
                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: area.color }}
              />
              <div>
                <h4
                  className="font-serif text-ink-primary mb-1"
                  style={{ fontSize: '0.9375rem' }}
                >
                  {area.title}
                </h4>
                <p
                  className="text-ink-tertiary"
                  style={{ fontSize: '0.8125rem', lineHeight: 1.55 }}
                >
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Survey CTA Banner ═══ */}
      <section className="mb-16">
        <div className="wine-gradient rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3
              className="font-serif text-white mb-2"
              style={{ fontSize: '1.375rem' }}
            >
              Your voice shapes the research.
            </h3>
            <p
              className="text-white/80"
              style={{ fontSize: '0.9375rem', lineHeight: 1.65, maxWidth: 440 }}
            >
              Take the 3-minute anonymous survey and help us understand how
              women negotiate in the age of AI.
            </p>
          </div>
          <Link
            href="/survey"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-sans font-semibold bg-white text-wine-800 hover:shadow-lg transition-all duration-200 flex-shrink-0"
            style={{ fontSize: '0.9375rem' }}
          >
            <ClipboardCheckIcon size={16} />
            Take the survey
          </Link>
        </div>
      </section>

      {/* ═══ Resume / CV ═══ */}
      <section className="mb-16">
        <SectionLabel>Documents</SectionLabel>
        <h2
          className="font-serif text-ink-primary mb-6"
          style={{ fontSize: '1.625rem', letterSpacing: '-0.025em' }}
        >
          Resume / CV
        </h2>
        <div className="flex items-center justify-between p-5 rounded-xl bg-bg-card border-2 border-dashed border-border-primary max-w-xl">
          <div>
            <h4 className="font-serif text-ink-primary mb-0.5" style={{ fontSize: '1rem' }}>
              Curriculum vitae
            </h4>
            <p className="text-ink-tertiary" style={{ fontSize: '0.8125rem' }}>
              Downloadable resume coming soon.
            </p>
          </div>
          <span
            className="px-3 py-1 rounded-full font-mono text-ink-faint border border-border-secondary"
            style={{ fontSize: '0.6875rem' }}
          >
            Pending
          </span>
        </div>
      </section>
    </div>
  );
}
