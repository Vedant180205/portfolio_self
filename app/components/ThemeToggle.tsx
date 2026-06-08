'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [pulling, setPulling] = useState(false);

  // Sync with persisted theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') setIsDark(false);
  }, []);

  const toggle = () => {
    if (pulling) return;
    setPulling(true);

    setTimeout(() => {
      const next = !isDark;
      setIsDark(next);
      const theme = next ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next ? '' : 'light');
      if (!next) {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('theme', theme);
      setPulling(false);
    }, 320);
  };

  return (
    <button
      className={`${styles.wrap} ${pulling ? styles.pulling : ''}`}
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      id="theme-toggle"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {/* Cord line */}
      <span className={styles.cord} aria-hidden="true" />

      {/* Pull ring with icon */}
      <span className={styles.ring} aria-hidden="true">
        {isDark ? (
          /* Sun icon */
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2"  x2="12" y2="5"  />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="4.22" y1="4.22"   x2="6.34" y2="6.34"   />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="2"  y1="12" x2="5"  y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          /* Moon icon */
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
