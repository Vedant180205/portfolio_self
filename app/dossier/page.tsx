'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MusicianSection from '../components/MusicianSection';
import styles from './page.module.css';

// -------------------------------------------------------------
// TYPES & DATA DEFINITIONS
// -------------------------------------------------------------



interface MissionLog {
  id: string;
  name: string;
  year: string;
  role: string;
  achievement: string;
  description: string;
  coordinates: { x: string; y: string };
  image: string;
}

const missionLogs: MissionLog[] = [
  {
    id: 'LOG-01',
    name: 'IO Hackathon 2026',
    year: '2026',
    role: 'Quant Developer',
    achievement: 'WINNER — 3RD PRIZE (IIT GUWAHATI & AQUA)',
    description: 'Secured 3rd Prize at the IO Hackathon 2026, hosted by IIT Guwahati in collaboration with AQUA (Advanced Quantitative Analytics) and organized by the Finance & Economics Club - IIT Guwahati. Worked with Sahil Rane as team QuantDevs. Developed a valuation-driven Python system accelerated via Numba JIT for pricing American options on NVIDIA (NVDA) using Binomial Cox–Ross–Rubinstein (CRR) and Black–Scholes models, live yfinance data, and Sharpe/Sortino ratios.',
    coordinates: { x: '18%', y: '20%' },
    image: '/hackathon_certs/WhatsApp Image 2026-03-08 at 8.48.49 AM.jpeg'
  },
  {
    id: 'LOG-02',
    name: 'Code Sprint',
    year: '2026',
    role: 'Logic & Implementation',
    achievement: 'WINNER — 1ST PLACE (XIE MAHIM)',
    description: 'Secured 1st Place at Code Sprint, a high-pressure 4-hour hackathon hosted at Xavier’s Institute of Engineering, Mahim. Worked with Team CodeRunners alongside Saiprasad Jamdar (Backend & AI lead), Rajnish Rao (Full-Stack & Design), and Sahil Rane (Frontend & Ideation). Contributed to logic building and implementation under extremely tight timelines.',
    coordinates: { x: '30%', y: '68%' },
    image: '/hackathon_certs/codesprint_cert.jpeg'
  },
  {
    id: 'LOG-03',
    name: 'Kaggle Knight',
    year: '2026',
    role: 'Machine Learning Engineer',
    achievement: 'WINNER — 1ST PLACE (IIT JODHPUR)',
    description: 'Secured 1st Place at the Kaggle Knight – 36 Hour ML Hackathon, hosted at IIT Jodhpur, Rajasthan and organized by Prometeo IIT Jodhpur. Partnered with Sahil Rane as Team nightknight, focusing on ML fundamentals, clean execution, and prioritizing clarity and signal over complexity under intense pressure.',
    coordinates: { x: '78%', y: '22%' },
    image: '/hackathon_certs/kagglenight_cert.png'
  },
  {
    id: 'LOG-04',
    name: 'AMUHACKS 5.0',
    year: '2026',
    role: 'Full-Stack Developer',
    achievement: 'WINNER — 1ST PLACE (AMUHACKS)',
    description: 'Secured 1st Place at AMUHACKS 5.0 (4th hackathon win). Worked with Sahil Rane as Team CyberDevs, enduring an intense coding grind and late-night coding sessions to build and launch a fully functional system. Repo: https://lnkd.in/dJUqpzp2',
    coordinates: { x: '82%', y: '70%' },
    image: '/hackathon_certs/Vedant_Patil_CyberDevs.png'
  }
];

interface Sketch {
  id: string;
  src: string;
  title: string;
  medium: string;
  year: string;
}

const sketches: Sketch[] = [
  {
    id: 'EXHIBIT 01',
    src: '/ved_sketch/20230926_232508.jpg',
    title: 'CHHATRAPATI SHIVAJI MAHARAJ',
    medium: 'Charcoal & Graphite on Art Paper',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 02',
    src: '/ved_sketch/20230926_232747.jpg',
    title: 'SACHIN TENDULKAR',
    medium: 'Fine Pencil Drawing',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 03',
    src: '/ved_sketch/20241202_222420.jpg',
    title: 'VIRAT KOHLI',
    medium: 'Detailed Graphite Sketch',
    year: 'c. 2024'
  },
  {
    id: 'EXHIBIT 04',
    src: '/ved_sketch/20230926_232844.jpg',
    title: 'MICHAEL FARADAY',
    medium: 'Ink & Graphite Drawing',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 05',
    src: '/ved_sketch/20230926_232914.jpg',
    title: 'LATA MANGESHKAR',
    medium: 'Fine Charcoal Blending',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 06',
    src: '/ved_sketch/20230926_233120.jpg',
    title: 'KAPIL DEV',
    medium: 'Fine Line Pencil Sketch',
    year: 'c. 2023'
  }
];

interface Photo {
  id: string;
  src: string;
  aspectRatio: number;
}

const col1Photos: Photo[] = [
  {
    id: 'C1_01',
    src: '/photography_sect/20230530_190843.jpg',
    aspectRatio: 3 / 4
  },
  {
    id: 'C1_02',
    src: '/photography_sect/20230528_112806.jpg',
    aspectRatio: 3 / 4
  },
  {
    id: 'C1_03',
    src: '/photography_sect/20240223_171922.jpg',
    aspectRatio: 3 / 4
  },
  {
    id: 'C1_04',
    src: '/photography_sect/20230528_063251.jpg',
    aspectRatio: 2296 / 4080
  }
];

const col2Photos: Photo[] = [
  {
    id: 'C2_01',
    src: '/photography_sect/20230529_184440.jpg',
    aspectRatio: 3 / 4
  },
  {
    id: 'C2_02',
    src: '/photography_sect/20230528_063441.jpg',
    aspectRatio: 2282 / 3761
  },
  {
    id: 'C2_03',
    src: '/photography_sect/20240603_100635.jpg',
    aspectRatio: 2576 / 3985
  },
  {
    id: 'C2_04',
    src: '/photography_sect/20251217_071811.jpg',
    aspectRatio: 4 / 3
  }
];

const col3Photos: Photo[] = [
  {
    id: 'C3_01',
    src: '/photography_sect/20240603_183133.jpg',
    aspectRatio: 1836 / 3398
  },
  {
    id: 'C3_02',
    src: '/photography_sect/20240606_094433.jpg',
    aspectRatio: 2448 / 3264
  },
  {
    id: 'C3_03',
    src: '/photography_sect/20230425_165853.jpg',
    aspectRatio: 3 / 4
  }
];

export default function DossierPage() {
  // Page entry states
  const [accessGranted, setAccessGranted] = useState(false);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);



  // Mission logs state
  const [hoveredLog, setHoveredLog] = useState<MissionLog | null>(null);
  const [activeCert, setActiveCert] = useState<MissionLog | string | null>(null);

  // Section backgrounds & scrolling
  const [isArtistActive, setIsArtistActive] = useState(false);
  const artistRef = useRef<HTMLDivElement | null>(null);

  // Sketch gallery visibility
  const [showAllSketches, setShowAllSketches] = useState(false);



  // Interactive Soroban Abacus States
  const [abacusVal, setAbacusVal] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
  const [targetVal, setTargetVal] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  const getArrayValue = (arr: number[]) => arr.reduce((acc, digit) => acc * 10 + digit, 0);

  const formatValue = (arr: number[]) => {
    const val = getArrayValue(arr);
    return val.toString().padStart(7, '0').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const generateNewChallenge = () => {
    const newTarget = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
    setTargetVal(newTarget);
  };

  const toggleUpperBead = (colIdx: number) => {
    setAbacusVal((prev) => {
      const next = [...prev];
      const currentVal = next[colIdx];
      if (currentVal >= 5) {
        next[colIdx] = currentVal - 5;
      } else {
        next[colIdx] = currentVal + 5;
      }
      return next;
    });
  };

  const handleLowerBeadClick = (colIdx: number, clickedBeadNum: number) => {
    setAbacusVal((prev) => {
      const next = [...prev];
      const currentVal = next[colIdx];
      const hasUpper = currentVal >= 5;
      const currentLowerCount = currentVal % 5;
      let newLowerCount = 0;
      if (clickedBeadNum <= currentLowerCount) {
        newLowerCount = clickedBeadNum - 1;
      } else {
        newLowerCount = clickedBeadNum;
      }
      next[colIdx] = (hasUpper ? 5 : 0) + newLowerCount;
      return next;
    });
  };


  // Terminal screen animation
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
              setAccessGranted(true);
            }, 600);
          }
        }, 50);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);



  // Artist section theme transition observer
  useEffect(() => {
    if (!accessGranted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsArtistActive(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '-10% 0px -10% 0px' }
    );

    if (artistRef.current) observer.observe(artistRef.current);

    return () => observer.disconnect();
  }, [accessGranted]);



  // Initialize first challenge on mount
  useEffect(() => {
    if (accessGranted) {
      generateNewChallenge();
    }
  }, [accessGranted]);




  // Handle clicking escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const skipEntry = () => setAccessGranted(true);

  // Render entry gate
  if (!accessGranted) {
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
                key={idx}
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

  return (
    <>
      <Navbar />
      <div
        className={`${styles.dossierContainer} ${isArtistActive ? styles.artistMode : ''}`}
        id="dossier-root"
      >
        <div className={styles.filmGrain} />

        <MusicianSection setActiveCert={setActiveCert} />

        {/* -------------------------------------------------------------
            SECTION 02: MISSION LOGS
            ------------------------------------------------------------- */}
        <section className={styles.missionLogsSection} id="mission-logs">
          <div className={styles.gridOverlay} />

          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionCategory}>INTEL_LOGS // REPOSITORY</span>
            <h2 className={styles.logsLargeTitle}>MISSION LOGS</h2>
            <p className={styles.logsSubtitle}>Problems. Pressure. Deadlines.</p>
          </div>

          {/* 2-Column Split Dashboard */}
          <div className={styles.intelDashboard}>
            {/* Column 1: Pinned Evidence Board */}
            <div className={styles.boardCol}>
              <div className={styles.intelBoard}>
                {/* Background Classified Stamp */}
                <div className={styles.classifiedStampBg}>CLASSIFIED // TOP SECRET</div>

                {/* SVG Connecting threads (complex web of evidence) */}
                <svg className={styles.connectionsSvg} aria-hidden="true">
                  <line x1="18%" y1="20%" x2="30%" y2="68%" className={styles.logLine} />
                  <line x1="30%" y1="68%" x2="82%" y2="70%" className={styles.logLine} />
                  <line x1="82%" y1="70%" x2="78%" y2="22%" className={styles.logLine} />
                  <line x1="78%" y1="22%" x2="18%" y2="20%" className={styles.logLine} />
                  {/* Cross connections */}
                  <line x1="18%" y1="20%" x2="82%" y2="70%" className={styles.logLineCross} />
                  <line x1="30%" y1="68%" x2="78%" y2="22%" className={styles.logLineCross} />
                </svg>

                {missionLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`${styles.pinNode} ${hoveredLog?.id === log.id ? styles.pinNodeActive : ''}`}
                    style={{ left: log.coordinates.x, top: log.coordinates.y }}
                    onMouseEnter={() => setHoveredLog(log)}
                    onMouseLeave={() => setHoveredLog(null)}
                    onClick={() => setActiveCert(log)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View log details for ${log.name}`}
                    id={`intel-pin-${log.id.toLowerCase()}`}
                  >
                    <div className={styles.pinDot} />
                    <div className={styles.pinPulse} />

                    <div className={styles.evidencePolaroid}>
                      <div className={styles.polaroidPin} />
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
                          onClick={() => setActiveCert(hoveredLog)}
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
        </section>

        {/* -------------------------------------------------------------
            SECTION 03: THE ARTIST
            ------------------------------------------------------------- */}
        <section ref={artistRef} className={styles.artistSection} id="artist">
          <div className={styles.artistWrapper}>
            <div className={styles.sectionHeaderLeft}>
              <span className={styles.sectionCategoryLight}>ARCHIVE_CREATOR // OBSERVATIONS</span>
              <h2 className={styles.artistLargeTitle}>
                A PENCIL,<br />A PAGE,<br />AND A THOUSAND OBSERVATIONS.
              </h2>
            </div>

            {/* Museum Exhibition Gallery */}
            <div className={styles.museumGallery}>
              <div className={styles.museumRow}>
                {sketches.slice(0, 2).map((sketch, index) => (
                  <div className={styles.exhibitionFrame} id={`artwork-${index + 1}`} key={sketch.id}>
                    <div className={styles.artworkContainer}>
                      <div className={styles.canvasTexture} />
                      <Image
                        src={sketch.src}
                        alt={sketch.title}
                        fill
                        className={styles.sketchImage}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className={styles.museumTag}>
                      <span className={styles.tagNum}>{sketch.id}</span>
                      <h4 className={styles.tagTitle}>{sketch.title}</h4>
                      <p className={styles.tagMedium}>{sketch.medium}</p>
                      <p className={styles.tagYear}>{sketch.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {sketches[2] && (
                <div className={styles.museumRowSingle}>
                  <div className={styles.exhibitionFrameLarge} id="artwork-3">
                    <div className={styles.artworkContainerLarge}>
                      <div className={styles.canvasTexture} />
                      <Image
                        src={sketches[2].src}
                        alt={sketches[2].title}
                        fill
                        className={styles.sketchImage}
                        sizes="(max-width: 1024px) 100vw, 80vw"
                      />
                    </div>
                    <div className={styles.museumTag}>
                      <span className={styles.tagNum}>{sketches[2].id}</span>
                      <h4 className={styles.tagTitle}>{sketches[2].title}</h4>
                      <p className={styles.tagMedium}>{sketches[2].medium}</p>
                      <p className={styles.tagYear}>{sketches[2].year}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Collapsible/Expandable Sketches */}
              {showAllSketches && (
                <>
                  <div className={styles.museumRow}>
                    {sketches.slice(3, 5).map((sketch, index) => (
                      <div className={styles.exhibitionFrame} id={`artwork-${index + 4}`} key={sketch.id}>
                        <div className={styles.artworkContainer}>
                          <div className={styles.canvasTexture} />
                          <Image
                            src={sketch.src}
                            alt={sketch.title}
                            fill
                            className={styles.sketchImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className={styles.museumTag}>
                          <span className={styles.tagNum}>{sketch.id}</span>
                          <h4 className={styles.tagTitle}>{sketch.title}</h4>
                          <p className={styles.tagMedium}>{sketch.medium}</p>
                          <p className={styles.tagYear}>{sketch.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {sketches[5] && (
                    <div className={styles.museumRowSingle}>
                      <div className={styles.exhibitionFrameLarge} id="artwork-6">
                        <div className={styles.artworkContainerLarge}>
                          <div className={styles.canvasTexture} />
                          <Image
                            src={sketches[5].src}
                            alt={sketches[5].title}
                            fill
                            className={styles.sketchImage}
                            sizes="(max-width: 1024px) 100vw, 80vw"
                          />
                        </div>
                        <div className={styles.museumTag}>
                          <span className={styles.tagNum}>{sketches[5].id}</span>
                          <h4 className={styles.tagTitle}>{sketches[5].title}</h4>
                          <p className={styles.tagMedium}>{sketches[5].medium}</p>
                          <p className={styles.tagYear}>{sketches[5].year}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* View More Trigger */}
              <div className={styles.viewMoreContainer}>
                <button
                  className={styles.viewMoreBtn}
                  onClick={() => setShowAllSketches(!showAllSketches)}
                >
                  {showAllSketches ? 'RESTRICT ARCHIVE VIEW [ -3 SCHEMES ]' : 'DECRYPT ALL EXHIBITS [ +3 SCHEMES ]'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            SECTION 04: THROUGH MY LENS (Scrapbook Layout)
            ------------------------------------------------------------- */}
        <section className={styles.photographySection} id="photography">
          {/* Top Header */}
          <div className={styles.collageHeader}>
            <div className={styles.headerLeftText}>Documentation</div>
            <div className={styles.headerCenterText}>Created by Vedant</div>
            <div className={styles.headerRightText}>Typography & Details</div>
          </div>

          {/* Swatches Container */}
          <div className={styles.swatchesContainer}>
            <span className={`${styles.swatch} ${styles.swatchOlive}`} />
            <span className={`${styles.swatch} ${styles.swatchCharcoal}`} />
            <span className={`${styles.swatch} ${styles.swatchGrey}`} />
            <span className={`${styles.swatch} ${styles.swatchBlue}`} />
            <span className={`${styles.swatch} ${styles.swatchRust}`} />
          </div>

          {/* Archive Title Block */}
          <div className={styles.collageTitleBlock}>
            <span className={styles.collageSubTitle}>Archive ________</span>
            <h3 className={styles.collageMainTitle}>THROUGH MY LENS.</h3>
          </div>

          <div className={styles.collageContainer}>
            {/* Left Column */}
            <div className={styles.collageColumnLeft}>
              {col1Photos.map((item) => (
                <div
                  key={item.id}
                  className={styles.collagePhotoItem}
                  style={{ aspectRatio: item.aspectRatio }}
                  onClick={() => setActiveCert(item.src)}
                >
                  <Image
                    src={item.src}
                    alt="Editorial archive photography"
                    fill
                    className={styles.collageImg}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>

            {/* Center Column */}
            <div className={styles.collageColumnCenter}>
              {col2Photos.map((item) => (
                <div
                  key={item.id}
                  className={styles.collagePhotoItem}
                  style={{ aspectRatio: item.aspectRatio }}
                  onClick={() => setActiveCert(item.src)}
                >
                  <Image
                    src={item.src}
                    alt="Editorial archive photography"
                    fill
                    className={styles.collageImg}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className={styles.collageColumnRight}>
              {col3Photos.map((item) => (
                <div
                  key={item.id}
                  className={styles.collagePhotoItem}
                  style={{ aspectRatio: item.aspectRatio }}
                  onClick={() => setActiveCert(item.src)}
                >
                  <Image
                    src={item.src}
                    alt="Editorial archive photography"
                    fill
                    className={styles.collageImg}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className={styles.collageFooter}>
            <div className={styles.footerLeftText}>
              <p>Moments frozen in time, capturing the ordinary and the raw.</p>
              <p>An archive of places, light, and the people who made them memorable.</p>
              <p>Photography is not just about the frame; it is about the action of remembering.</p>
            </div>
            <div className={styles.footerDate}>
              <span>26</span>
              <span>Jun</span>
              <span>26</span>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            SECTION 05: THE HUMAN CALCULATOR
            ------------------------------------------------------------- */}
        <section className={styles.calculatorSection} id="calculator">
          <div className={styles.gridOverlay} />
          {/* Subtle math backdrop symbols floating */}
          <div className={styles.mathBackdrop}>
            <span>√x</span>
            <span>∑</span>
            <span>π</span>
            <span>∞</span>
            <span>f(x)</span>
            <span>∫</span>
          </div>

          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionCategory}>COGNITIVE // PERFORMANCE</span>
            <h2 className={styles.calculatorTitle}>THE HUMAN CALCULATOR</h2>
            <p className={styles.logsSubtitle}>Mental Math. Visual Processing. Logic Foundations.</p>
          </div>

          <div className={styles.calculatorGrid}>
            {/* Story Panel */}
            <div className={styles.calculatorStoryCard}>
              <div className={styles.storyTag}>DEVELOPMENT_RECORD // 2018</div>
              <h4 className={styles.storyHeadline}>COGNITIVE AWAKENING</h4>
              <p className={styles.storyBody}>
                Completed all progressive levels of Abacus Mental Mathematics at a very early stage. Rather than just calculation, this intense training served as a cognitive foundation that shaped my logical thinking and spatial processing.
              </p>
              <p className={styles.storyBody}>
                By learning to visualize and manipulate a virtual abacus inside my mind, I developed strong mental imagery and concentration. This early development laid the groundwork for my analytical capabilities as an engineer, enabling me to visualize complex logic flows and system architectures before writing code.
              </p>
              {/* Tech card corner brackets */}
              <div className={styles.cardCornerTopLeft} />
              <div className={styles.cardCornerBottomRight} />
            </div>

            {/* Polaroid Abacus Degree Photo */}
            <div className={styles.abacusDegreePolaroid}>
              <div className={styles.polaroidStamp}>CERTIFIED</div>
              <div className={styles.polaroidFrame}>
                <Image
                  src="/IMG20180211114741[1].jpg"
                  alt="Abacus Degree Certificate"
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className={styles.polaroidImg}
                />
              </div>
              <div className={styles.polaroidCaption}>
                <span className={styles.polaroidTitle}>ABACUS CERTIFICATE HOLDER</span>
                <span className={styles.polaroidDate}>CERTIFIED // FEB 2018</span>
              </div>
            </div>
          </div>

          {/* Interactive Abacus Engine Console */}
          <div className={styles.mathConsole}>
            <div className={styles.crtScanline} />
            <div className={styles.mathConsoleHeader}>
              <span>COGNITIVE_SOROBAN_ENGINE // ONLINE</span>
              <span className={styles.pulseActive}>●</span>
            </div>

            <div className={styles.abacusInterface}>
              {/* Left Side: Readings and Controls */}
              <div className={styles.abacusControlPanel}>
                <div className={styles.abacusReadoutGroup}>
                  <div className={styles.readoutLabel}>CURRENT LOGIC STATE</div>
                  <div className={styles.readoutValue}>{formatValue(abacusVal)}</div>
                </div>

                <div className={styles.abacusReadoutGroup}>
                  <div className={styles.readoutLabel}>COGNITIVE TARGET REGISTER</div>
                  <div className={styles.readoutValue} style={{ color: '#00ff66', textShadow: '0 0 10px rgba(0,255,102,0.4)' }}>
                    {formatValue(targetVal)}
                  </div>
                </div>

                <div className={styles.abacusActions}>
                  <button onClick={() => setAbacusVal([0, 0, 0, 0, 0, 0, 0])} className={styles.abacusButton}>
                    RESET COGNITION
                  </button>
                  <button onClick={generateNewChallenge} className={styles.abacusButton} style={{ borderColor: '#00ff66', color: '#00ff66' }}>
                    NEW TARGET
                  </button>
                </div>

                {getArrayValue(abacusVal) === getArrayValue(targetVal) ? (
                  <div className={styles.matchAlert}>
                    <span className={styles.matchCheck}>✓</span>
                    <span>COGNITIVE ALIGNMENT SECURED</span>
                  </div>
                ) : (
                  <div className={styles.matchPending}>
                    <span className={styles.pendingDot}>●</span>
                    <span>AWAITING INPUT SYNC...</span>
                  </div>
                )}
              </div>

              {/* Right Side: The Abacus */}
              <div className={styles.sorobanAbacus}>
                <div className={styles.abacusInnerFrame}>
                  {/* The Beam (Divider Bar) */}
                  <div className={styles.abacusBeam} />

                  {/* 7 rods */}
                  {Array.from({ length: 7 }).map((_, colIdx) => {
                    const digit = abacusVal[colIdx];
                    const upperActive = digit >= 5;
                    const lowerActiveCount = digit % 5;

                    return (
                      <div key={colIdx} className={styles.abacusRod}>
                        {/* Upper deck bead (index 5) */}
                        <div
                          className={`${styles.abacusBead} ${styles.upperBead} ${upperActive ? styles.beadActive : ''} ${upperActive ? styles.upperBeadActive : ''}`}
                          onClick={() => toggleUpperBead(colIdx)}
                        />

                        {/* Lower deck beads (index 1 to 4) */}
                        <div className={styles.lowerDeck}>
                          {[1, 2, 3, 4].map((beadNum) => {
                            const isBeadActive = beadNum <= lowerActiveCount;
                            return (
                              <div
                                key={beadNum}
                                className={`${styles.abacusBead} ${styles.lowerBead} ${isBeadActive ? styles.beadActive : ''} ${isBeadActive ? styles.lowerBeadActive : ''}`}
                                onClick={() => handleLowerBeadClick(colIdx, beadNum)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            ENDING SECTION
            ------------------------------------------------------------- */}
        <section className={styles.endingSection} id="ending">
          <div className={styles.endingOverlay} />

          <div className={styles.endingContent}>
            <h2 className={styles.endingHeadline}>
              THE ENGINEER YOU SAW<br />
              IS ONLY ONE PART OF THE STORY.
            </h2>

            <div className={styles.rolesRow}>
              <span>Competitor.</span>
              <span>Artist.</span>
              <span>Leader.</span>
            </div>

            <div className={styles.endingClosing}>
              <span>And always,</span>
              <strong>an engineer.</strong>
            </div>

            <Link href="/" className={styles.returnButton} id="dossier-return-btn">
              <span>RETURN TO PORTFOLIO</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M14.5 9H3.5M3.5 9L8 4.5M3.5 9L8 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </div>



      {activeCert && (
        <div
          className={styles.certModalOverlay}
          onClick={() => setActiveCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.certModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.certModalClose}
              onClick={() => setActiveCert(null)}
              aria-label="Close certificate"
            >
              [ CLOSE EVIDENCE × ]
            </button>

            {typeof activeCert !== 'string' ? (
              /* Split Layout for Certificates / Mission Logs (Responsive) */
              <div className={styles.certModalBody}>
                <div className={styles.certModalImageWrapper}>
                  <Image
                    src={activeCert.image}
                    alt={activeCert.name}
                    width={1000}
                    height={700}
                    className={styles.certFullImg}
                    priority
                  />
                </div>
                <div className={styles.certModalDetails}>
                  <div className={styles.certModalHeader}>
                    <span className={styles.certModalLabel}>LOG REPORT:</span>
                    <h3 className={styles.certModalTitle}>{activeCert.name}</h3>
                  </div>

                  <div className={styles.certModalMeta}>
                    <div>
                      <span className={styles.certModalLabel}>CLASSIFICATION / OUTCOME:</span>
                      <div className={styles.certModalVal} style={{ color: '#D4A017' }}>{activeCert.achievement}</div>
                    </div>
                    <div className={styles.certModalMetaRow}>
                      <div>
                        <span className={styles.certModalLabel}>YEAR:</span>
                        <span className={styles.certModalVal}>{activeCert.year}</span>
                      </div>
                      <div>
                        <span className={styles.certModalLabel}>ROLE:</span>
                        <span className={styles.certModalVal}>{activeCert.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.certModalDesc}>
                    <span className={styles.certModalLabel}>BRIEFING ANALYSIS:</span>
                    <p>{activeCert.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              /* Simple Image-Only Layout (for other sections like drawings/photos) */
              <div className={styles.certModalImageWrapper}>
                <Image
                  src={activeCert}
                  alt="Archive Asset Preview"
                  width={1000}
                  height={700}
                  className={styles.certFullImg}
                  priority
                />
              </div>
            )}

            <div className={styles.certModalFooter}>
              <span>ENCRYPTED_FILE_DECRYPTED</span>
              <span>VP_SYS_INTEL_BOARD</span>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
