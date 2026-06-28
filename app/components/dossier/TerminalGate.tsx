'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/dossier/page.module.css';

const TERMINAL_LINES = [
  '> INITIALIZING SECURE CONNECTION...',
  '> ACCESSING CLASSIFIED ARCHIVE...',
  '> VERIFYING CREDENTIALS...',
  '> ACCESS GRANTED.',
];

interface TerminalGateProps {
  onAccessGranted: () => void;
}

export function TerminalGate({ onAccessGranted }: TerminalGateProps) {
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    const interval = setInterval(() => {
      if (lineIndex < TERMINAL_LINES.length) {
        const fullLine = TERMINAL_LINES[lineIndex];
        if (charIndex < fullLine.length) {
          currentLine += fullLine[charIndex];
          charIndex++;
          setTerminalText((prev) => {
            const newLines = [...prev];
            newLines[lineIndex] = currentLine;
            return newLines;
          });
        } else {
          lineIndex++;
          charIndex = 0;
          currentLine = '';
          setTerminalText((prev) => [...prev, '']);
        }
      } else {
        clearInterval(interval);
        setAccessGranted(true);
        // trigger progress animation
        setProgress(100);
        setTimeout(onAccessGranted, 800);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onAccessGranted]);

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalWindow}>
        {terminalText.map((line, idx) => (
          <p key={`line-${idx}`} className={styles.terminalLine}>
            {line}
            {idx === terminalText.length - 1 && !accessGranted && (
              <span className={styles.cursor}>█</span>
            )}
          </p>
        ))}
        {!accessGranted && (
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%`, transition: 'width 1.5s linear' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
