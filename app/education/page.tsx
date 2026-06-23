'use client';

import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from './page.module.css';

// SVG Icons matching the visual theme
const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.eyeIcon}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ToriiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.badgeIcon}>
    <rect x="2" y="5" width="20" height="2" rx="0.5" fill="currentColor" />
    <path d="M3,3 Q12,5 21,3" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <rect x="6" y="7" width="2.5" height="15" fill="currentColor" />
    <rect x="15.5" y="7" width="2.5" height="15" fill="currentColor" />
    <rect x="6" y="10" width="12" height="2" fill="currentColor" />
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const SchoolIcon = () => (
  <svg width="52" height="52" viewBox="0 0 64 64" fill="none" className={styles.cardIcon}>
    {/* Board/diploma */}
    <rect x="10" y="28" width="44" height="28" rx="2" stroke="currentColor" strokeWidth="2.5" />
    {/* Mortarboard top */}
    <polygon points="32,6 58,20 32,30 6,20" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Mortarboard cap top flat */}
    <polygon points="32,6 58,20 32,30 6,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Tassel string */}
    <line x1="58" y1="20" x2="58" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Tassel bob */}
    <circle cx="58" cy="36" r="2.5" fill="currentColor" />
    {/* Diploma scroll lines */}
    <line x1="20" y1="39" x2="44" y2="39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="22" y1="45" x2="42" y2="45" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    {/* Star accent */}
    <polygon points="32,34 33.5,37 37,37 34.5,39 35.5,43 32,41 28.5,43 29.5,39 27,37 30.5,37" fill="currentColor" opacity="0.75" />
  </svg>
);

const BookIcon = () => (
  <svg width="52" height="52" viewBox="0 0 64 64" fill="none" className={styles.cardIcon}>
    {/* Nucleus */}
    <circle cx="32" cy="32" r="4.5" fill="currentColor" />
    {/* Orbit 1 — horizontal ellipse */}
    <ellipse cx="32" cy="32" rx="24" ry="9" stroke="currentColor" strokeWidth="2.2" fill="none" />
    {/* Orbit 2 — tilted 60° */}
    <ellipse cx="32" cy="32" rx="24" ry="9" stroke="currentColor" strokeWidth="2.2" fill="none" transform="rotate(60 32 32)" />
    {/* Orbit 3 — tilted -60° */}
    <ellipse cx="32" cy="32" rx="24" ry="9" stroke="currentColor" strokeWidth="2.2" fill="none" transform="rotate(-60 32 32)" />
    {/* Electron dots */}
    <circle cx="56" cy="32" r="2.5" fill="currentColor" opacity="0.8" />
    <circle cx="20" cy="18" r="2.5" fill="currentColor" opacity="0.8" />
    <circle cx="20" cy="46" r="2.5" fill="currentColor" opacity="0.8" />
  </svg>
);

const SakecCrestIcon = () => (
  <svg width="52" height="52" viewBox="0 0 64 64" fill="none" className={styles.cardIcon}>
    {/* CPU outer body */}
    <rect x="16" y="16" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="2.5" />
    {/* Inner core */}
    <rect x="23" y="23" width="18" height="18" rx="1.5" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.12" />
    {/* Circuit pins — top */}
    <line x1="24" y1="16" x2="24" y2="8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="32" y1="16" x2="32" y2="8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="40" y1="16" x2="40" y2="8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    {/* Circuit pins — bottom */}
    <line x1="24" y1="48" x2="24" y2="56" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="32" y1="48" x2="32" y2="56" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="40" y1="48" x2="40" y2="56" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    {/* Circuit pins — left */}
    <line x1="16" y1="24" x2="8" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="16" y1="32" x2="8" y2="32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="16" y1="40" x2="8" y2="40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    {/* Circuit pins — right */}
    <line x1="48" y1="24" x2="56" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="48" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="48" y1="40" x2="56" y2="40" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    {/* Inner cross pattern */}
    <line x1="28" y1="28" x2="36" y2="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
    <line x1="36" y1="28" x2="28" y2="36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
    <circle cx="32" cy="32" r="2.5" fill="currentColor" />
  </svg>
);

const FishIcon = ({ className, color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 32 16" fill="none" stroke={color} strokeWidth="1.8" className={className}>
    <path d="M2,8 C8,2 20,2 24,8 C20,14 8,14 2,8 M24,8 L30,12 M24,8 L30,4" />
  </svg>
);

const JapaneseArtwork = () => (
  <div className={styles.artworkContainer} aria-hidden="true">
    <svg viewBox="0 0 500 300" fill="none" className={styles.artworkSvg}>
      {/* Sun / Solar circle */}
      <circle cx="370" cy="110" r="42" fill="#cc2424" />
      
      {/* Mount Fuji silhouette */}
      <polygon points="170,240 270,110 370,240" fill="#dcdcd8" stroke="#111111" strokeWidth="1.5" />
      <polygon points="243,145 270,110 297,145 285,138 270,142 255,138" fill="#ffffff" stroke="#111111" strokeWidth="1.5" />

      {/* Torii Gate (Accent Red) */}
      <g transform="translate(100, 110)" className={styles.toriiGate}>
        {/* Top curved beams */}
        <path d="M -5,22 Q 60,32 125,22" stroke="#cc2424" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M -10,12 Q 60,25 130,12" stroke="#cc2424" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Horizontal tie bar */}
        <rect x="8" y="42" width="104" height="8" fill="#cc2424" />
        {/* Verticals */}
        <line x1="24" y1="28" x2="20" y2="130" stroke="#cc2424" strokeWidth="11" />
        <line x1="96" y1="28" x2="100" y2="130" stroke="#cc2424" strokeWidth="11" />
        {/* Center label holder */}
        <rect x="56" y="28" width="8" height="15" fill="#cc2424" />
      </g>

      {/* Bridge structure */}
      <path d="M 180,240 Q 320,165 460,240" stroke="#111111" strokeWidth="6" fill="none" />
      <path d="M 180,254 Q 320,179 460,254" stroke="#111111" strokeWidth="5" fill="none" />
      
      {/* Bridge rails */}
      <line x1="190" y1="235" x2="190" y2="255" stroke="#111111" strokeWidth="2.5" />
      <line x1="230" y1="214" x2="230" y2="242" stroke="#111111" strokeWidth="2.5" />
      <line x1="270" y1="202" x2="270" y2="234" stroke="#111111" strokeWidth="2.5" />
      <line x1="310" y1="195" x2="310" y2="232" stroke="#111111" strokeWidth="2.5" />
      <line x1="350" y1="196" x2="350" y2="233" stroke="#111111" strokeWidth="2.5" />
      <line x1="390" y1="205" x2="390" y2="239" stroke="#111111" strokeWidth="2.5" />
      <line x1="430" y1="222" x2="430" y2="249" stroke="#111111" strokeWidth="2.5" />
      <line x1="450" y1="233" x2="450" y2="255" stroke="#111111" strokeWidth="2.5" />

      {/* Silhouette of a person standing on bridge */}
      <g transform="translate(305, 172)" fill="#111111" className={styles.person}>
        {/* Kasa Hat */}
        <path d="M -3,4 Q 3,0 9,4 L 11,7 L -5,7 Z" />
        {/* Head */}
        <circle cx="3" cy="8.5" r="2.2" />
        {/* Kimono */}
        <path d="M -1,11 L 7,11 L 9,23 L -3,23 Z" />
        {/* Arms folded */}
        <path d="M 0,11 Q -4,15 1,18" stroke="#111111" strokeWidth="2.2" fill="none" />
      </g>
      
      {/* Minimalist ring decoration */}
      <circle cx="450" cy="275" r="8" stroke="#111111" strokeWidth="2" fill="none" />
    </svg>
  </div>
);

export default function EducationPage() {
  return (
    <main className={styles.mainContainer}>
      <Navbar />

      {/* HERO SECTION */}
      <section className={styles.heroSection} aria-label="Hero Title">
        {/* Left Vertical Strip */}
        <div className={styles.heroVerticalStrip}>
          <span>EDUCATION</span>
        </div>

        {/* Hero Building Background & Layout */}
        <div className={styles.heroGrid}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/education/hero_bg_custom.png"
              alt="Engineering evolution backdrop"
              width={1920}
              height={1080}
              priority
              quality={90}
              sizes="100vw"
              className={styles.heroImage}
            />
            
            {/* Stacked Large Hero Text */}
            <div className={styles.heroTextContainer}>
              <h1 className={styles.heroTitle}>
                <span className={styles.accentText}>THE</span>
                <span className={styles.whiteText}>EVOLUTION</span>
                <span className={styles.whiteText}>OF AN</span>
                <span className={styles.accentText}>ENGINEER</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.pageContent}>

        {/* INTRODUCTION BLOCKS (Overlapping Hero background image) */}
        <section className={styles.introSection}>
          <div className={styles.introGrid}>
            {/* Left Block: Circle */}
            <div className={styles.circleBlockWrapper}>
              <div className={styles.circleBlock}>
                <h3 className={styles.circleTitle}>A Journey of Learning</h3>
                <p className={styles.circleText}>
                  A timeline of growth,<br />
                  curiosity, and transformation<br />
                  that shaped the engineer<br />
                  I am today.
                </p>
                <div className={styles.circleDivider}>
                  <svg width="60" height="8" fill="none" viewBox="0 0 60 8">
                    <path d="M0,4 Q7.5,1 15,4 T30,4 T45,4 T60,4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className={styles.circleDot} />
              </div>
            </div>

            {/* Right Block: Rectangle */}
            <div className={styles.rectangleBlock}>
              <h3 className={styles.rectTitle}>
                EDUCATION <span className={styles.accentText}>JOURNEY</span>
              </h3>
              <p className={styles.rectDescription}>
                From building strong academic foundations to exploring core scientific concepts and finally engineering real-world systems. Three phases. One continuous pursuit of building, learning, and solving.
              </p>
              <div className={styles.rectSolidBar} />
            </div>

            {/* Floating Infinity/Fish Icon to the right */}
            <div className={styles.floatingInfinityWrapper}>
              <FishIcon className={styles.introFish} color="#cc2424" />
            </div>
          </div>
        </section>

        {/* PHASES CONTAINER - Stacked with zero vertical and horizontal gaps */}
        <div className={styles.phasesContainer}>
          
          {/* PHASE 1: VIVEKANAND ENGLISH HIGH SCHOOL */}
          <section className={styles.phaseSection}>
            <div className={styles.phaseGrid}>
              {/* Left Column: Bordered Card */}
              <div className={styles.borderedCard}>
                <div className={styles.cardBadge}>
                  <span>01</span>
                  <EyeIcon />
                </div>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src="/images/education/vehs_logo.png"
                    alt="Vivekanand English High School Logo"
                    width={110}
                    height={110}
                    className={styles.institutionLogo}
                  />
                </div>
                <h3 className={styles.cardTitle}>
                  VIVEKANAND ENGLISH <span className={styles.accentText}>HIGH SCHOOL</span>
                </h3>
                <p className={styles.cardSubtitle}>Secondary Schooling (SSC)</p>
                <p className={styles.cardDescription}>
                  Established the core foundations of analytical thinking, academic discipline, and scientific curiosity. A strong focus on mathematics and science shaped the problem-solving mindset that later evolved into engineering.
                </p>
                <div className={styles.cardDividerLine} />
              </div>

              {/* Right Column: Image with centered badge */}
              <div className={styles.imageBlockWrapper}>
                <div className={styles.imageCornerYear}>
                  <span>2021</span>
                  <EyeIcon />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/education/vehs.jpg"
                    alt="Vivekanand English High School"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className={styles.phaseImage}
                  />
                  
                  {/* Centered Circular Badge */}
                  <div className={styles.circularBadge}>
                    <span className={styles.badgeLabel}>FIRST</span>
                    <span className={styles.badgeLabel}>FOUNDATION</span>
                    <ToriiIcon />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PHASE 2: RAMNIVAS RUIA JUNIOR COLLEGE */}
          <section className={styles.phaseSection}>
            {/* Floating Fish Outlines on the Left */}
            <div className={styles.fishOutlinesContainer}>
              <FishIcon className={styles.floatingFish1} color="#111111" />
              <FishIcon className={styles.floatingFish2} color="#cc2424" />
              <FishIcon className={styles.floatingFish3} color="#111111" />
              <FishIcon className={styles.floatingFish4} color="#cc2424" />
              <FishIcon className={styles.floatingFish5} color="#111111" />
            </div>

            <div className={styles.phaseGrid}>
              {/* Left Column: Plain Text Info */}
              <div className={styles.textOnlyBlock}>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src="/images/education/ruia_logo.png"
                    alt="Ramnivas Ruia Junior College Logo"
                    width={110}
                    height={110}
                    className={styles.institutionLogo}
                  />
                </div>
                <h3 className={styles.cardTitle}>
                  RAMNIVAS RUIA <span className={styles.accentText}>JUNIOR COLLEGE</span>
                </h3>
                <p className={styles.cardSubtitle}>Higher Secondary Education (HSC)</p>
                <p className={styles.cardDescription}>
                  Strengthened my understanding of Physics, Chemistry, and Mathematics while preparing for competitive engineering entrance exams. Developed a deeper appreciation for logical reasoning and scientific problem-solving, transitioning from academic excellence to technical specialization.
                </p>
                <div className={styles.cardDividerLine} />
              </div>

              {/* Right Column: Image */}
              <div className={styles.imageBlockWrapper}>
                <div className={styles.imageCornerYear}>
                  <span>2023</span>
                  <EyeIcon />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/education/ruia.png"
                    alt="Ramnivas Ruia Junior College"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className={styles.phaseImage}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* PHASE 3: SHAH & ANCHOR KUTCHHI ENGINEERING COLLEGE */}
          <section className={styles.phaseSection}>
            <div className={styles.phaseGrid}>
              {/* Left Column: Bordered Card */}
              <div className={styles.borderedCard}>
                <div className={styles.cardBadge}>
                  <span>02</span>
                  <EyeIcon />
                </div>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src="/images/education/sakec_logo.jpeg"
                    alt="Shah & Anchor Kutchhi Engineering College Logo"
                    width={110}
                    height={110}
                    className={styles.institutionLogo}
                  />
                </div>
                <h3 className={styles.cardTitle}>
                  SHAH & ANCHOR <span className={styles.accentText}>ENGINEERING COLLEGE</span>
                </h3>
                <p className={styles.cardSubtitle}>Bachelor of Technology (Electronics & Computer Science)</p>
                <p className={styles.cardDescription}>
                  Translating engineering principles into intelligent systems. Building solutions across artificial intelligence, machine learning, quantitative models, and full-stack development.
                </p>
                <div className={styles.cardDividerLine} />
              </div>

              {/* Right Column: Image with centered badge */}
              <div className={styles.imageBlockWrapper}>
                <div className={styles.imageCornerYear}>
                  <span>2028</span>
                  <EyeIcon />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src="/images/education/sakec-v2.png"
                    alt="Shah & Anchor Kutchhi Engineering College"
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className={styles.phaseImage}
                  />
                  
                  {/* Centered Circular Badge */}
                  <div className={styles.circularBadge}>
                    <span className={styles.badgeLabel}>BUILDING</span>
                    <span className={styles.badgeLabel}>SYSTEMS</span>
                    <CodeIcon />
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* BOTTOM SECTION */}
        <section className={styles.bottomSection}>
          <div className={styles.bottomGrid}>
            {/* Left Column: Story End Box */}
            <div className={styles.endingRectangleBlock}>
              <h3 className={styles.endingTitle}>
                THE JOURNEY<br />
                <span className={styles.accentText}>CONTINUES</span>
              </h3>
              <p className={styles.endingDescription}>
                Every phase built the foundation for the next. From curiosity to knowledge, from knowledge to application, from application to impact. The pursuit of engineering the impossible never stops.
              </p>
              <div className={styles.rectSolidBar} />
            </div>

            {/* Right Column: Image */}
            <div className={styles.artworkBlockWrapper}>
              <Image
                src="/images/education/journey_continues.png"
                alt="The journey continues"
                width={1536}
                height={1024}
                quality={90}
                sizes="(max-width: 768px) 100vw, 600px"
                className={styles.journeyImage}
              />
            </div>
          </div>

          {/* Centered Bottom Progress Indicator */}
          <div className={styles.bottomProgressIndicator}>
            <div className={styles.progressBarActive} />
            <span className={styles.progressText}>03 / 03</span>
            <div className={styles.progressBarInactive} />
          </div>
        </section>

      </div>
    </main>
  );
}
