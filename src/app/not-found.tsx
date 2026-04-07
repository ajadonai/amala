import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="container-narrow py-20 text-center">
      <p
        className="font-serif text-wine-200 mb-4"
        style={{ fontSize: '6rem', lineHeight: 1, fontWeight: 600 }}
      >
        404
      </p>
      <h1
        className="font-serif text-ink-primary mb-3"
        style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}
      >
        Page not found
      </h1>
      <p
        className="text-ink-tertiary mb-8 mx-auto"
        style={{ fontSize: '0.9375rem', lineHeight: 1.65, maxWidth: 380 }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] font-sans font-semibold text-white bg-wine-800 hover:bg-wine-700 shadow-sm hover:shadow-wine transition-all duration-200"
        style={{ fontSize: '0.9375rem' }}
      >
        Back to home
      </Link>
    </div>
  );
}
