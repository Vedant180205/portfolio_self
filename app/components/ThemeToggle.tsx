/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [pulling, setPulling] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync with persisted theme on mount + pre-load audio
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') setIsDark(false);

    const audio = new Audio('/cowboy.mp3');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    // If already in light mode on load, play immediately
    if (saved === 'light') {
      audio.play().catch(() => {});
      fadeVolume(audio, 0, 0.35, 1500);
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  /** Smoothly ramp audio volume from `from` → `to` over `ms` milliseconds */
  function fadeVolume(audio: HTMLAudioElement, from: number, to: number, ms: number) {
    const steps = 40;
    const interval = ms / steps;
    const delta = (to - from) / steps;
    let current = from;
    audio.volume = from;
    const timer = setInterval(() => {
      current += delta;
      audio.volume = Math.min(1, Math.max(0, current));
      if ((delta > 0 && current >= to) || (delta < 0 && current <= to)) {
        audio.volume = to;
        clearInterval(timer);
        if (to === 0) audio.pause();
      }
    }, interval);
  }

  const toggle = () => {
    if (pulling) return;
    setPulling(true);

    const goingLight = isDark;
    const audio = audioRef.current;

    if (audio) {
      if (goingLight) {
        // Switching to light — start playing and fade in
        audio.currentTime = 0;
        audio.play().catch(() => {});
        fadeVolume(audio, 0, 0.35, 1500);
      } else {
        // Switching to dark — fade out and stop
        fadeVolume(audio, audio.volume, 0, 800);
      }
    }

    setTimeout(() => {
      const next = !isDark;
      setIsDark(next);
      if (!next) {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      localStorage.setItem('theme', next ? 'dark' : 'light');
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
