'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * StackedScrollManager sets up the GSAP ScrollTrigger stacked section
 * animations across the homepage, working seamlessly with Lenis smooth scrolling.
 */
export default function StackedScrollManager() {
  const pathname = usePathname();

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
      // Find all top-level stacked sections directly under main
      const sectionElements = gsap.utils.toArray<HTMLElement>(
        'main > [data-stacked-section], main > section:not([data-stacked-exclude])'
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
      const panelsToAnimate = hasFooter ? validPanels : validPanels.slice(0, -1);

      panelsToAnimate.forEach((panel, i) => {
        // Set stacking order and base transform origin
        panel.style.zIndex = String((i + 1) * 10);
        panel.style.transformOrigin = 'center top';
        panel.style.position = 'relative';

        const tl = gsap.timeline({
          scrollTrigger: {
            id: `stacked-${panel.id || i}`,
            trigger: panel,
            start: 'bottom bottom',
            end: () => `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: false,
            scrub: 0.3,
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

        // Pronounced 3D card deck depth scale and dim as next section covers it
        tl.fromTo(
          panel,
          { scale: 1, filter: 'brightness(1)', borderRadius: '0px' },
          {
            scale: 0.88,
            filter: 'brightness(0.75)',
            borderRadius: '16px',
            ease: 'power1.out',
          }
        );
      });

      return () => {
        validPanels.forEach((panel) => {
          panel.style.marginBottom = '';
          panel.style.zIndex = '';
          panel.style.transformOrigin = '';
          panel.style.transform = '';
          panel.style.opacity = '';
          panel.style.filter = '';
          panel.style.borderRadius = '';
          panel.style.pointerEvents = '';
        });
      };
    });

    // Mobile viewports (<= 768px): Layered Pinning with Card Deck Layering & Snap
    mm.add('(max-width: 768px)', () => {
      const sectionElements = gsap.utils.toArray<HTMLElement>(
        'main > [data-stacked-section], main > section:not([data-stacked-exclude])'
      );

      const panels = sectionElements.filter((el) => {
        if (!el || (el.offsetParent === null && el.offsetHeight === 0)) return false;
        if (el.hasAttribute('data-stacked-exclude')) return false;
        if (el.id === 'contact' || el.tagName.toLowerCase() === 'footer') return false;
        return true;
      });

      if (panels.length < 2) return;

      // Ensure proper base stacking order for layered pinning
      panels.forEach((panel, i) => {
        panel.style.position = 'relative';
        panel.style.zIndex = String((i + 1) * 5);
        panel.style.transformOrigin = 'center top';
        panel.style.willChange = 'transform, filter';

        // Pin each panel at the top of the mobile viewport with pinSpacing: false
        // so the incoming panel stacks and rolls right on top of it.
        // We exclude the last panel from pinning so it transitions smoothly to the footer.
        if (i < panels.length - 1) {
          const nextPanel = panels[i + 1];
          ScrollTrigger.create({
            id: `mobile-stacked-${panel.id || i}`,
            trigger: panel,
            start: 'top top',
            endTrigger: nextPanel,
            end: 'top top',
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (progress: number) => {
                // Directional single-step clamping:
                // Prevents aggressive flings from overshooting and skipping multiple sections at once
                return progress > 0.35 ? 1 : 0;
              },
              duration: { min: 0.3, max: 0.6 },
              delay: 0.05,
              ease: 'power2.out',
            },
            onEnter: () => {
              panel.style.pointerEvents = 'auto';
            },
            onLeave: () => {
              panel.style.pointerEvents = 'none';
            },
            onEnterBack: () => {
              panel.style.pointerEvents = 'auto';
            },
          });

          // Subtle depth scale and dim as the next section layers over it
          gsap.fromTo(
            panel,
            { scale: 1, filter: 'brightness(1)' },
            {
              scale: 0.94,
              filter: 'brightness(0.7)',
              ease: 'none',
              scrollTrigger: {
                trigger: nextPanel,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      return () => {
        panels.forEach((panel) => {
          panel.style.position = '';
          panel.style.zIndex = '';
          panel.style.transformOrigin = '';
          panel.style.willChange = '';
          panel.style.transform = '';
          panel.style.filter = '';
          panel.style.pointerEvents = '';
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
