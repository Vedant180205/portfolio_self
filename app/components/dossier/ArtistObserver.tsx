'use client';

import { useEffect, useRef, useState } from 'react';

interface ArtistObserverProps {
  children: React.ReactNode;
  onActiveChange?: (active: boolean) => void;
}

export function ArtistObserver({ children, onActiveChange }: ArtistObserverProps) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.isIntersecting;
        setIsActive(active);
        onActiveChange?.(active);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onActiveChange]);

  return <div ref={ref}>{children}</div>;
}
