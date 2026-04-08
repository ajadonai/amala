'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
        prevPathname.current = pathname;
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <div className={`page-transition ${isVisible ? 'page-transition--visible' : 'page-transition--entering'}`}>
      {children}
    </div>
  );
}
