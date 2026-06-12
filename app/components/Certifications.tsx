'use client';

import styles from './Certifications.module.css';

const certs = [
  {
    id: 'cert-1',
    index: '01',
    issuer: 'Cisco',
    title: 'Data Analytics',
    description: 'Querying, transforming, and modeling data to extract actionable business intelligence from complex datasets.',
    url: 'https://drive.google.com/file/d/1wbC7HA7anC_3Esf0Zs3BXdn3XbI--axM/view?usp=sharing',
    date: '2026',
    category: 'AI & DATA',
    catClass: 'catAiData',
  },
  {
    id: 'cert-2',
    index: '02',
    issuer: 'ExcelR',
    title: 'AIML & Power BI',
    description: 'Machine learning pipelines and professional-grade data visualization using Power BI dashboards for analytics.',
    url: 'https://drive.google.com/file/d/1FTG1aWfd2iuYqaohcuX_HPomTvgCSZc2/view?usp=sharing',
    date: '2025',
    category: 'AI & DATA',
    catClass: 'catAiData',
  },
  {
    id: 'cert-3',
    index: '03',
    issuer: 'Cisco',
    title: 'Data Science Essentials',
    description: 'Core data science concepts, analytics methodologies, and Python tools for data-driven exploration.',
    url: 'https://drive.google.com/file/d/12dzyGm9Fwm70P9iZIR6RXIzthGdfev9B/view?usp=sharing',
    date: '2025',
    category: 'AI & DATA',
    catClass: 'catAiData',
  },
  {
    id: 'cert-4',
    index: '04',
    issuer: 'Infosys',
    title: 'C++',
    description: 'Object-oriented design, memory management, and structured systems programming in C++.',
    url: 'https://drive.google.com/file/d/19zQz-rCrrI4MLawaZCZZVlnffnYK9Qqj/view?usp=sharing',
    date: '2025',
    category: 'SOFTWARE DEV',
    catClass: 'catSoftware',
  },
  {
    id: 'cert-5',
    index: '05',
    issuer: 'Infosys',
    title: 'Python',
    description: 'Core Python programming, data structures, and procedural logic patterns for real-world applications.',
    url: 'https://drive.google.com/file/d/1w5c_wZAZbIow1l1NxjNftwq9J5rgrZKw/view?usp=sharing',
    date: '2024',
    category: 'SOFTWARE DEV',
    catClass: 'catSoftware',
  },
  {
    id: 'cert-6',
    index: '06',
    issuer: 'Spoken Tutorial',
    title: 'Java Training',
    description: 'Structured Java programming covering object-oriented concepts, inheritance, and application design.',
    url: 'https://drive.google.com/file/d/1fGg8xFkjT0wh-S9xdxWTIu4IacUS65sQ/view?usp=sharing',
    date: '2024',
    category: 'SOFTWARE DEV',
    catClass: 'catSoftware',
  },
  {
    id: 'cert-7',
    index: '07',
    issuer: 'NPTEL',
    title: 'German Language',
    description: 'Foundational German vocabulary, grammar structures, pronunciation, and conversational competency.',
    url: 'https://drive.google.com/file/d/10JsUK_uTvz76qxiD-8W6ou3Bed34p-xY/view?usp=sharing',
    date: '2025',
    category: 'LANGUAGES',
    catClass: 'catLanguages',
  },
];

function ArrowUpRight() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 11L11 2M11 2H4.5M11 2V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Certifications() {
  return (
    <section className={styles.section} id="certifications" aria-label="Certifications">
      <span className={styles.bgWatermark} aria-hidden="true">07</span>

      <div className={styles.container}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>CREDENTIALS</span>
            <h2 className={styles.title}>Certifications.</h2>
          </div>
          {/* Stats bar */}
          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statNum}>07</span>
              <span className={styles.statLabel}>Total</span>
            </div>
            <span className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>03</span>
              <span className={styles.statLabel}>Domains</span>
            </div>
            <span className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>2024–26</span>
              <span className={styles.statLabel}>Span</span>
            </div>
          </div>
        </div>

        {/* ── Bento Magazine Grid ── */}
        <div className={styles.grid}>
          {certs.map((cert) => (
            <a
              key={cert.id}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.card} ${styles[cert.catClass as keyof typeof styles]}`}
              id={`cert-${cert.id}`}
              aria-label={`View ${cert.title} by ${cert.issuer}`}
            >
              {/* Faded index number */}
              <span className={styles.cardBgNum} aria-hidden="true">{cert.index}</span>

              {/* Card top row */}
              <div className={styles.cardTop}>
                <span className={styles.cardCategory}>{cert.category}</span>
                <span className={styles.cardDate}>{cert.date}</span>
              </div>

              {/* Body */}
              <div className={styles.cardBody}>
                <span className={styles.cardIssuer}>{cert.issuer}</span>
                <h3 className={styles.cardTitle}>{cert.title}</h3>
                <p className={styles.cardDesc}>{cert.description}</p>
              </div>

              {/* Footer */}
              <div className={styles.cardFooter}>
                <span className={styles.viewCta}>
                  VIEW CREDENTIAL <ArrowUpRight />
                </span>
              </div>

              {/* Accent line bottom (animates in on hover) */}
              <span className={styles.cardAccentLine} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
