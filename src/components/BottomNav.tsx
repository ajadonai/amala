'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserIcon,
  PenIcon,
  ClipboardCheckIcon,
  MessageCircleIcon,
} from '@/components/icons';

const NAV_ITEMS = [
  { href: '/', label: 'About', icon: UserIcon },
  { href: '/articles', label: 'Articles', icon: PenIcon },
  { href: '/survey', label: 'Survey', icon: ClipboardCheckIcon },
  { href: '/forum', label: 'Stories', icon: MessageCircleIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border-secondary bg-bg-card/90"
      style={{
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex flex-col items-center justify-center gap-0.5
                w-full h-full
                transition-colors duration-150
                ${isActive
                  ? 'text-wine-800'
                  : 'text-ink-faint hover:text-ink-secondary'
                }
              `}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
              <span
                className="font-sans font-medium"
                style={{ fontSize: '0.625rem', letterSpacing: '0.02em' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
