import React from 'react';
import { DossierClientWrapper } from '@/app/components/dossier/DossierClientWrapper';
import { MissionLogBoard } from '@/app/components/dossier/MissionLogBoard';
import MusicianSection from '@/app/components/MusicianSection';
import SketchCarousel from '@/app/components/dossier/SketchCarousel';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

// ---------- Data ----------
interface MissionLog {
  id: string;
  name: string;
  year: string;
  role: string;
  achievement: string;
  description: React.ReactNode;
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
    description: (
      <>
        Secured <strong>3rd Prize</strong> at the <strong>IO Hackathon 2026</strong>, hosted by <strong>IIT Guwahati</strong> in collaboration with <strong>AQUA (Advanced Quantitative Analytics)</strong> and organized by the <strong>Finance & Economics Club - IIT Guwahati</strong>. Worked with <strong>Sahil Rane</strong> as team <strong>QuantDevs</strong>. Developed a valuation-driven <strong>Python</strong> system accelerated via <strong>Numba JIT</strong> for pricing <strong>American options on NVIDIA (NVDA)</strong> using <strong>Binomial Cox–Ross–Rubinstein (CRR)</strong> and <strong>Black–Scholes</strong> models, live <strong>yfinance</strong> data, and <strong>Sharpe/Sortino ratios</strong>.
      </>
    ),
    coordinates: { x: '18%', y: '20%' },
    image: '/hackathon_certs/WhatsApp Image 2026-03-08 at 8.48.49 AM.jpeg'
  },
  {
    id: 'LOG-02',
    name: 'Code Sprint',
    year: '2026',
    role: 'Logic & Implementation',
    achievement: 'WINNER — 1ST PLACE (XIE MAHIM)',
    description: (
      <>
        Secured <strong>1st Place</strong> at <strong>Code Sprint</strong>, a high-pressure <strong>4-hour hackathon</strong> hosted at <strong>Xavier’s Institute of Engineering, Mahim</strong>. Worked with <strong>Team CodeRunners</strong> alongside <strong>Saiprasad Jamdar</strong> (Backend & AI lead), <strong>Rajnish Rao</strong> (Full-Stack & Design), and <strong>Sahil Rane</strong> (Frontend & Ideation). Contributed to <strong>logic building and implementation</strong> under extremely tight timelines.
      </>
    ),
    coordinates: { x: '30%', y: '68%' },
    image: '/hackathon_certs/codesprint_cert.jpeg'
  },
  {
    id: 'LOG-03',
    name: 'Kaggle Knight',
    year: '2026',
    role: 'Machine Learning Engineer',
    achievement: 'WINNER — 1ST PLACE (IIT JODHPUR)',
    description: (
      <>
        Secured <strong>1st Place</strong> at the <strong>Kaggle Knight – 36 Hour ML Hackathon</strong>, hosted at <strong>IIT Jodhpur, Rajasthan</strong> and organized by <strong>Prometeo IIT Jodhpur</strong>. Partnered with <strong>Sahil Rane</strong> as <strong>Team nightknight</strong>, focusing on <strong>ML fundamentals</strong>, <strong>clean execution</strong>, and prioritizing <strong>clarity and signal over complexity</strong> under intense pressure.
      </>
    ),
    coordinates: { x: '78%', y: '22%' },
    image: '/hackathon_certs/kagglenight_cert.png'
  },
  {
    id: 'LOG-04',
    name: 'AMUHACKS 5.0',
    year: '2026',
    role: 'Full-Stack Developer',
    achievement: 'WINNER — 1ST PLACE (AMUHACKS)',
    description: (
      <>
        Secured <strong>1st Place</strong> at <strong>AMUHACKS 5.0</strong> (<strong>4th hackathon win</strong>). Worked with <strong>Sahil Rane</strong> as <strong>Team CyberDevs</strong>, enduring an intense coding grind and late-night coding sessions to build and launch a <strong>fully functional system</strong>.
      </>
    ),
    coordinates: { x: '82%', y: '70%' },
    image: '/hackathon_certs/Vedant_Patil_CyberDevs.png'
  }
];

interface Photo {
  id: string;
  src: string;
  aspectRatio: number;
  alt: string;
}

const col1Photos: Photo[] = [
  {
    id: 'C1_01',
    src: '/images/photography/20230530_190843.jpg',
    aspectRatio: 3 / 4,
    alt: 'Black and white portrait of a musician in studio'
  },
  {
    id: 'C1_02',
    src: '/images/photography/20230528_112806.jpg',
    aspectRatio: 3 / 4,
    alt: 'Close-up of vintage camera on wooden table'
  },
  {
    id: 'C1_03',
    src: '/images/photography/20240223_171922.jpg',
    aspectRatio: 3 / 4,
    alt: 'Street photography - rainy night'
  },
  {
    id: 'C1_04',
    src: '/images/photography/20230528_063251.jpg',
    aspectRatio: 2296 / 4080,
    alt: 'Architectural detail - iron gate'
  }
];

const col2Photos: Photo[] = [
  {
    id: 'C2_01',
    src: '/images/photography/20230529_184440.jpg',
    aspectRatio: 3 / 4,
    alt: 'Urban landscape with dramatic sky'
  },
  {
    id: 'C2_02',
    src: '/images/photography/20230528_063441.jpg',
    aspectRatio: 2282 / 3761,
    alt: 'Candid shot of a street vendor'
  },
  {
    id: 'C2_03',
    src: '/images/photography/20240603_100635.jpg',
    aspectRatio: 2576 / 3985,
    alt: 'Abstract shadows on concrete wall'
  },
  {
    id: 'C2_04',
    src: '/images/photography/20251217_071811.jpg',
    aspectRatio: 4 / 3,
    alt: 'Golden hour silhouette against the horizon'
  }
];

const col3Photos: Photo[] = [
  {
    id: 'C3_01',
    src: '/images/photography/20240603_183133.jpg',
    aspectRatio: 1836 / 3398,
    alt: 'Macro photography of autumn leaves'
  },
  {
    id: 'C3_02',
    src: '/images/photography/20240606_094433.jpg',
    aspectRatio: 2448 / 3264,
    alt: 'Minimalist composition with negative space'
  },
  {
    id: 'C3_03',
    src: '/images/photography/20230425_165853.jpg',
    aspectRatio: 3 / 4,
    alt: 'Historical monument viewed from an angle'
  },
  {
    id: 'C3_04',
    src: '/images/photography/20251220_174915.jpg',
    aspectRatio: 4 / 3,
    alt: 'Low light evening scene in the city'
  }
];

export default function DossierPage() {
  return (
    <DossierClientWrapper>
      <MusicianSection />
      
      {/* Interactive parts */}
      <section className={styles.missionLogsSection} id="mission-logs">
        <div className={styles.gridOverlay} />
        <div className={styles.sectionHeaderCentered}>
          <span className={styles.sectionCategory}>INTEL_LOGS // REPOSITORY</span>
          <h2 className={styles.logsLargeTitle}>MISSION LOGS</h2>
          <p className={styles.logsSubtitle}>Problems. Pressure. Deadlines.</p>
        </div>
        <MissionLogBoard logs={missionLogs} />
      </section>

      <section className={styles.topperSection} id="topper">
          <div className={styles.gridOverlay} />
          <div className={styles.topperWrapper}>
            <div className={styles.sectionHeaderCentered}>
              <span className={styles.sectionCategory}>ACADEMIC_INTEL // ACHIEVEMENT</span>
              <h2 className={styles.topperHeadline}>FIRST YEAR TOPPER ACROSS ALL BRANCHES</h2>
              <p className={styles.logsSubtitle}>Consistently pursuing academic and engineering excellence.</p>
            </div>

            <div className={styles.topperGrid}>
              {/* Left Column: Intelligence Dossier Briefing Card */}
              <div className={styles.topperBriefing}>
                <div className={styles.topperHighlightBox}>
                  <span className={styles.topperLabel}>CLASSIFICATION / PERFORMANCE:</span>
                  <div className={styles.topperHighlightVal}>RANK 1 — PERFECT 10/10 SGPA (YEAR I)</div>
                </div>

                <div className={styles.topperMetaGrid}>
                  <div>
                    <span className={styles.topperLabel}>YEAR:</span>
                    <span className={styles.topperVal}>2023 - 2024</span>
                  </div>
                  <div>
                    <span className={styles.topperLabel}>ROLE:</span>
                    <span className={styles.topperVal}>ECS Engineering Student</span>
                  </div>
                </div>

                <div className={styles.topperDescBlock}>
                  <p className={styles.topperDescText}>
                    Achieved a <strong>perfect 10.0 SGPA</strong> in both <strong>Semesters I and II</strong> during the first year of engineering. Secured the <strong>highest SGPA in the college across all engineering branches</strong>, demonstrating academic excellence alongside project building.
                  </p>
                </div>
              </div>

              {/* Right Column: Pinned Certificate Polaroid Frame */}
              <div 
                className={styles.topperCertFrame} 
                
                
                
                
              >
                <Image
                  src="/certs/Untitled design (1).webp"
                  alt="First Year Topper 10 SGPA Certificate"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className={styles.topperCertImg}
                />
                <div className={styles.topperCertOverlayText}>DECRYPT EVIDENCE [ CLICK TO PREVIEW ]</div>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            SECTION 03: THE ARTIST (3D Arc Drag & Wheel Carousel)
            ------------------------------------------------------------- */}
        <SketchCarousel />

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
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
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
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
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
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
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
                Completed all progressive levels of <strong>Abacus Mental Mathematics</strong> at a very early stage. Rather than just calculation, this intense training served as a <strong>cognitive foundation</strong> that shaped my <strong>logical thinking</strong> and <strong>spatial processing</strong>.
              </p>
              <p className={styles.storyBody}>
                By learning to <strong>visualize and manipulate a virtual abacus inside my mind</strong>, I developed strong <strong>mental imagery and concentration</strong>. This early development laid the groundwork for my analytical capabilities as an engineer, enabling me to <strong>visualize complex logic flows and system architectures</strong> before writing code.
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
                  src="/images/avatar/IMG20180211114741.jpg"
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
        </section>

        {/* -------------------------------------------------------------
            SECTION 06: SCOUT RECOGNITION
            ------------------------------------------------------------- */}
        <section className={styles.scoutSection} id="scout">
          {/* Optimized Next.js Background */}
          <div className={styles.scoutBgWrapper}>
            <Image
              src="/images/avatar/487bfac8885504aa1ed6bab2cf15012c.jpg"
              alt="Scout Background"
              fill
              quality={85}
              sizes="100vw"
              className={styles.scoutBgImage}
            />
            <div className={styles.scoutBgOverlay} />
          </div>

          <div className={styles.sectionHeaderCentered}>
            <span className={styles.sectionCategory}>LEADERSHIP // SERVICE</span>
            <h2 className={styles.scoutTitle}>RAJYAPURASKAR AWARD</h2>
            <p className={styles.scoutSubtitle}>Maharashtra State Bharat Scouts and Guides</p>
          </div>

          <div className={styles.scoutGrid}>
            {/* Left Image */}
            <div className={styles.scoutImageFrame}>
              <Image
                src="/images/avatar/2b241dbf5e952c772351e0a5e702b4b8.jpg"
                alt="Vedant Scout"
                fill
                quality={85}
                sizes="(max-width: 768px) 100vw, 400px"
                className={styles.scoutImg}
              />
            </div>

            {/* Middle Description */}
            <div className={styles.calculatorStoryCard}>
              <div className={styles.storyTag}>RECOGNITION_RECORD // 2020–2021</div>
              <p className={styles.storyBody}>
                Awarded the Rajyapuraskar by the Bharat Scouts and Guides, Maharashtra State for successful completion of the 2020–2021 state-level proficiency requirements.
              </p>
              <p className={styles.storyBody}>
                The recognition reflects demonstrated discipline, community service, leadership, outdoor skills, and commitment to the values of Scouting and Guiding.
              </p>
              <div className={styles.cardCornerTopLeft} />
              <div className={styles.cardCornerBottomRight} />
            </div>

            {/* Right Certificate */}
            <div 
              className={styles.scoutCertContainer} 
              
              
              
              aria-label="View Scout Certificate"
            >
              <Image
                src="/certs/scout_cert.webp"
                alt="Rajyapuraskar Certificate"
                width={800}
                height={1131}
                quality={85}
                sizes="(max-width: 768px) 100vw, 500px"
                className={styles.scoutCertImg}
              />
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
              THE ENGINEER YOU SAW IS ONLY ONE PART OF THE STORY.
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
      
    </DossierClientWrapper>
  );
}
