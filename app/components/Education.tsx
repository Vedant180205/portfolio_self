import Link from 'next/link';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section className={styles.section} id="education" aria-label="Education Teaser">
      <div className={styles.container}>
        <span className={styles.eyebrow}>EDUCATION</span>
        <h2 className={styles.title}>THE EVOLUTION OF AN ENGINEER</h2>
        <p className={styles.subtitle}>
          A journey through analytical foundations, scientific exploration, and building intelligent systems.
        </p>
        <Link href="/education" className={styles.exploreBtn} id="home-explore-education-btn">
          <span>EXPLORE JOURNEY</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
}
