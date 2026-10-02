'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StackedScrollManager from './StackedScrollManager';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * RouteScrollHandler resets the scroll position to top on route change
 * unless an in-page hash anchor is present in the URL, and refreshes ScrollTrigger.
 */
function RouteScrollHandler() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (lenis && !window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }
  }, [pathname, lenis]);

  // Synchronize Lenis scroll updates with GSAP ScrollTrigger
  useLenis(() => {
    ScrollTrigger.update();
  });

  return null;
}

/**
 * SmoothScroll wraps the root layout with a single global Lenis instance.
 * Configured for natural, responsive, and accessible smooth scrolling with GSAP ScrollTrigger integration.
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
      <StackedScrollManager />
      {children}
    </ReactLenis>
  );
}
