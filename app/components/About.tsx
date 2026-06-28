import styles from './About.module.css';

function ArrowDownIcon() {
  return (
    <svg
      className={styles.resumeIcon}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function About() {
  return (
    <section className={styles.section} id="about" aria-label="About">
      {/* Decorative glows */}
      <div className={styles.glowLeft} aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />

      {/* Corner bracket accents */}
      <div className={styles.cornerTL} aria-hidden="true" />
      <div className={styles.cornerBR} aria-hidden="true" />

      {/* Content */}
      <div className={styles.inner}>

        <h2 className={styles.heading}>What Defines My Work</h2>

        {/* Meta strip */}
        <div className={styles.metaStrip}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Recognition</span>
            <span className={styles.metaValue}>4× Hackathon Winner</span>
          </div>
          <div className={styles.metaDivider} aria-hidden="true" />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Location</span>
            <span className={styles.metaValue}>Mumbai, India</span>
          </div>
          <div className={styles.metaDivider} aria-hidden="true" />
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Email</span>
            <a href="mailto:vedbhumi123@gmail.com" className={styles.metaLink}>
              vedbhumi123@gmail.com
            </a>
          </div>
        </div>

        {/* Main copy */}
        <div className={styles.body}>
          <p className={styles.para}>
            <strong>Electronics and Computer Science</strong> student building engineering systems
            across software and hardware domains. My projects span{' '}
            <strong>IoT systems</strong>, <strong>backend applications</strong>,{' '}
            <strong>machine learning solutions</strong>, and <strong>data-driven applications</strong> — with a
            focus on building practical systems that solve real-world problems.
          </p>
          <p className={styles.para}>
            Currently strengthening foundations in{' '}
            <strong>data structure and algorithms</strong>, <strong>embedded systems</strong>, and low-level
            programming while exploring system-oriented engineering domains.
          </p>
        </div>

        {/* Resume CTA */}
        <a
          href="https://drive.google.com/file/d/1ZSy1FW-6aWlZugjsOIPU0rK0etNAOTlA/view"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeBtn}
          id="about-resume-btn"
          aria-label="View resume on Google Drive"
        >
          <ArrowDownIcon />
          <span>View Resume</span>
        </a>
      </div>
    </section>
  );
}
