'use client';

import Image from 'next/image';
import styles from './MusicianSection.module.css';

export default function MusicianSection() {


  return (
    <div className={styles.editorialContainer}>
      
      {/* SECTION TITLE */}
      <header className={styles.sectionHeader}>
        <div className={styles.heroBg}>
          <Image
            src="/images/music/A7R04326.JPG"
            alt="Vedant Patil Live On Stage"
            fill
            sizes="100vw"
            priority
            quality={75}
            className={styles.editorialHeroImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.headerContent}>
          <span className={styles.sectionCategory}>MUSIC // CHRONICLE</span>
          <h1 className={styles.massiveTitle}>10+ YEARS OF MUSIC.</h1>
          <p className={styles.sectionSubtitle}>
            From Hindustani Classical Vocals to Live Performances, Bass Guitar and Leadership.
          </p>
        </div>
      </header>

      {/* THE FOUNDATION */}
      <section className={styles.chapterSection}>
        <div className={styles.foundationSplit}>
          <div className={styles.foundationImageCol}>
            <div className={styles.portraitFrameContainer}>
              <div className={styles.foundationPortraitFrame}>
                <Image
                  src="/images/music/Untitled design.png"
                  alt="Hindustani Classical Riyaaz"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  quality={75}
                  className={styles.editorialImg}
                />
              </div>
            </div>
          </div>
          <div className={styles.foundationTextCol}>
            <span className={styles.chapterTag}>THE FOUNDATION</span>
            <h2 className={styles.chapterTitle}>IT STARTED WITH A SINGLE NOTE.</h2>
            <div className={styles.editorialTextContent}>
              <p className={styles.storyLead}>
                Started learning Hindustani Classical Music in 5th Standard.
              </p>
              <p className={styles.storyParagraph}>
                What began as basic instruction evolved into five progressive certification levels from Gandharva Mahavidyalaya. Years of discipline, breathing control, and early morning riyaaz built a permanent framework of logical structure and pitch-perfect focus.
              </p>
              <p className={styles.storyParagraph}>
                Completing these certifications was not just about passing exams, but about mastering the subtle nuances of raagas, performance composure, and complex rhythm cycles. This extensive training transformed what started as a childhood curiosity into a lifetime of structural thinking, patience, and a deep-seated appreciation for the art form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPANSION / TRANSITION */}
      <section className={styles.chapterSection}>
        <div className={styles.transitionCollageGrid}>
          
          {/* Intro / Title Card */}
          <div className={`${styles.introCardCollage} ${styles.cardRot1}`}>
            <span className={styles.chapterTag}>THE TRANSITION</span>
            <h2 className={styles.chapterTitle}>A NEW WORLD OF MUSIC.</h2>
            <div className={styles.cardDivider}></div>
            <p className={styles.storyLead}>
              Stepping out of my comfort zone of classical singing meant entering an entirely new acoustic landscape.
            </p>
          </div>

          {/* Photo 1 */}
          <div className={`${styles.photoCardCollage} ${styles.cardRot2}`}>
            <Image
              src="/images/music/WhatsApp Image 2026-06-11 at 8.00.48 PM.jpeg"
              alt="Exploring New Music Genres"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 400px"
              quality={75}
              className={styles.collagePhotoImg}
            />
          </div>

          {/* Info Card 1 */}
          <div className={`${styles.infoCardCollage} ${styles.cardRot3}`}>
            <span className={styles.cardBadge}>PHASE 01</span>
            <h3 className={styles.infoCardHeading}>Branching Out</h3>
            <p className={styles.infoCardText}>
              I transitioned from the microtones of Hindustani Classical Vocals to explore Western music theory, adapting my vocal grounding to rock, pop, and contemporary genres.
            </p>
          </div>

          {/* Photo 2 */}
          <div className={`${styles.photoCardCollage} ${styles.cardRot4}`}>
            <Image
              src="/images/music/WhatsApp Image 2026-06-11 at 8.01.19 PM.jpeg"
              alt="Band Session"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 400px"
              quality={75}
              className={styles.collagePhotoImg}
            />
          </div>

          {/* Info Card 2 */}
          <div className={`${styles.infoCardCollage} ${styles.cardRot5}`}>
            <span className={styles.cardBadge}>PHASE 02</span>
            <h3 className={styles.infoCardHeading}>Picking Up Guitar</h3>
            <p className={styles.infoCardText}>
              Picking up the acoustic guitar opened up a whole new realm of composition and self-accompaniment, moving from single-line melodies to complex chord progressions.
            </p>
          </div>

          {/* Photo 3 */}
          <div className={`${styles.photoCardCollage} ${styles.cardRot6}`}>
            <Image
              src="/images/music/WhatsApp Image 2026-06-11 at 1.16.24 PM.jpeg"
              alt="Classical Practice"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 400px"
              quality={75}
              className={styles.collagePhotoImg}
            />
          </div>

          {/* Info Card 3 */}
          <div className={`${styles.infoCardCollage} ${styles.cardRot7}`}>
            <span className={styles.cardBadge}>PHASE 03</span>
            <h3 className={styles.infoCardHeading}>Music Room Culture</h3>
            <p className={styles.infoCardText}>
              Diving headfirst into college music room culture and discovering the collaborative thrill of live band energy, jams, rehearsals, and late-night sets.
            </p>
          </div>

          {/* Photo 4 */}
          <div className={`${styles.photoCardCollage} ${styles.cardRot8}`}>
            <Image
              src="/images/music/WhatsApp Image 2026-06-11 at 1.15.37 PM.jpeg"
              alt="Backstage Prep"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 400px"
              quality={75}
              className={styles.collagePhotoImg}
            />
          </div>

          {/* Info Card 4 */}
          <div className={`${styles.infoCardCollageFullWidth} ${styles.cardRot9}`}>
            <span className={styles.cardBadge}>PHASE 04</span>
            <h3 className={styles.infoCardHeading}>Expanding the Comfort Zone</h3>
            <p className={styles.infoCardText}>
              Stepping out of the rigid, structured guidelines of classical training to embrace vocal experimentation, stage presence, and raw performance across multiple genres.
            </p>
          </div>

        </div>
      </section>

      {/* THE BASS PLAYER */}
      <section className={styles.chapterSection}>
        <div className={styles.bassSectionContainer}>
          {/* Full Width Bass Guitar Image Background */}
          <div className={styles.bassGuitarImageWrapper}>
            <Image
              src="/images/music/IMG_0280.JPG"
              alt="Bass Guitar Practice and Structure"
              fill
              sizes="100vw"
              quality={75}
              className={styles.bassGuitarImg}
            />
            {/* Gradient Mask for Legibility */}
            <div className={styles.bassOverlayMask}></div>
          </div>
          
          <div className={styles.bassContentGrid}>
            <div className={styles.bassTextOverlay}>
              <span className={styles.chapterTag}>THE BASS PLAYER</span>
              <h2 className={styles.bassHeading}>THEN I FOUND THE BASS.</h2>
              <p className={styles.bassParagraph}>
                Learning from fellow musicians and discovering a deep passion for rhythm, structure, and live performance. The bass became the anchor—the bridging force between structural beats and melodic expressions.
              </p>
            </div>

            <div className={styles.bassForegroundCollage}>
              {/* Single Photo Card */}
              <div className={styles.bassSingleCard}>
                <div className={styles.tapeStrip}></div>
                <Image
                  src="/images/music/WhatsApp Image 2026-03-01 at 11.06.58 AM.jpeg"
                  alt="Early Soundcheck Session"
                  width={300}
                  height={225}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  sizes="(max-width: 1024px) 100vw, 350px"
                  quality={75}
                  className={styles.collagePhotoImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE LEADER */}
      <section className={styles.chapterSection}>
        <div className={styles.leaderCollageGrid}>
          
          {/* Intro / Title Card */}
          <div className={`${styles.leaderInfoCard} ${styles.cardRot1}`} style={{ gridColumn: 'span 2' }}>
            <span className={styles.chapterTag}>MANAGEMENT & EVOLUTION</span>
            <h2 className={styles.chapterTitle}>FROM PERFORMER TO LEADER.</h2>
            <div className={styles.cardDivider}></div>
            <p className={styles.storyLead}>
              Transitioning from individual stage performance to organizing and orchestrating large-scale music events and team coordination.
            </p>
          </div>

          {/* Photo 1 */}
          <div className={`${styles.leaderPhotoCard} ${styles.cardRot2}`}>
            <Image
              src="/images/music/A7R04537.JPG"
              alt="Performer on Stage"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 400px"
              quality={75}
              className={styles.leaderPhotoImg}
            />
          </div>

          {/* Info Card 1 */}
          <div className={`${styles.leaderInfoCard} ${styles.cardRot3}`}>
            <span className={styles.cardBadge}>EVOLUTION 01</span>
            <h3 className={styles.infoCardHeading}>Core Member</h3>
            <p className={styles.infoCardText}>
              Managed schedules, routed instrument setups, and coordinated technical rehearsals for the core college music group.
            </p>
          </div>

          {/* Photo 2 */}
          <div className={`${styles.leaderPhotoCard} ${styles.cardRot4}`}>
            <Image
              src="/images/music/WhatsApp Image 2026-06-11 at 11.09.56 PM.jpeg"
              alt="Stage Monitoring Setup"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 400px"
              quality={75}
              className={styles.leaderPhotoImg}
            />
          </div>

          {/* Info Card 2 */}
          <div className={`${styles.leaderInfoCard} ${styles.cardRot5}`}>
            <span className={styles.cardBadge}>EVOLUTION 02</span>
            <h3 className={styles.infoCardHeading}>Stage Manager</h3>
            <p className={styles.infoCardText}>
              Coordinated live performances, oversaw stage monitoring setups, mixing sound checks, and live setlists.
            </p>
          </div>

          {/* Photo 3 */}
          <div className={`${styles.leaderPhotoCard} ${styles.cardRot6}`}>
            <Image
              src="/images/music/WhatsApp Image 2026-06-11 at 11.10.38 PM.jpeg"
              alt="Backstage Live Coordination"
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1024px) 100vw, 400px"
              quality={75}
              className={styles.leaderPhotoImg}
            />
          </div>

          {/* Combined Info Card 3 */}
          <div className={`${styles.leaderInfoCard} ${styles.cardRot7}`} style={{ gridColumn: 'span 2' }}>
            <span className={styles.cardBadge}>EVOLUTION 03</span>
            <h3 className={styles.infoCardHeading}>Solo Competition Co-Head</h3>
            <p className={styles.infoCardText}>
              Co-headed the solo singing competition, leading technical operations, scoring systems, and judge panel coordination.
            </p>
          </div>

        </div>
      </section>



      {/* ENDING */}
      <section className={styles.endingSection}>
        <div className={styles.endingImageWrapper}>
          <Image
            src="/images/music/A7R04326.JPG"
            alt="Spotlight Performance"
            fill
            sizes="100vw"
            quality={75}
            className={styles.endingBgImg}
          />
        </div>
        <div className={styles.endingVignette} />
        
        <div className={styles.endingContent}>
          <h2 className={styles.endingQuoteMain}>MUSIC WAS NEVER A HOBBY.</h2>
          <h2 className={styles.endingQuoteSub}>IT BECAME PART OF WHO I AM.</h2>
          
        </div>
      </section>

    </div>
  );
}
