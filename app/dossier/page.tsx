'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './page.module.css';

// -------------------------------------------------------------
// TYPES & DATA DEFINITIONS
// -------------------------------------------------------------

interface StoryBlock {
  title: string;
  subtitle: string;
  bullets: string[];
}

interface MediaItem {
  id: string;
  title: string;
  type: string;
  description: string;
  storyKey: 'classical' | 'western' | 'stage';
}

const stories: Record<'classical' | 'western' | 'stage', StoryBlock> = {
  classical: {
    title: 'CLASSICAL FOUNDATION',
    subtitle: 'Trained Hindustani Classical Vocalist',
    bullets: [
      'Began formal training in Hindustani Classical Vocal music in the 5th standard.',
      'Completed 5 progressive levels of the prestigious Gandharva Mahavidyalaya examinations.',
      'Gained deep mastery over classical Raagas, Swaras, and rhythm structures (Taal).'
    ]
  },
  western: {
    title: 'WESTERN EXPANSION',
    subtitle: 'Self-Taught Instrumental Development',
    bullets: [
      'Transitioned classical vocal theories to western musical instrumentation.',
      'Learned western music theory, chord progressions, and scales.',
      'Acoustic Guitar: Developed fingerstyle techniques and rhythm playing.',
      'Bass Guitar: Focused on groove design, complex basslines, and syncopation.'
    ]
  },
  stage: {
    title: 'STAGE & LEADERSHIP',
    subtitle: 'Live Performances and Group Management',
    bullets: [
      'Performed live at multiple college festivals and cultural showcases.',
      'Core Member and leader of the college music group, managing live audio and setups.',
      'Co-Headed and organized solo singing events, managing over 50+ participants and logistics.',
      'Experienced in stage direction, band arrangements, and musical collaboration.'
    ]
  }
};

const mediaGallery: MediaItem[] = [
  {
    id: 'M-01',
    title: 'Childhood Classical Vocals',
    type: 'CLASSICAL ARCHIVE',
    description: 'Early years of Hindustani Classical training, mastering raagas and vocal control.',
    storyKey: 'classical'
  },
  {
    id: 'M-02',
    title: 'Gandharva Mahavidyalaya',
    type: 'CERTIFICATE ARCHIVE',
    description: 'Verification of 5 levels completed under the Gandharva Mahavidyalaya board.',
    storyKey: 'classical'
  },
  {
    id: 'M-03',
    title: 'Bass Guitar Grooves',
    type: 'INSTRUMENT ARCHIVE',
    description: 'Session playing focusing on low-end frequencies, syncopation, and driving rhythm.',
    storyKey: 'western'
  },
  {
    id: 'M-04',
    title: 'College Fest Spotlight',
    type: 'LIVE PERFORMANCE',
    description: 'On-stage performing classical-rock fusion set in front of a live crowd.',
    storyKey: 'stage'
  },
  {
    id: 'M-05',
    title: 'Music Group Leadership',
    type: 'LEADERSHIP RECORD',
    description: 'Coordinating rehearsals, managing soundboards, and arranging band pieces.',
    storyKey: 'stage'
  }
];

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
    title: 'THE STUDY OF EXPRESSION',
    medium: 'Charcoal & Graphite on Art Paper',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 02',
    src: '/ved_sketch/20230926_232747.jpg',
    title: 'THE STUDY OF GAZE',
    medium: 'Fine Pencil Drawing',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 03',
    src: '/ved_sketch/20241202_222420.jpg',
    title: 'THE REFLECTION OF SPIRIT',
    medium: 'Detailed Graphite Sketch',
    year: 'c. 2024'
  },
  {
    id: 'EXHIBIT 04',
    src: '/ved_sketch/20230926_232844.jpg',
    title: 'PERSPECTIVE STUDY',
    medium: 'Ink & Graphite Drawing',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 05',
    src: '/ved_sketch/20230926_232914.jpg',
    title: 'SHADOW SILHOUETTE',
    medium: 'Fine Charcoal Blending',
    year: 'c. 2023'
  },
  {
    id: 'EXHIBIT 06',
    src: '/ved_sketch/20230926_233120.jpg',
    title: 'THE ANATOMY OF SILENCE',
    medium: 'Fine Line Pencil Sketch',
    year: 'c. 2023'
  }
];

interface Photo {
  id: string;
  src: string;
  title: string;
  lens: string;
  specs: string;
  location: string;
  year: string;
  palette: string[];
  aspectRatio: string;
}

const photos: Photo[] = [
  {
    id: 'PHOTO 01',
    src: '/photography_sect/20230530_190843.jpg',
    title: 'SILHOUETTE GEOMETRY',
    lens: 'FE 50mm F1.8',
    specs: '1/250s · f/4.5 · ISO 100',
    location: 'OUTDOOR FIELD TELEMETRY',
    year: '2023',
    palette: ['#070708', '#201614', '#59392b', '#c2875f', '#fadaa2'],
    aspectRatio: '4080 / 3060'
  },
  {
    id: 'PHOTO 02',
    src: '/photography_sect/20230528_063251.jpg',
    title: 'THE REFLECTION OF DAWN',
    lens: 'FE 28-70mm F3.5-5.6',
    specs: '1/160s · f/5.6 · ISO 200',
    location: 'WETLANDS MONITORING',
    year: '2023',
    palette: ['#0a141d', '#2f3b4c', '#757c8b', '#cca59d', '#ffd8c8'],
    aspectRatio: '2296 / 4080'
  },
  {
    id: 'PHOTO 03',
    src: '/photography_sect/20230425_165853.jpg',
    title: 'THE CHROME PERSPECTIVE',
    lens: 'FE 85mm F1.8',
    specs: '1/320s · f/2.2 · ISO 400',
    location: 'URBAN PROFILE SENSOR',
    year: '2023',
    palette: ['#0a0b0f', '#2c353f', '#7d8a97', '#ccdbe3', '#b86b43'],
    aspectRatio: '4080 / 3060'
  },
  {
    id: 'PHOTO 04',
    src: '/photography_sect/20230528_063441.jpg',
    title: 'STREET SYMMETRY INDEX',
    lens: 'FE 50mm F1.8',
    specs: '1/125s · f/2.8 · ISO 400',
    location: 'STREET CROSSING TRANSIT',
    year: '2023',
    palette: ['#0b0c0e', '#3a3d40', '#9ea2a6', '#e1e5eb', '#cc2a2a'],
    aspectRatio: '2282 / 3761'
  },
  {
    id: 'PHOTO 05',
    src: '/photography_sect/20230529_184440.jpg',
    title: 'LANDSCAPE DUSK SHADOWS',
    lens: 'FE 35mm F1.4',
    specs: '1/80s · f/1.8 · ISO 800',
    location: 'METROPOLITAN OBSERVATORY',
    year: '2023',
    palette: ['#0c0d16', '#262947', '#5f5478', '#a87e8e', '#fca381'],
    aspectRatio: '4080 / 3060'
  }
];

export default function DossierPage() {
  // Page entry states
  const [accessGranted, setAccessGranted] = useState(false);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // Musician interactive states
  const [activeStory, setActiveStory] = useState<StoryBlock | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mission logs state
  const [hoveredLog, setHoveredLog] = useState<MissionLog | null>(null);
  const [activeCert, setActiveCert] = useState<string | null>(null);

  // Section backgrounds & scrolling
  const [isArtistActive, setIsArtistActive] = useState(false);
  const artistRef = useRef<HTMLDivElement | null>(null);

  // Sketch gallery visibility
  const [showAllSketches, setShowAllSketches] = useState(false);

  // Photography section visibility
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  // Abacus Math animation numbers
  const [mathNumbers, setMathNumbers] = useState<number[]>([1, 0, 8, 4, 9, 2, 7, 5]);

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

  // Canvas Soundwave Animation
  useEffect(() => {
    if (!accessGranted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 180;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      phase += 0.015;

      // Draw 3 overlapping transparent waves
      const waves = [
        { amplitude: 25, frequency: 0.005, opacity: 0.05, color: '#ffffff' },
        { amplitude: 15, frequency: 0.008, opacity: 0.06, color: '#D4A017' },
        { amplitude: 8, frequency: 0.012, opacity: 0.04, color: '#ffffff' }
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.strokeStyle = w.color;
        ctx.globalAlpha = w.opacity;
        ctx.lineWidth = 1.5;

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * w.frequency + phase) *
              w.amplitude *
              Math.sin(x * 0.002); // Taper at edges
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [accessGranted]);

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



  // Abacus Math falling numbers
  useEffect(() => {
    if (!accessGranted) return;
    const interval = setInterval(() => {
      setMathNumbers(
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
      );
    }, 180);
    return () => clearInterval(interval);
  }, [accessGranted]);

  // Handle clicking escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveStory(null);
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

        {/* -------------------------------------------------------------
            SECTION 01: THE MUSICIAN
            ------------------------------------------------------------- */}
        <section className={styles.musicianSection} id="musician">
          <div className={styles.soundwaveWrapper}>
            <canvas ref={canvasRef} className={styles.soundwaveCanvas} />
            <div className={styles.musicalNotesLayer}>
              <span>♩</span>
              <span>♫</span>
              <span>♬</span>
              <span>♭</span>
              <span>♯</span>
              <span>∮</span>
            </div>
          </div>

          <div className={styles.musicHero}>
            <div className={styles.musicHeroContent}>
              <span className={styles.sectionCategory}>SECTION 01 // ARCHIVE_MUSIC</span>
              <h2 className={styles.musicLargeTitle}>[MUSIC]</h2>
              <h3 className={styles.musicSubtitle}>15+ YEARS OF MUSICAL JOURNEY</h3>
              <p className={styles.musicSubtext}>
                From Hindustani Classical Vocals to Live Stage Performances and Bass Guitar.
              </p>
              
              <div className={styles.musicTechSpecs}>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>VOX RANGE</span>
                  <strong className={styles.specVal}>HINDUSTANI CLASSICAL</strong>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>INSTRUMENTS</span>
                  <strong className={styles.specVal}>BASS & ACOUSTIC GUITAR</strong>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specLabel}>EXPERIENCE</span>
                  <strong className={styles.specVal}>15+ YEARS ACTIVE</strong>
                </div>
              </div>
            </div>
            
            <div className={styles.musicHeroImageWrapper}>
              <div className={styles.singerGlow} />
              <div className={styles.singerImageContainer}>
                <Image
                  src="/singer_pose2.PNG"
                  alt="Vedant Patil Singing"
                  width={600}
                  height={750}
                  className={styles.singerImage}
                  priority
                />
              </div>
              <div className={styles.singerVignette} />
              <div className={styles.singerTag}>
                <span>RECORD_SUBJECT: PATIL_V</span>
                <span>DESATURATED_SPECS: 24-BIT // RAW</span>
              </div>
            </div>
          </div>

          {/* Horizontal Gallery */}
          <div className={styles.galleryTrackWrapper}>
            <div className={styles.galleryTrack}>
              {mediaGallery.map((item) => (
                <div
                  key={item.id}
                  className={styles.mediaPanel}
                  onClick={() => setActiveStory(stories[item.storyKey])}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open story: ${item.title}`}
                  id={`media-panel-${item.id.toLowerCase()}`}
                >
                  <div className={styles.panelOverlay} />
                  <div className={styles.panelFrame}>
                    <div className={styles.panelTechTag}>{item.id} {'//'} {item.type}</div>
                    
                    {/* Placeholder image container */}
                    <div className={styles.imagePlaceholder}>
                      <div className={styles.placeholderLines} />
                      <div className={styles.placeholderLabel}>
                        <span>NO IMAGE LOADED</span>
                        <small>AWAITING ASSET COMMAND</small>
                      </div>
                    </div>

                    <div className={styles.panelInfo}>
                      <h4 className={styles.panelTitle}>{item.title}</h4>
                      <p className={styles.panelDesc}>{item.description}</p>
                      <span className={styles.panelCta}>DECRYPT DOSSIER REPORT →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            SECTION 02: MISSION LOGS
            ------------------------------------------------------------- */}
        <section className={styles.missionLogsSection} id="mission-logs">
          <div className={styles.gridOverlay} />
          
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionCategory}>SECTION 02 // INTEL_LOGS</span>
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
                    onClick={() => setActiveCert(log.image)}
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
                          onClick={() => setActiveCert(hoveredLog.image)}
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
              <span className={styles.sectionCategoryLight}>SECTION 03 // ARCHIVE_CREATOR</span>
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
            SECTION 04: THROUGH MY LENS
            ------------------------------------------------------------- */}
        <section className={styles.photographySection} id="photography">
          <div className={styles.photographyWrapper}>
            <div className={styles.sectionHeaderLeft}>
              <span className={styles.sectionCategory}>SECTION 04 // THROUGH_MY_LENS</span>
              <h2 className={styles.photographyTitle}>
                THROUGH MY LENS.
              </h2>
            </div>

            {/* Photo Exhibition Collage Layout */}
            <div className={styles.photoJournalCollage}>
              {/* Column 1 (Left Column) */}
              <div className={styles.photoCollageCol1}>
                {photos[3] && (
                  <div className={styles.journalItem} key={photos[3].id}>
                    <div 
                      className={styles.photoContainer}
                      style={{ aspectRatio: photos[3].aspectRatio }}
                    >
                      <Image
                        src={photos[3].src}
                        alt={photos[3].title}
                        fill
                        unoptimized
                        className={styles.photoImage}
                      />
                    </div>
                    <div className={styles.photoTag}>
                      <span className={styles.photoTagNum}>{photos[3].id}</span>
                      <h4 className={styles.photoTagTitle}>{photos[3].title}</h4>
                      <p className={styles.photoTagSpecs}>{photos[3].lens} {'//'} {photos[3].specs}</p>
                      <p className={styles.photoTagLocation}>{photos[3].location} {'//'} {photos[3].year}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Column 2 (Center Column) */}
              <div className={styles.photoCollageCol2}>
                {photos[0] && (
                  <div className={styles.journalItem} key={photos[0].id}>
                    <div 
                      className={styles.photoContainer}
                      style={{ aspectRatio: photos[0].aspectRatio }}
                    >
                      <Image
                        src={photos[0].src}
                        alt={photos[0].title}
                        fill
                        unoptimized
                        className={styles.photoImage}
                      />
                    </div>
                    <div className={styles.photoTag}>
                      <span className={styles.photoTagNum}>{photos[0].id}</span>
                      <h4 className={styles.photoTagTitle}>{photos[0].title}</h4>
                      <p className={styles.photoTagSpecs}>{photos[0].lens} {'//'} {photos[0].specs}</p>
                      <p className={styles.photoTagLocation}>{photos[0].location} {'//'} {photos[0].year}</p>
                    </div>
                  </div>
                )}

                {showAllPhotos && (
                  <>
                    {photos[2] && (
                      <div className={styles.journalItem} key={photos[2].id}>
                        <div 
                          className={styles.photoContainer}
                          style={{ aspectRatio: photos[2].aspectRatio }}
                        >
                          <Image
                            src={photos[2].src}
                            alt={photos[2].title}
                            fill
                            unoptimized
                            className={styles.photoImage}
                          />
                        </div>
                        <div className={styles.photoTag}>
                          <span className={styles.photoTagNum}>{photos[2].id}</span>
                          <h4 className={styles.photoTagTitle}>{photos[2].title}</h4>
                          <p className={styles.photoTagSpecs}>{photos[2].lens} {'//'} {photos[2].specs}</p>
                          <p className={styles.photoTagLocation}>{photos[2].location} {'//'} {photos[2].year}</p>
                        </div>
                      </div>
                    )}

                    {photos[4] && (
                      <div className={styles.journalItem} key={photos[4].id}>
                        <div 
                          className={styles.photoContainer}
                          style={{ aspectRatio: photos[4].aspectRatio }}
                        >
                          <Image
                            src={photos[4].src}
                            alt={photos[4].title}
                            fill
                            unoptimized
                            className={styles.photoImage}
                          />
                        </div>
                        <div className={styles.photoTag}>
                          <span className={styles.photoTagNum}>{photos[4].id}</span>
                          <h4 className={styles.photoTagTitle}>{photos[4].title}</h4>
                          <p className={styles.photoTagSpecs}>{photos[4].lens} {'//'} {photos[4].specs}</p>
                          <p className={styles.photoTagLocation}>{photos[4].location} {'//'} {photos[4].year}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Column 3 (Right Column) */}
              <div className={styles.photoCollageCol3}>
                {photos[1] && (
                  <div className={styles.journalItem} key={photos[1].id}>
                    <div 
                      className={styles.photoContainer}
                      style={{ aspectRatio: photos[1].aspectRatio }}
                    >
                      <Image
                        src={photos[1].src}
                        alt={photos[1].title}
                        fill
                        unoptimized
                        className={styles.photoImage}
                      />
                    </div>
                    <div className={styles.photoTag}>
                      <span className={styles.photoTagNum}>{photos[1].id}</span>
                      <h4 className={styles.photoTagTitle}>{photos[1].title}</h4>
                      <p className={styles.photoTagSpecs}>{photos[1].lens} {'//'} {photos[1].specs}</p>
                      <p className={styles.photoTagLocation}>{photos[1].location} {'//'} {photos[1].year}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

              {/* View More Trigger */}
              <div className={styles.photoViewMoreContainer}>
                <button
                  className={styles.photoViewMoreBtn}
                  onClick={() => setShowAllPhotos(!showAllPhotos)}
                >
                  {showAllPhotos ? 'RESTRICT ARCHIVE VIEW [ -2 RECORDS ]' : 'DECRYPT ALL EXHIBITS [ +2 RECORDS ]'}
                </button>
              </div>
            </div>
        </section>

        {/* -------------------------------------------------------------
            SECTION 05: THE HUMAN CALCULATOR
            ------------------------------------------------------------- */}
        <section className={styles.calculatorSection} id="calculator">
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionCategory}>SECTION 05 // QUANT_COGNITION</span>
            <h2 className={styles.calculatorTitle}>THE HUMAN CALCULATOR</h2>
            <h3 className={styles.calculatorSubtitle}>Mental Mathematics Specialist</h3>
          </div>

          <div className={styles.calculatorGrid}>
            <div className={styles.mathConsole}>
              <div className={styles.mathConsoleHeader}>
                <span>COGNITIVE_NUMERIC_SHELL // ONLINE</span>
                <span className={styles.pulseActive}>●</span>
              </div>
              
              <div className={styles.mathStream}>
                {/* Visual number columns */}
                <div className={styles.numbersGrid}>
                  {mathNumbers.map((num, i) => (
                    <div key={i} className={styles.numColumn}>
                      <span className={styles.runningNum}>{num}</span>
                      <span className={styles.runningNum}>{(num + 3) % 10}</span>
                      <span className={styles.runningNum}>{(num + 7) % 10}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.abacusDisplay}>
                  <div className={styles.abacusFrame}>
                    <div className={styles.abacusDivider} />
                    {Array.from({ length: 7 }).map((_, col) => (
                      <div key={col} className={styles.abacusCol}>
                        <div className={styles.abacusBead} style={{ top: col % 2 === 0 ? '5px' : '20px' }} />
                        <div className={styles.abacusBead} style={{ top: col % 3 === 0 ? '55px' : '75px' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.consoleStatus}>
                <span>LEVEL: COMPLETED ALL LEVEL EXAMS</span>
                <span>SYSTEM: ABACUS MENTAL MATHEMATICS</span>
              </div>
            </div>

            <div className={styles.attributesBlock}>
              <div className={styles.attrCard} id="attr-speed">
                <h4>SPEED</h4>
                <p>Instantaneous calculation triggers, executing arithmetic operations in fractions of a second without paper aids.</p>
              </div>
              <div className={styles.attrCard} id="attr-concentration">
                <h4>CONCENTRATION</h4>
                <p>Sustained high-focus states, maintaining memory registers of multiple numbers simultaneously under noise.</p>
              </div>
              <div className={styles.attrCard} id="attr-visualization">
                <h4>VISUALIZATION</h4>
                <p>Mental abacus mapping: spatial translation of mathematical problems onto a virtual abacus inside the mind.</p>
              </div>
              <div className={styles.attrCard} id="attr-reasoning">
                <h4>NUMERICAL REASONING</h4>
                <p>Rapid pattern recognition, dividing complex problems into structured quantitative logic segments instantly.</p>
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
              <span>Singer.</span>
              <span>Musician.</span>
              <span>Performer.</span>
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

      {/* -------------------------------------------------------------
          STORY DETAILS MODAL OVERLAY
          ------------------------------------------------------------- */}
      {activeStory && (
        <div
          className={styles.modalOverlay}
          onClick={() => setActiveStory(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setActiveStory(null)}
              aria-label="Close details"
            >
              [ CLOSE RECORD × ]
            </button>
            <div className={styles.modalConsoleLine} />
            <div className={styles.modalBody}>
              <span className={styles.modalTag}>CLASSIFIED // PATIL_V</span>
              <h3 id="modal-title" className={styles.modalTitle}>{activeStory.title}</h3>
              <h4 className={styles.modalSubtitle}>{activeStory.subtitle}</h4>
              <ul className={styles.modalList}>
                {activeStory.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.modalBullet}>
                    <span className={styles.bulletPointer}>&gt;</span>
                    <p>{bullet}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.modalFooter}>
              <span>SECURITY: CONFIDENTIAL</span>
              <span>VP_SYS_DYN_STORY</span>
            </div>
          </div>
        </div>
      )}

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
            <div className={styles.certModalImageWrapper}>
              <Image
                src={activeCert}
                alt="Hackathon Certificate Evidence"
                width={1000}
                height={700}
                className={styles.certFullImg}
                priority
              />
            </div>
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
