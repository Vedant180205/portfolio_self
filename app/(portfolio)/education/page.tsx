import Image from 'next/image';
import styles from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education — Vedant Patil',
  description: 'Academic journey and institutions',
};

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

const FishIcon = ({ className, color = 'currentColor' }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 32 16" fill="none" stroke={color} strokeWidth="1.8" className={className}>
    <path d="M2,8 C8,2 20,2 24,8 C20,14 8,14 2,8 M24,8 L30,12 M24,8 L30,4" />
  </svg>
);


export default function EducationPage() {
  return (
    <main className={styles.mainContainer}>

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
              src="/images/education/hero_bg_custom.webp"
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
              <div className={`${styles.textOnlyBlock} ${styles.ruiaCard}`}>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src="/images/education/ruia_logo.png"
                    alt="Ramnivas Ruia Junior College Logo"
                    width={90}
                    height={90}
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
              <div className={`${styles.imageBlockWrapper} ${styles.ruiaImageWrapper}`}>
                <div className={styles.imageCornerYear}>
                  <span>2023</span>
                  <EyeIcon />
                </div>
                <div className={`${styles.imageContainer} ${styles.ruiaImageContainer}`}>
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
                    src="/images/education/sakec-v2.webp"
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
                src="/images/education/journey_continues.webp"
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
