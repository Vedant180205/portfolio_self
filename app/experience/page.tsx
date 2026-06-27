import Navbar from '../components/Navbar';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function ExperiencePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className={styles.hero} aria-label="Experience">

          {/* Right panel: full-height image flush to the right edge */}
          <div className={styles.rightPanel} aria-hidden="true">
            <Image
              src="/images/experience/b31c37b5dc844e188ca82baa30b2142e.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
              className={styles.rightPanelImage}
            />
            {/* Subtle dark overlay so white heading text is legible over the image */}
            <div className={styles.rightPanelOverlay} />
          </div>

          {/* Heading spans across both panels */}
          <h1 className={styles.heading}>
            BUILDING WITH THE<br />
            HUMAN MIND.
          </h1>

          {/* Bottom-left: accent line + description + CTA */}
          <div className={styles.bottomLeft}>
            <div className={styles.accentLine} />
            <p className={styles.description}>
              Turning ideas into production software through engineering, teamwork and a relentless drive to ship things that matter.
            </p>
            <Link href="#timeline" className={styles.ctaLink}>
              VIEW WORK
            </Link>
          </div>

          {/* Bottom-right: two small supporting cards */}
          <div className={styles.bottomCards}>
            <div className={styles.card}>
              <Image
                src="/images/experience/5c05cc0aa2a5a43d7b3274ad43d648e6.jpg"
                alt="Team collaboration"
                fill
                className={styles.cardImage}
              />
            </div>
            <div className={styles.card}>
              <Image
                src="/images/experience/d56e759309c6582fe0bc0a0ce84f33fc.jpg"
                alt="UI mockup on screen"
                fill
                className={styles.cardImage}
              />
            </div>
          </div>

          {/* Decorative background text — bottom right, partially off-screen */}
          <div className={styles.bgText} aria-hidden="true">MY JOURNEY</div>

        </section>

        <section id="timeline" className={styles.timeline}>

          {/* Section Header — left aligned */}
          <div className={styles.timelineHeader}>
            <span className={styles.timelineLabel}>✦ CAREER</span>
            <h2 className={styles.timelineTitle}>Career Journey</h2>
            <p className={styles.timelineSubtitle}>Every project, internship and opportunity that shaped my engineering journey.</p>
          </div>

          {/* Entry: Current Role */}
          <div className={styles.entry}>
            <div className={styles.entryTrack}>
              <div className={styles.nodeDotActive} />
              <div className={styles.trackLine} />
            </div>
            <div className={styles.entryContent}>
              <span className={styles.nodeLabel}>CURRENT ROLE</span>

              <div className={styles.expCard}>

                {/* Banner */}
                <div className={styles.bannerWrapper}>
                  <Image
                    src="/images/experience/version_next_technologies_pvt__ltd__cover.jpeg"
                    alt="Version Next Technologies"
                    fill
                    className={styles.bannerImage}
                    sizes="(max-width: 768px) 100vw, 65rem"
                    quality={85}
                  />
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>

                  {/* Role Section */}
                  <div className={styles.roleSection}>
                    <h3 className={styles.roleTitle}>Jr Full Stack Developer Intern</h3>
                    <p className={styles.companyName}>Version Next Technologies</p>
                    <p className={styles.metaText}><span className={styles.duration}>Jul 2026 — Present</span> &nbsp;·&nbsp; Mumbai, India &nbsp;·&nbsp; Hybrid</p>
                  </div>

                  <div className={styles.divider} />

                  {/* Bullets */}
                  <ul className={styles.bullets}>
                    <li>Built full-stack web applications and internal tools for production deployment.</li>
                    <li>Collaborated with cross-functional teams on feature development and code reviews.</li>
                    <li>Developed clean, maintainable and scalable code following engineering best practices.</li>
                    <li>Optimised existing workflows and contributed to improving team velocity.</li>
                  </ul>

                  <div className={styles.divider} />

                  {/* Tech Stack */}
                  <div className={styles.tags}>
                    {['Next.js', 'React', 'Node.js', 'TypeScript', 'MySQL', 'Git'].map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Entry: Future */}
          <div className={styles.entry}>
            <div className={styles.entryTrack}>
              <div className={styles.nodeDot} />
            </div>
            <div className={styles.entryContent}>
              <div className={styles.futurePlaceholder}>
                <p className={styles.futureTitle}>More experiences ahead.</p>
                <p className={styles.futureSubtitle}>Excited for what&apos;s next.</p>
              </div>
            </div>
          </div>

          <div className={styles.timelineFooter}>
            ✦ LET&apos;S BUILD THE FUTURE ✦
          </div>

        </section>
      </main>
    </>
  );
}
