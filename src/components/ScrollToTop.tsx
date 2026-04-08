'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@/components/icons';

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={`scroll-to-top ${show ? 'scroll-to-top--visible' : 'scroll-to-top--hidden'}`}
    >
      <ArrowUpIcon size={16} />
    </button>
  );
}
