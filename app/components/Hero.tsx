'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  const circleTextRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    // Animate hero text lines on mount
    const lines = document.querySelectorAll(`.${styles.headlineLine}`);
    lines.forEach((line, i) => {
      (line as HTMLElement).style.animationDelay = `${0.2 + i * 0.15}s`;
    });
  }, []);

  return (
    <section className={styles.hero} id="home" aria-label="Hero section">
      {/* Background grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Left Content */}
      <div className={styles.content}>


        <h1 className={styles.headline} aria-label="Vedant Patil">
          <span className={styles.headlineLine}>VEDANT</span>
          <span className={`${styles.headlineLine} ${styles.headlineLastLine}`}>
            PATIL
            <span className={styles.accentDot} aria-hidden="true" />
          </span>
        </h1>

        <p className={styles.description}>
          I build real-world systems that combine embedded<br />
          engineering, machine learning and software to<br />
          solve meaningful problems.
        </p>

        <div className={styles.actions}>
          <a href="#projects" id="hero-view-work-btn" className={styles.primaryBtn}>
            <span>VIEW MY WORK</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {/* Scroll indicator */}
          <div className={styles.scrollIndicator} aria-label="Scroll to explore">
            <svg className={styles.scrollCircle} viewBox="0 0 120 120" width="110" height="110">
              <defs>
                <path
                  id="circlePath"
                  d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                />
              </defs>
              <text className={styles.scrollCircleText}>
                <textPath href="#circlePath" startOffset="0%">
                  • SCROLL TO EXPLORE • SCROLL TO EXPLORE •
                </textPath>
              </text>
            </svg>
            <div className={styles.scrollArrow} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11H18M18 11L12 5M18 11L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Portrait Image */}
      <div className={styles.imageWrapper} aria-hidden="true">
        <div className={styles.imageInner}>
          <Image
            src="/vedant.png"
            alt="Vedant Patil"
            fill
            priority
            className={styles.portrait}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Bottom fade into background */}
          <div className={styles.imageFade} />
        </div>
      </div>
    </section>
  );
}
