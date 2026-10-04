'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import styles from './SketchCarousel.module.css';

export interface SketchItem {
  id: string;
  num: string;
  title: string;
  medium: string;
  year: string;
  src: string;
}

export const defaultSketches: SketchItem[] = [
  {
    id: 'EXHIBIT 01',
    num: '01',
    title: 'CHHATRAPATI SHIVAJI MAHARAJ',
    medium: 'Charcoal & Graphite on Art Paper',
    year: 'c. 2023',
    src: '/images/sketches/20230926_232508.jpg',
  },
  {
    id: 'EXHIBIT 02',
    num: '02',
    title: 'SACHIN TENDULKAR',
    medium: 'Fine Pencil Drawing',
    year: 'c. 2023',
    src: '/images/sketches/20230926_232747.jpg',
  },
  {
    id: 'EXHIBIT 03',
    num: '03',
    title: 'VIRAT KOHLI',
    medium: 'Detailed Graphite Sketch',
    year: 'c. 2024',
    src: '/images/sketches/20241202_222420.jpg',
  },
  {
    id: 'EXHIBIT 04',
    num: '04',
    title: 'MICHAEL FARADAY',
    medium: 'Ink & Graphite Drawing',
    year: 'c. 2023',
    src: '/images/sketches/20230926_232844.jpg',
  },
  {
    id: 'EXHIBIT 05',
    num: '05',
    title: 'LATA MANGESHKAR',
    medium: 'Fine Charcoal Blending',
    year: 'c. 2023',
    src: '/images/sketches/20230926_232914.jpg',
  },
  {
    id: 'EXHIBIT 06',
    num: '06',
    title: 'KAPIL DEV',
    medium: 'Fine Line Pencil Sketch',
    year: 'c. 2023',
    src: '/images/sketches/20230926_233120.jpg',
  },
];

type StageMode = 'PAGE_SCROLL' | 'INTERNAL_STAGE' | 'EXITING';

interface SketchCarouselProps {
  sketches?: SketchItem[];
}

export default function SketchCarousel({ sketches = defaultSketches }: SketchCarouselProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const lenis = useLenis();
  const totalItems = sketches.length;
  const totalSteps = totalItems - 1;

  // Interaction State
  const modeRef = useRef<StageMode>('PAGE_SCROLL');
  const currentIndexRef = useRef<number>(0);
  const continuousValRef = useRef<{ val: number }>({ val: 0 });
  const isAnimatingRef = useRef<boolean>(false);
  const exitIntentRef = useRef<number>(0);
  const cooldownUntilRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  const [activeIdx, setActiveIdx] = useState(0);

  // Helper to compute absolute document top of the section
  const getSectionTop = useCallback(() => {
    if (!sectionRef.current) return 0;
    const rect = sectionRef.current.getBoundingClientRect();
    return rect.top + window.scrollY;
  }, []);

  // Update 3D card layout according to continuous floating index
  const renderCards = useCallback(
    (continuousIndex: number) => {
      const clamped = Math.max(0, Math.min(continuousIndex, totalSteps));
      const rounded = Math.min(totalSteps, Math.max(0, Math.round(clamped)));
      setActiveIdx(rounded);

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        const diff = index - clamped; // negative = cards behind/past, positive = cards ahead
        const dist = Math.abs(diff);
        // Active card always has highest zIndex (100) and comes upfront unobstructed:
        const zIndex = Math.round(100 - dist * 10);
        const activeValue = diff / totalItems;

        // Progressive opacity reduction for cards going behind:
        // Current active (0 steps behind): 100% (1.0)
        // 1 step behind: ~66% (0.66)
        // 2 steps behind: ~28% (0.28)
        // 3 or more steps behind: 0% (0.0) -> completely invisible
        let itemOpacity = 1;
        if (diff < 0) {
          const distBehind = -diff;
          if (distBehind >= 3) {
            itemOpacity = 0;
          } else if (distBehind >= 2) {
            itemOpacity = 0.28 * (1 - (distBehind - 2));
          } else if (distBehind >= 1) {
            itemOpacity = 0.66 - 0.38 * (distBehind - 1);
          } else {
            itemOpacity = 1.0 - 0.34 * distBehind;
          }
        } else {
          // Cards ahead in stack fan gracefully
          itemOpacity = Math.max(0.15, 1.0 - diff * 0.18);
        }

        item.style.setProperty('--zIndex', String(zIndex));
        item.style.setProperty('--active', String(activeValue));
        item.style.opacity = String(itemOpacity.toFixed(3));

        if (itemOpacity <= 0.01) {
          item.style.visibility = 'hidden';
          item.style.pointerEvents = 'none';
        } else {
          item.style.visibility = 'visible';
          item.style.pointerEvents = 'all';
        }
      });
    },
    [totalItems, totalSteps]
  );

  // Initial layout render
  useEffect(() => {
    renderCards(0);
  }, [renderCards]);

  // Smoothly tween continuous value to target sketch index via GSAP
  const animateToIndex = useCallback(
    (targetIndex: number, duration = 0.5) => {
      const target = Math.max(0, Math.min(targetIndex, totalSteps));
      if (target === currentIndexRef.current && continuousValRef.current.val === target) {
        return;
      }

      isAnimatingRef.current = true;
      exitIntentRef.current = 0;
      currentIndexRef.current = target;

      gsap.to(continuousValRef.current, {
        val: target,
        duration,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => {
          renderCards(continuousValRef.current.val);
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          renderCards(target);
        },
      });
    },
    [renderCards, totalSteps]
  );

  // Lock section into full viewport and pause Lenis page scroll
  const lockStage = useCallback(
    (startCardIndex: number) => {
      const section = sectionRef.current;
      if (!section) return;

      modeRef.current = 'INTERNAL_STAGE';
      currentIndexRef.current = startCardIndex;
      continuousValRef.current.val = startCardIndex;
      exitIntentRef.current = 0;
      cooldownUntilRef.current = Date.now() + 250; // Buffer leftover entry momentum
      renderCards(startCardIndex);

      // Snap scroll position exactly to section start
      const targetY = getSectionTop();
      if (lenis) {
        lenis.scrollTo(targetY, { immediate: true });
        lenis.stop();
      }
      window.scrollTo(0, targetY);
    },
    [lenis, renderCards, getSectionTop]
  );

  // Resume normal page scrolling downward to #photography
  const unlockAndExitForward = useCallback(() => {
    modeRef.current = 'EXITING';
    if (lenis) {
      lenis.start();
      const nextSection = document.getElementById('photography');
      if (nextSection) {
        lenis.scrollTo(nextSection, {
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
    setTimeout(() => {
      if (modeRef.current === 'EXITING') {
        modeRef.current = 'PAGE_SCROLL';
      }
    }, 1200);
  }, [lenis]);

  // Resume normal page scrolling upward to #topper
  const unlockAndExitBackward = useCallback(() => {
    modeRef.current = 'EXITING';
    if (lenis) {
      lenis.start();
      const prevSection = document.getElementById('topper');
      if (prevSection) {
        lenis.scrollTo(prevSection, {
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
    setTimeout(() => {
      if (modeRef.current === 'EXITING') {
        modeRef.current = 'PAGE_SCROLL';
      }
    }, 1200);
  }, [lenis]);

  // 1. Lenis Scroll Checker: Detect when section top reaches top of viewport
  useLenis(
    (lenisInstance) => {
      if (!sectionRef.current) return;
      const currentMode = modeRef.current;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (currentMode === 'PAGE_SCROLL') {
        const direction = lenisInstance.direction; // 1 = down, -1 = up

        // Entering from above (scrolling down into SKETCHES)
        if (direction === 1 && rect.top <= 15 && rect.top > -viewportHeight * 0.7) {
          lockStage(0);
        }
        // Entering from below (scrolling up into SKETCHES)
        else if (direction === -1 && rect.top >= -15 && rect.top < viewportHeight * 0.7) {
          lockStage(totalSteps);
        }
      } else if (currentMode === 'EXITING') {
        // Reset to normal page scroll once section is cleared from viewport
        if (rect.bottom < -50 || rect.top > viewportHeight + 50) {
          modeRef.current = 'PAGE_SCROLL';
        }
      }
    },
    [lockStage, totalSteps]
  );

  // 2. Backup Window Scroll Checker (for non-lenis / direct anchor navigation)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.scrollY;

    const handleScrollCheck = () => {
      if (!sectionRef.current) return;
      const currentMode = modeRef.current;
      const currentY = window.scrollY;
      const scrollingDown = currentY >= lastScrollY;
      lastScrollY = currentY;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (currentMode === 'PAGE_SCROLL') {
        if (scrollingDown && rect.top <= 15 && rect.top > -viewportHeight * 0.7) {
          lockStage(0);
        } else if (!scrollingDown && rect.top >= -15 && rect.top < viewportHeight * 0.7) {
          lockStage(totalSteps);
        }
      } else if (currentMode === 'EXITING') {
        if (rect.bottom < -50 || rect.top > viewportHeight + 50) {
          modeRef.current = 'PAGE_SCROLL';
        }
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, [lockStage, totalSteps]);

  // 3. Internal Stage Interaction (Wheel, Touch, Keyboard)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Desktop Wheel / Trackpad
    const handleWheel = (e: WheelEvent) => {
      if (modeRef.current !== 'INTERNAL_STAGE') return;

      // Intercept and consume all scroll gestures while locked in stage
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now < cooldownUntilRef.current) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 6) return;

      if (delta > 0) {
        // Scrolling DOWN
        if (currentIndexRef.current < totalSteps) {
          cooldownUntilRef.current = now + 300;
          animateToIndex(currentIndexRef.current + 1);
        } else {
          // At final sketch (06)
          if (isAnimatingRef.current) return;
          exitIntentRef.current++;
          if (exitIntentRef.current >= 2) {
            unlockAndExitForward();
          }
        }
      } else {
        // Scrolling UP
        if (currentIndexRef.current > 0) {
          cooldownUntilRef.current = now + 300;
          animateToIndex(currentIndexRef.current - 1);
        } else {
          // At first sketch (01)
          if (isAnimatingRef.current) return;
          exitIntentRef.current++;
          if (exitIntentRef.current >= 2) {
            unlockAndExitBackward();
          }
        }
      }
    };

    // Mobile / Tablet Touch
    const handleTouchStart = (e: TouchEvent) => {
      if (modeRef.current !== 'INTERNAL_STAGE') return;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (modeRef.current !== 'INTERNAL_STAGE') return;
      e.preventDefault();

      const currentY = e.touches[0].clientY;
      const diffY = touchStartYRef.current - currentY;

      if (Math.abs(diffY) > 40) {
        if (diffY > 0) {
          // Swipe up = next sketch
          if (currentIndexRef.current < totalSteps) {
            animateToIndex(currentIndexRef.current + 1);
          } else {
            if (!isAnimatingRef.current) {
              exitIntentRef.current++;
              if (exitIntentRef.current >= 2) {
                unlockAndExitForward();
              }
            }
          }
        } else {
          // Swipe down = previous sketch
          if (currentIndexRef.current > 0) {
            animateToIndex(currentIndexRef.current - 1);
          } else {
            if (!isAnimatingRef.current) {
              exitIntentRef.current++;
              if (exitIntentRef.current >= 2) {
                unlockAndExitBackward();
              }
            }
          }
        }
        touchStartYRef.current = currentY;
      }
    };

    // Keyboard Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modeRef.current !== 'INTERNAL_STAGE') return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (currentIndexRef.current < totalSteps) {
          animateToIndex(currentIndexRef.current + 1);
        } else {
          unlockAndExitForward();
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (currentIndexRef.current > 0) {
          animateToIndex(currentIndexRef.current - 1);
        } else {
          unlockAndExitBackward();
        }
      }
    };

    // Handle Window Resize
    const handleResize = () => {
      if (modeRef.current === 'INTERNAL_STAGE') {
        const targetY = getSectionTop();
        window.scrollTo(0, targetY);
        if (lenis) lenis.scrollTo(targetY, { immediate: true });
        renderCards(currentIndexRef.current);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (lenis) lenis.start();
    };
  }, [
    animateToIndex,
    totalSteps,
    unlockAndExitForward,
    unlockAndExitBackward,
    lenis,
    getSectionTop,
    renderCards,
  ]);

  // Direct card click interaction
  const handleItemClick = (index: number) => {
    if (modeRef.current !== 'INTERNAL_STAGE') {
      lockStage(index);
    } else {
      animateToIndex(index, 0.55);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.carouselSection}
      id="artist"
      aria-label="Art & Sketches Section"
    >
      {/* Background Image with Ambient Atmosphere */}
      <div className={styles.bgImageContainer} aria-hidden="true">
        <Image
          src="/images/sketches/Golden Atelier in Sunset Light.png"
          alt="Golden Atelier Background"
          fill
          quality={85}
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.bgImageOverlay} />
      </div>

      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.splitLayout}>
        {/* ── Left Side Editorial & Title Panel ── */}
        <div className={styles.leftEditorial}>
          <h2 className={styles.mainTitle}>A PENCIL, A PAGE, & A THOUSAND OBSERVATIONS.</h2>
          <p className={styles.mainDesc}>
            Graphite, charcoal, and ink — personal visual studies of character, discipline, and form.
          </p>
        </div>

        {/* ── Right Side 3D Arc Stage ── */}
        <div className={styles.carouselStage}>
          {sketches.map((sketch, index) => {
            const isActive = index === activeIdx;
            return (
              <div
                key={sketch.id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className={`${styles.carouselItem} ${isActive ? styles.activeItem : ''}`}
                onClick={() => handleItemClick(index)}
                style={{
                  '--items': totalItems,
                } as React.CSSProperties}
                role="button"
                tabIndex={0}
                aria-label={`View item ${sketch.num}: ${sketch.title}`}
              >
                <div className={styles.carouselBox}>
                  <span className={styles.num}>{sketch.num}</span>
                  <div className={styles.metaInfo}>
                    <h3 className={styles.sketchTitle}>{sketch.title}</h3>
                    <span className={styles.sketchMedium}>{sketch.medium}</span>
                    <span className={styles.sketchYear}>{sketch.year}</span>
                  </div>
                  <Image
                    src={sketch.src}
                    alt={sketch.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 550px"
                    className={styles.sketchImg}
                    priority={index < 4}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
