'use client';

import { useState, ReactNode } from 'react';
import { TerminalGate } from './TerminalGate';

import { ArtistObserver } from './ArtistObserver';
import styles from '@/app/dossier/page.module.css';
interface DossierClientWrapperProps {
  children: ReactNode; // all static sections
}

export function DossierClientWrapper({ children }: DossierClientWrapperProps) {
  const [accessGranted, setAccessGranted] = useState(false);
  const [isArtistActive, setIsArtistActive] = useState(false);

  if (!accessGranted) {
    return <TerminalGate onAccessGranted={() => setAccessGranted(true)} />;
  }

  return (
    <div
      className={`${styles.dossierContainer} ${isArtistActive ? styles.artistMode : ''}`}
      id="dossier-root"
    >
      <div className={styles.filmGrain} />

      {/* All static sections (MusicianSection, Topper, Photography, Calculator, Scout, Ending) */}
      {children}

      <ArtistObserver onActiveChange={setIsArtistActive} />
    </div>
  );
}
