'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/dossier/page.module.css';

export interface MissionLog {
  id: string;
  name: string;
  year: string;
  role: string;
  achievement: string;
  description: string;
  coordinates: { x: string; y: string };
  image: string;
}

interface MissionLogBoardProps {
  logs: MissionLog[];
}

export function MissionLogBoard({ logs }: MissionLogBoardProps) {
  const [hoveredLog, setHoveredLog] = useState<MissionLog | null>(null);
  const [selectedLog, setSelectedLog] = useState<MissionLog | null>(null);
  const [certImage, setCertImage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = (log: MissionLog) => {
    setSelectedLog(log);
    if (log.image) setCertImage(log.image);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedLog(null);
    setCertImage(null);
  };

  // Also close on backdrop click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) {
        closeModal();
      }
    };
    const dialog = dialogRef.current;
    dialog?.addEventListener('click', handleClickOutside);
    return () => dialog?.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.missionLogBoard}>
      <div className={styles.mapContainer}>
        {/* Radar grids */}
        <div className={styles.radarLines} />
        
        {logs.map((log) => (
          <div
            key={log.id}
            className={`${styles.mapPinContainer} ${hoveredLog?.id === log.id ? styles.active : ''}`}
            style={{ left: log.coordinates.x, top: log.coordinates.y }}
            onMouseEnter={() => setHoveredLog(log)}
            onMouseLeave={() => setHoveredLog(null)}
            onClick={() => openModal(log)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal(log)}
          >
            <div className={styles.pinDot} />
            <div className={styles.pinPulse} />
            <div className={styles.evidencePolaroid}>
              <div className={styles.polaroidPin} />
              <div className={styles.polaroidStamp}>
                {log.achievement.includes('RANK 1') || log.achievement.includes('1ST') ? '1ST PLACE' : 'WINNER'}
              </div>
              <div className={styles.polaroidImageMock}>
                <Image src={log.image} alt={log.name} fill sizes="180px" className={styles.polaroidImg} />
              </div>
              <div className={styles.polaroidCaption}>
                <span className={styles.polaroidId}>{log.id}</span>
                <strong className={styles.polaroidName}>{log.name}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.consoleCol}>
        <div className={styles.intelligenceReport}>
          <div className={styles.reportHeader}>
            <span className={styles.reportStatus}>INTEL REPORT : ACTIVE</span>
            <span className={styles.reportConsoleLine}>CONSOLE_SYS_v2.0</span>
          </div>
          <div className={styles.reportContent}>
            {hoveredLog ? (
              <div className={styles.reportDetails}>
                <div className={styles.reportTitleRow}>
                  <span className={styles.reportLabel}>EVENT:</span>
                  <h4 className={styles.reportTitle}>{hoveredLog.name}</h4>
                </div>
                <div className={styles.reportAchievementRow}>
                  <span className={styles.reportLabel}>CLASSIFICATION / OUTCOME:</span>
                  <div className={styles.reportAchievementVal}>{hoveredLog.achievement}</div>
                </div>
                <div className={styles.reportMetaRow}>
                  <div><span className={styles.reportLabel}>YEAR:</span> <span className={styles.reportVal}>{hoveredLog.year}</span></div>
                  <div><span className={styles.reportLabel}>ROLE:</span> <span className={styles.reportVal}>{hoveredLog.role}</span></div>
                </div>
                <div className={styles.reportDescBlock}>
                  <span className={styles.reportLabel}>BRIEFING:</span>
                  <p className={styles.reportDesc}>{hoveredLog.description}</p>
                  <button className={styles.decryptEvidenceBtn} onClick={() => openModal(hoveredLog)}>DECRYPT CERTIFICATE EVIDENCE →</button>
                </div>
              </div>
            ) : (
              <div className={styles.reportIdle}>
                <p className={styles.blinkText}>AWAITING TARGET PIN HOVER...</p>
                <p className={styles.idleHint}>Hover over nodes to extract mission data logs. Click nodes to view certificates.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Native dialog modal */}
      <dialog ref={dialogRef} className={styles.certDialog}>
        <div className={styles.certModalContent}>
          <button onClick={closeModal} className={styles.closeBtn}>✕</button>
          {certImage && (
            <div className={styles.certImageWrapper}>
              <Image src={certImage} alt={selectedLog?.name || 'Certificate'} fill sizes="(max-width: 1024px) 100vw, 800px" style={{ objectFit: 'contain' }} />
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
