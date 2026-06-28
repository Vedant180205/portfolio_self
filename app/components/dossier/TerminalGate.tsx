'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/dossier/page.module.css';

interface TerminalGateProps {
  onAccessGranted: () => void;
}

export function TerminalGate({ onAccessGranted }: TerminalGateProps) {
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lines = [
      'SYS_INIT: RETRIEVING CLASSIFIED RECORDS...',
      'ESTABLISHING ENCRYPTED SECURE LINK...',
      'ACCESS LEVEL: UNRESTRICTED // PATIL_V',
      'STATUS: ACCESS GRANTED'
    ];

    let currentLineIdx = 0;
    const interval = setInterval(() => {
      if (currentLineIdx < lines.length) {
        const lineVal = lines[currentLineIdx];
        setTerminalText((prev) => [...prev, lineVal]);
        currentLineIdx++;
      } else {
        clearInterval(interval);

        // Progress bar simulation
        let currentProgress = 0;
        const progressInterval = setInterval(() => {
          if (currentProgress < 100) {
            currentProgress += 5;
            setProgress(currentProgress);
          } else {
            clearInterval(progressInterval);
            setTimeout(() => {
              onAccessGranted();
            }, 600);
          }
        }, 50);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [onAccessGranted]);

  const skipEntry = () => onAccessGranted();

  return (
    <div className={styles.entryScreen}>
      <div className={styles.entryScanline} />
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <span className={styles.terminalDot} />
          <span className={styles.terminalDot} />
          <span className={styles.terminalDot} />
          <span className={styles.terminalTitle}>SECURE CLIENT SHELL</span>
        </div>
        <div className={styles.terminalContent}>
          {terminalText.map((line, idx) => (
            <p
              key={`line-${idx}`} // stable prefix
              className={line.includes('GRANTED') ? styles.textGranted : styles.textCommand}
            >
              {line}
            </p>
          ))}

          {terminalText.length >= 4 && (
            <div className={styles.progressContainer}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              <span className={styles.progressPct}>{progress}%</span>
            </div>
          )}

          {terminalText.length >= 4 && progress >= 100 && (
            <p className={styles.textLoading}>DECRYPTING ARCHIVE AND INITIALIZING INTERFACE...</p>
          )}

          <button onClick={skipEntry} className={styles.skipBtn}>
            [ BYPASS PROTOCOL ]
          </button>
        </div>
      </div>
    </div>
  );
}
