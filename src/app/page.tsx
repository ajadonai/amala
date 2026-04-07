import { MailIcon, ChevronRightIcon } from '@/components/icons';

export default function AboutPage() {
  return (
    <div className="container-wide py-16 md:py-24">
      {/* ── Hero ── */}
      <section className="max-w-2xl mb-20">
        <p
          className="font-mono text-wine-800 mb-4"
          style={{ fontSize: '0.8125rem', letterSpacing: '0.05em' }}
        >
          RESEARCHER · ADVOCATE · WRITER
        </p>
        <h1
          className="font-serif text-ink-primary mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.03em' }}
        >
          Advancing women through
          <span className="text-wine"> research &amp; technology</span>
        </h1>
        <p
          className="text-ink-secondary mb-8"
          style={{ fontSize: '1.125rem', lineHeight: 1.75, maxWidth: 540 }}
        >
          I study how women negotiate, how AI shapes career equity, and what
          it takes to close the gap. My work bridges data, lived experience,
          and policy.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:amalaokafor01@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-semibold text-white bg-wine-800 hover:bg-wine-700 shadow-sm hover:shadow-wine transition-all duration-200"
          >
            <MailIcon size={16} />
            Get in Touch
          </a>
          <a
            href="/articles"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-sans font-semibold text-ink-primary border border-border-primary hover:border-wine-300 hover:text-wine-800 transition-all duration-200"
          >
            Read My Work
            <ChevronRightIcon size={16} />
          </a>
        </div>
      </section>

      {/* ── Research Pillars ── */}
      <section className="mb-20">
        <h2 className="font-serif text-ink-primary mb-8" style={{ fontSize: '1.5rem' }}>
          Research Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              title: 'Survey Research',
              desc: 'Large-scale surveys exploring how women approach salary negotiation, promotion asks, and workplace advocacy across industries.',
              color: 'var(--sage)',
            },
            {
              title: 'AI & Equity',
              desc: 'Investigating how AI tools can either widen or close the negotiation gap — from coaching bots to biased hiring algorithms.',
              color: 'var(--plum)',
            },
            {
              title: 'Advocacy',
              desc: 'Translating research into actionable frameworks, workshops, and policy recommendations that empower women at every career stage.',
              color: 'var(--gold)',
            },
          ].map((pillar) => (
            <div key={pillar.title} className="card p-6">
              <div
                className="w-2 h-2 rounded-full mb-4"
                style={{ backgroundColor: pillar.color }}
              />
              <h3
                className="font-serif text-ink-primary mb-2"
                style={{ fontSize: '1.125rem' }}
              >
                {pillar.title}
              </h3>
              <p className="text-ink-tertiary" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { value: '6+', label: 'Publications' },
            { value: '500+', label: 'Survey Responses' },
            { value: '2', label: 'Countries' },
            { value: '1', label: 'Mission' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4 rounded-xl bg-bg-secondary border border-border-secondary"
            >
              <p
                className="font-serif text-wine-800 mb-1"
                style={{ fontSize: '1.75rem', fontWeight: 600 }}
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

      {/* ── Resume Placeholder ── */}
      <section className="max-w-xl">
        <div className="card p-6 border-dashed flex items-center justify-between">
          <div>
            <h4 className="font-serif text-ink-primary mb-1" style={{ fontSize: '1rem' }}>
              Resume / CV
            </h4>
            <p className="text-ink-tertiary" style={{ fontSize: '0.85rem' }}>
              Coming soon — downloadable resume.
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
