'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * RouteScrollHandler resets the scroll position to top on route change
 * unless an in-page hash anchor is present in the URL.
 */
function RouteScrollHandler() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis && !window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

/**
 * SmoothScroll wraps the root layout with a single global Lenis instance.
 * Configured for natural, responsive, and accessible smooth scrolling.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false, // Preserves native responsive touch scroll on mobile
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        autoRaf: true,
        anchors: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
        prevent: (node) => {
          return (
            node.hasAttribute('data-lenis-prevent') ||
            Boolean(node.closest('[data-lenis-prevent]')) ||
            Boolean(node.closest('dialog'))
          );
        },
      }}
    >
      <RouteScrollHandler />
      {children}
    </ReactLenis>
  );
}
