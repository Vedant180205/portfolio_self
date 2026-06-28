'use client';

import { useEffect, useRef } from 'react';

interface ArtistObserverProps {
  onActiveChange: (active: boolean) => void;
}

export function ArtistObserver({ onActiveChange }: ArtistObserverProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onActiveChange(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '-10% 0px -10% 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onActiveChange]);

  return <div ref={ref} />;
}
