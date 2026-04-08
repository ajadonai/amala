import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="container-narrow py-20 text-center">
      <p className="not-found-code" aria-hidden="true">404</p>
      <h1 className="not-found-heading">Page not found</h1>
      <p className="not-found-desc text-ink-tertiary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
