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
  const [activeCert, setActiveCert] = useState<MissionLog | string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = (log: MissionLog) => {
    setActiveCert(log);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setActiveCert(null);
  };

  // Close on backdrop click (click outside modal content)
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

  // Also close on Escape (native <dialog> already does this, but we'll sync state)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* 2-Column Split Dashboard */}
      <div className={styles.intelDashboard}>
        {/* Column 1: Pinned Evidence Board */}
        <div className={styles.boardCol}>
          <div className={styles.intelBoard}>
            <div className={styles.classifiedStampBg}>CLASSIFIED // TOP SECRET</div>

            {/* SVG Connecting threads */}
            <svg className={styles.connectionsSvg} aria-hidden="true">
              <line x1="18%" y1="20%" x2="30%" y2="68%" className={styles.logLineGlow} />
              <line x1="30%" y1="68%" x2="82%" y2="70%" className={styles.logLineGlow} />
              <line x1="82%" y1="70%" x2="78%" y2="22%" className={styles.logLineGlow} />
              <line x1="78%" y1="22%" x2="18%" y2="20%" className={styles.logLineGlow} />

              <line x1="18%" y1="20%" x2="30%" y2="68%" className={styles.logLine} />
              <line x1="30%" y1="68%" x2="82%" y2="70%" className={styles.logLine} />
              <line x1="82%" y1="70%" x2="78%" y2="22%" className={styles.logLine} />
              <line x1="78%" y1="22%" x2="18%" y2="20%" className={styles.logLine} />
              <line x1="18%" y1="20%" x2="82%" y2="70%" className={styles.logLineCross} />
              <line x1="30%" y1="68%" x2="78%" y2="22%" className={styles.logLineCross} />
            </svg>

            {logs.map((log) => (
              <div
                key={log.id}
                className={`${styles.pinNode} ${hoveredLog?.id === log.id ? styles.pinNodeActive : ''}`}
                style={{ left: log.coordinates.x, top: log.coordinates.y }}
                onMouseEnter={() => setHoveredLog(log)}
                onMouseLeave={() => setHoveredLog(null)}
                onClick={() => openModal(log)}
                role="button"
                tabIndex={0}
                aria-label={`View log details for ${log.name}`}
                id={`intel-pin-${log.id.toLowerCase()}`}
              >
                <div className={styles.pinDot} />
                <div className={styles.pinPulse} />

                <div className={styles.evidencePolaroid}>
                  <div className={styles.polaroidStamp}>
                    {log.achievement.includes('RANK 1') || log.achievement.includes('1ST') ? '1ST PLACE' : 'WINNER'}
                  </div>
                  <div className={styles.polaroidImageMock}>
                    <Image
                      src={log.image}
                      alt={log.name}
                      fill
                      sizes="180px"
                      className={styles.polaroidImg}
                    />
                  </div>
                  <div className={styles.polaroidCaption}>
                    <span className={styles.polaroidId}>{log.id}</span>
                    <strong className={styles.polaroidName}>{log.name}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Dashboard Terminal Briefing Reader */}
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
                    <div>
                      <span className={styles.reportLabel}>YEAR:</span>
                      <span className={styles.reportVal}>{hoveredLog.year}</span>
                    </div>
                    <div>
                      <span className={styles.reportLabel}>ROLE:</span>
                      <span className={styles.reportVal}>{hoveredLog.role}</span>
                    </div>
                  </div>
                  <div className={styles.reportDescBlock}>
                    <span className={styles.reportLabel}>BRIEFING:</span>
                    <p className={styles.reportDesc}>{hoveredLog.description}</p>
                    <button
                      className={styles.decryptEvidenceBtn}
                      onClick={() => openModal(hoveredLog)}
                    >
                      DECRYPT CERTIFICATE EVIDENCE →
                    </button>
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
      </div>

      {/* Native Dialog Modal */}
      <dialog ref={dialogRef} className={styles.certModalOverlay}>
        <div className={styles.certModalContent}>
          <button
            className={styles.certModalClose}
            onClick={closeModal}
            aria-label="Close certificate"
          >
            [ CLOSE EVIDENCE × ]
          </button>

          {activeCert && (
            typeof activeCert !== 'string' ? (
              /* Mission Log Details */
              <div className={styles.certModalBody}>
                <div className={styles.certModalImageWrapper}>
                  <Image
                    src={(activeCert as MissionLog).image}
                    alt={(activeCert as MissionLog).name}
                    width={1000}
                    height={700}
                    className={styles.certFullImg}
                    priority
                  />
                </div>
                <div className={styles.certModalDetails}>
                  <div className={styles.certModalHeader}>
                    <span className={styles.certModalLabel}>LOG REPORT:</span>
                    <h3 className={styles.certModalTitle}>{(activeCert as MissionLog).name}</h3>
                  </div>
                  <div className={styles.certModalMeta}>
                    <div>
                      <span className={styles.certModalLabel}>CLASSIFICATION / OUTCOME:</span>
                      <div className={styles.certModalVal} style={{ color: '#D4A017' }}>
                        {(activeCert as MissionLog).achievement}
                      </div>
                    </div>
                    <div className={styles.certModalMetaRow}>
                      <div>
                        <span className={styles.certModalLabel}>YEAR:</span>
                        <span className={styles.certModalVal}>{(activeCert as MissionLog).year}</span>
                      </div>
                      <div>
                        <span className={styles.certModalLabel}>ROLE:</span>
                        <span className={styles.certModalVal}>{(activeCert as MissionLog).role}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.certModalDesc}>
                    <span className={styles.certModalLabel}>BRIEFING ANALYSIS:</span>
                    <p>{(activeCert as MissionLog).description}</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Image‑only (photos, certificates, etc.) */
              <div className={styles.certModalImageWrapper}>
                <Image
                  src={activeCert as string}
                  alt="Archive Asset Preview"
                  width={1000}
                  height={700}
                  className={styles.certFullImg}
                  priority
                />
              </div>
            )
          )}

          <div className={styles.certModalFooter}>
            <span>ENCRYPTED_FILE_DECRYPTED</span>
            <span>VP_SYS_INTEL_BOARD</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
