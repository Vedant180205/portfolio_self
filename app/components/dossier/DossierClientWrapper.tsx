'use client';

import { useState } from 'react';
import { TerminalGate } from './TerminalGate';
import { MissionLogBoard, MissionLog } from './MissionLogBoard';
import { ArtistObserver } from './ArtistObserver';
import styles from '@/app/dossier/page.module.css';

interface DossierClientWrapperProps {
  missionLogs: MissionLog[];
  // Static sections passed as children (Server Components)
  children: React.ReactNode;
}

export function DossierClientWrapper({ missionLogs, children }: DossierClientWrapperProps) {
  const [accessGranted, setAccessGranted] = useState(false);

  if (!accessGranted) {
    return <TerminalGate onAccessGranted={() => setAccessGranted(true)} />;
  }

  return (
    <>
      <section className={styles.mapSection} id="map" aria-label="Geographic Log">
        <div className={styles.gridOverlay} />
        <div className={styles.mapWrapper}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionCategory}>INTEL // 01</span>
            <h2 className={styles.sectionTitleAlt}>MISSION LOGS & BRIEFINGS</h2>
            <p className={styles.logsSubtitle}>Accessing geographically distributed operational records.</p>
          </div>
          <MissionLogBoard logs={missionLogs} />
        </div>
      </section>
      
      {/* The static sections are rendered as children – they remain Server Components */}
      {children}
    </>
  );
}
