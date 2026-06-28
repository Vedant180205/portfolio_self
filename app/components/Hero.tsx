'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';


const roles = ['Web Developer', 'Embedded Systems', 'AI/ML Engineer', 'IoT Builder'];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Vedant180205',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vedant-patil-933190330/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/vedant180205/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:vedbhumi123@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function Hero() {
  const [displayed, setDisplayed] = useState('');
  const stateRef = useRef<'typing' | 'pausing' | 'deleting'>('typing');
  const charRef = useRef(0);
  const roleRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentRole = roles[roleRef.current];

      if (stateRef.current === 'typing') {
        charRef.current += 1;
        setDisplayed(currentRole.slice(0, charRef.current));
        if (charRef.current === currentRole.length) {
          stateRef.current = 'pausing';
          timeout = setTimeout(tick, 1600);
        } else {
          timeout = setTimeout(tick, 70);
        }
      } else if (stateRef.current === 'pausing') {
        stateRef.current = 'deleting';
        timeout = setTimeout(tick, 40);
      } else {
        charRef.current -= 1;
        setDisplayed(currentRole.slice(0, charRef.current));
        if (charRef.current === 0) {
          roleRef.current = (roleRef.current + 1) % roles.length;
          stateRef.current = 'typing';
          timeout = setTimeout(tick, 380);
        } else {
          timeout = setTimeout(tick, 38);
        }
      }
    };

    timeout = setTimeout(tick, 700);
    return () => clearTimeout(timeout);
  }, []);

  const renderLetters = (text: string, baseDelay: number) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className={styles.char}
        style={{
          '--char-index': index,
          '--base-delay': `${baseDelay}s`,
        } as React.CSSProperties}
      >
        {char}
      </span>
    ));
  };

  return (
    <section className={`${styles.hero} paused`} data-animate-pause id="home" aria-label="Introduction">
      {/* Background grain overlay */}
      <div className={styles.grain} aria-hidden="true" />

      {/* Left Content */}
      <div className={styles.content}>
        <h1 className={styles.headline} aria-label="Vedant Patil">
          {/* VEDANT */}
          <span className={styles.headlineLine}>
            {renderLetters("VEDANT", 0.1)}
          </span>

          {/* Gold classification divider */}
          <span className={styles.nameDivider} aria-hidden="true" />

          {/* PATIL */}
          <span className={styles.headlineLastLine}>
            <span className={styles.headlineLastName}>
              {renderLetters("PATIL", 0.35)}
            </span>
            <span className={styles.accentRule} aria-hidden="true" />
          </span>
        </h1>

        {/* Mobile-only cycling role ticker */}
        <div className={styles.roleTicker} aria-live="polite">
          <span className={styles.roleText}>{displayed}</span>
          <span className={styles.roleCursor} aria-hidden="true">|</span>
        </div>

        <p className={styles.description}>
          Building intelligent software, hardware projects, and AI-powered solutions that solve real-world problems.
        </p>

        <div className={styles.actions}>
          <a href="#projects" id="hero-view-work-btn" className={styles.primaryBtn}>
            <span>VIEW MY WORK</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a href="/dossier" id="hero-visit-dossier-btn" className={`${styles.primaryBtn} ${styles.mobileDossierBtn}`}>
            <span>VISIT DOSSIER PAGE</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3.5 9H14.5M14.5 9L10 4.5M14.5 9L10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="https://drive.google.com/file/d/1ZSy1FW-6aWlZugjsOIPU0rK0etNAOTlA/view"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
            id="hero-resume-btn"
            aria-label="Download Resume"
          >
            <span>DOWNLOAD RESUME</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
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

        {/* Mobile-only social links */}
        <div className={styles.socialRow} aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label={link.label}
              title={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Right — Portrait Image */}
      <div className={styles.imageWrapper} aria-hidden="true">
        <div className={styles.imageInner}>
          <Image
            src="/images/avatar/vedant.webp"
            alt="Vedant Patil"
            fill
            priority
            quality={90}
            className={styles.portrait}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Bottom fade into background */}
          <div className={styles.imageFade} />
        </div>
      </div>
    </section>
  );
}
