import { MailIcon, LinkedInIcon, TwitterIcon, ScholarIcon } from '@/components/icons';

const SOCIAL_LINKS = [
  { href: 'mailto:amalaokafor01@gmail.com', icon: MailIcon, label: 'Email' },
  { href: '#', icon: LinkedInIcon, label: 'LinkedIn' },
  { href: '#', icon: TwitterIcon, label: 'X / Twitter' },
  { href: '#', icon: ScholarIcon, label: 'Google Scholar' },
];

export function Footer() {
  return (
    <footer className="border-t border-border-secondary bg-bg-primary pb-20 md:pb-0">
      <div className="container-wide py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left — tagline */}
          <div className="text-center sm:text-left">
            <p
              className="font-serif text-ink-primary font-medium mb-1"
              style={{ fontSize: '1rem' }}
            >
              Amala Okafor
            </p>
            <p
              className="text-ink-tertiary"
              style={{ fontSize: '0.8125rem' }}
            >
              Advancing women through research &amp; technology.
            </p>
          </div>

          {/* Right — social links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-ink-faint hover:text-wine-800 hover:bg-wine-50 transition-all duration-200"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-border-secondary flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-ink-faint" style={{ fontSize: '0.6875rem' }}>
            &copy; {new Date().getFullYear()} Amala Okafor. All rights reserved.
          </p>
          <p className="font-mono text-ink-ghost" style={{ fontSize: '0.6875rem' }}>
            Built with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
