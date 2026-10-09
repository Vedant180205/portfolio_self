'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './AsciiLoader.module.css';

const ASCII_PHRASES = [
  'VEDANT_PATIL', 'FULLSTACK_ENGINEER', 'EMBEDDED_SYSTEMS', 'QUANT_DEVELOPER',
  'AI_ML_RESEARCH', 'NUMBA_JIT', 'PYTHON', 'TYPESCRIPT', 'NEXTJS', 'TENSORFLOW',
  'ROBOTICS_IOT', 'COMPUTER_VISION', 'ESP32_SYSTEMS', 'SYSTEM_ARCHITECTURE',
  'BINOMIAL_CRR', 'BLACK_SCHOLES', 'NEURAL_NETWORKS', 'HARDWARE_ACCELERATION',
  '01010110', '01000101', '01000100', '01000001', '01001110', '01010100',
  'IIT_GUWAHATI_WINNER', 'XIE_CODESPRINT_1ST', 'IIT_JODHPUR_1ST', 'AMUHACKS_1ST',
  'COGNITIVE_FOUNDATION', 'ABACUS_MASTER', 'SOROBAN_LOGIC', 'HIGH_PERFORMANCE',
  'OPTIMIZED_SYSTEMS', 'LOW_LATENCY', 'DECRYPTING_MATRICES', 'SYNCHRONIZING_CORE',
  '0xFF01', '0x7C3A', '0xD4A017', 'INTEL_READY', 'ROOT_ACCESS'
];

// Build a uniform, dense character/word stream
const BASE_TEXT_STREAM = Array.from({ length: 50 }, () => ASCII_PHRASES.join('   '))
  .join('   ');

export default function AsciiLoader() {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const asciiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scrolling during loading
    document.body.style.overflow = 'hidden';

    // 1. Smooth character-by-character ASCII stream shifting (calm, slow cadence without lag)
    const el = asciiRef.current;
    let stream = BASE_TEXT_STREAM;
    const shiftStep = 1; // Shift by 1 character for slow, rhythmic stream

    const streamInterval = setInterval(() => {
      if (el) {
        stream = stream.slice(shiftStep) + stream.slice(0, shiftStep);
        el.textContent = stream;
      }
    }, 260);

    // 2. Smooth progress counter (0 -> 100%)
    const startTime = performance.now();
    const duration = 2200; // 2.2 seconds loading sequence

    let animId: number;
    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress < 100) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        // Hold briefly at 100% then smoothly fade out
        setTimeout(() => {
          setIsFading(true);
          document.body.style.overflow = '';
          setTimeout(() => {
            setShouldRender(false);
          }, 650);
        }, 250);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      clearInterval(streamInterval);
      cancelAnimationFrame(animId);
      document.body.style.overflow = '';
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <aside 
      className={`${styles.loaderOverlay} ${isFading ? styles.fadeOut : ''}`}
      aria-label="Loading Screen"
      aria-live="polite"
    >
      {/* Ambient Lighting */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Center Large ASCII Art Portrait (Borderless) */}
      <section className={styles.centerStage}>
        <div
          ref={asciiRef}
          className={styles.ascii}
          aria-hidden="true"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: BASE_TEXT_STREAM }}
        />
      </section>

      {/* Minimal Bottom Loader */}
      <footer className={styles.bottomHud}>
        <span className={styles.loadingLabel}>LOADING {progress}%</span>

        <div className={styles.progressBarTrack} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </footer>
    </aside>
  );
}
