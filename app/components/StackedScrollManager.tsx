'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * StackedScrollManager implements the premium GSAP ScrollTrigger stacked section
 * interaction across the homepage with Lenis smooth scrolling and step-by-step
 * gesture navigation to prevent accidental section skipping on hard scrolls.
 */
export default function StackedScrollManager() {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only apply stacked scroll interaction to the homepage
    if (pathname !== '/') return;

    // Check for user's reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let isMounted = true;
    let refreshTimeout: ReturnType<typeof setTimeout>;

    const mm = gsap.matchMedia();

    // Desktop and tablet viewports (>= 769px)
    mm.add('(min-width: 769px)', () => {
      // Find all eligible stacked sections on the current page
      const sectionElements = gsap.utils.toArray<HTMLElement>(
        '[data-stacked-section], section:not([data-stacked-exclude])'
      );

      // Filter out utility overlays, modals, footers that should remain terminal, and hidden elements
      const validPanels = sectionElements.filter((el) => {
        if (!el || (el.offsetParent === null && el.offsetHeight === 0)) return false;
        if (el.hasAttribute('data-stacked-exclude')) return false;
        if (el.id === 'contact' || el.tagName.toLowerCase() === 'footer') return false;
        return true;
      });

      if (validPanels.length < 2) return;

      const hasFooter = Boolean(document.querySelector('#contact, footer'));
      // If there's a footer, all panels animate before the footer comes in.
      // If there is no footer, the last panel remains unpinned so the user rests on it.
      const panelsToAnimate = hasFooter ? validPanels : validPanels.slice(0, -1);

      const createdTriggers: ScrollTrigger[] = [];

      panelsToAnimate.forEach((panel, i) => {
        // Set stacking order and base transform origin
        panel.style.zIndex = String((i + 1) * 10);
        panel.style.transformOrigin = 'center top';
        panel.style.position = 'relative';

        // Find the inner content element
        const innerPanel =
          panel.querySelector<HTMLElement>('[data-stacked-inner]') ||
          (panel.firstElementChild as HTMLElement) ||
          panel;

        // Calculate heights dynamically
        const panelHeight = innerPanel.offsetHeight || panel.scrollHeight || panel.offsetHeight;
        const windowHeight = window.innerHeight;
        const difference = panelHeight - windowHeight;

        // Ratio for fake-scrolling tall content
        const fakeScrollRatio =
          difference > 20 ? difference / (difference + windowHeight) : 0;

        if (fakeScrollRatio > 0) {
          panel.style.marginBottom = `${difference}px`;
        } else {
          panel.style.marginBottom = '0px';
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            id: `stacked-${panel.id || i}`,
            trigger: panel,
            start: 'bottom bottom',
            end: () =>
              fakeScrollRatio > 0
                ? `+=${difference + windowHeight}`
                : `+=${windowHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onEnter: () => {
              panel.style.pointerEvents = 'auto';
            },
            onLeave: () => {
              panel.style.pointerEvents = 'none';
            },
            onEnterBack: () => {
              panel.style.pointerEvents = 'auto';
            },
          },
        });

        // If content is taller than viewport, fake-scroll the inner container before stacking
        if (fakeScrollRatio > 0) {
          tl.to(innerPanel, {
            y: -difference,
            duration: fakeScrollRatio,
            ease: 'none',
          });
        }

        // Stacked panel transition: current panel scales down slightly & fades as next section covers it
        const transitionDuration = fakeScrollRatio > 0 ? (1 - fakeScrollRatio) : 1;
        const scaleDuration = transitionDuration * 0.9;
        const fadeDuration = transitionDuration * 0.1;

        tl.fromTo(
          panel,
          { scale: 1, opacity: 1 },
          {
            scale: 0.90,
            opacity: 0.45,
            duration: scaleDuration,
            ease: 'power1.inOut',
          }
        ).to(panel, {
          opacity: 0,
          duration: fadeDuration,
          ease: 'power1.out',
        });

        if (tl.scrollTrigger) {
          createdTriggers.push(tl.scrollTrigger);
        }
      });

      // ─── Step-by-Step Controlled Section Navigation ───
      // Collect key stop positions to prevent overshooting on hard scrolls
      const getCheckpoints = () => {
        const rawCheckpoints: number[] = [0];

        createdTriggers.forEach((st) => {
          if (st.start != null) rawCheckpoints.push(Math.round(st.start));
          if (st.end != null) rawCheckpoints.push(Math.round(st.end));
        });

        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        rawCheckpoints.push(maxScroll);

        const sorted = Array.from(new Set(rawCheckpoints)).sort((a, b) => a - b);
        const filtered: number[] = [];
        sorted.forEach((val) => {
          if (filtered.length === 0 || Math.abs(val - filtered[filtered.length - 1]) > 40) {
            filtered.push(val);
          }
        });
        return filtered;
      };

      let isTransitioning = false;
      let transitionTimer: ReturnType<typeof setTimeout>;

      const onWheel = (e: WheelEvent) => {
        // Allow modals and non-scroll elements to interact naturally
        if (document.querySelector('dialog[open], [data-lenis-prevent]')) return;
        if (e.ctrlKey) return; // Allow browser zoom

        // Intercept immediately in capture phase before browser or Lenis accumulates delta
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        if (isTransitioning) return;

        // Threshold to ignore accidental micro-jitters
        if (Math.abs(e.deltaY) < 6) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        const currentY = window.scrollY || window.pageYOffset;
        const checkpoints = getCheckpoints();

        if (direction > 0) {
          // Navigate to exactly next section checkpoint
          const target = checkpoints.find((cp) => cp > currentY + 25);
          if (target !== undefined) {
            isTransitioning = true;
            clearTimeout(transitionTimer);
            lenisRef.current?.scrollTo(target, {
              duration: 0.95,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              immediate: false,
            });
            transitionTimer = setTimeout(() => {
              isTransitioning = false;
            }, 900);
          }
        } else {
          // Navigate to exactly previous section checkpoint
          const target = [...checkpoints].reverse().find((cp) => cp < currentY - 25);
          if (target !== undefined) {
            isTransitioning = true;
            clearTimeout(transitionTimer);
            lenisRef.current?.scrollTo(target, {
              duration: 0.95,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              immediate: false,
            });
            transitionTimer = setTimeout(() => {
              isTransitioning = false;
            }, 900);
          }
        }
      };

      const onKeyDown = (e: KeyboardEvent) => {
        if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
          if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
          e.preventDefault();
          if (isTransitioning) return;
          const currentY = window.scrollY || window.pageYOffset;
          const checkpoints = getCheckpoints();
          const target = checkpoints.find((cp) => cp > currentY + 25);
          if (target !== undefined) {
            isTransitioning = true;
            clearTimeout(transitionTimer);
            lenisRef.current?.scrollTo(target, {
              duration: 0.95,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            transitionTimer = setTimeout(() => {
              isTransitioning = false;
            }, 900);
          }
        } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
          if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
          e.preventDefault();
          if (isTransitioning) return;
          const currentY = window.scrollY || window.pageYOffset;
          const checkpoints = getCheckpoints();
          const target = [...checkpoints].reverse().find((cp) => cp < currentY - 25);
          if (target !== undefined) {
            isTransitioning = true;
            clearTimeout(transitionTimer);
            lenisRef.current?.scrollTo(target, {
              duration: 0.95,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            transitionTimer = setTimeout(() => {
              isTransitioning = false;
            }, 900);
          }
        }
      };

      window.addEventListener('wheel', onWheel, { passive: false, capture: true });
      window.addEventListener('keydown', onKeyDown, { capture: true });

      return () => {
        window.removeEventListener('wheel', onWheel, { capture: true });
        window.removeEventListener('keydown', onKeyDown, { capture: true });
        clearTimeout(transitionTimer);

        validPanels.forEach((panel) => {
          panel.style.marginBottom = '';
          panel.style.zIndex = '';
          panel.style.transformOrigin = '';
          panel.style.transform = '';
          panel.style.opacity = '';
          panel.style.pointerEvents = '';

          const innerPanel =
            panel.querySelector<HTMLElement>('[data-stacked-inner]') ||
            (panel.firstElementChild as HTMLElement) ||
            panel;
          if (innerPanel) {
            innerPanel.style.transform = '';
          }
        });
      };
    });

    // Handle image/font load stabilization and dynamic content shifts
    const handleRefresh = () => {
      if (!isMounted) return;
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    // Listen for resize and image load events
    window.addEventListener('resize', handleRefresh, { passive: true });
    window.addEventListener('load', handleRefresh, { passive: true });

    // Initial stabilization refresh
    refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(refreshTimeout);
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('load', handleRefresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
