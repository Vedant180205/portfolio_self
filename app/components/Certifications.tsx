'use client';

import { useState, useMemo } from 'react';
import styles from './Certifications.module.css';

interface CertItem {
  id: string;
  index: string;
  issuer: string;
  title: string;
  description: string;
  url: string;
  date: string;
  category: string;
  catClass: string;
  domainGroup: 'AI & Data' | 'Development' | 'Design' | 'Languages';
  badge: string;
}

const certs: CertItem[] = [
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
    domainGroup: 'AI & Data',
    badge: 'ANALYTICS',
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
    domainGroup: 'AI & Data',
    badge: 'MACHINE LEARNING',
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
    domainGroup: 'AI & Data',
    badge: 'DATA SCIENCE',
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
    domainGroup: 'Development',
    badge: 'SYSTEMS / OOP',
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
    domainGroup: 'Development',
    badge: 'CORE PYTHON',
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
    domainGroup: 'Development',
    badge: 'JAVA OOP',
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
    domainGroup: 'Design',
    badge: 'GLOBAL COMM',
  },
];

function ArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 11L11 2M11 2H4.5M11 2V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IssuerLogo({ issuer }: { issuer: string }) {
  const norm = issuer.toLowerCase().trim();

  if (norm.includes('cisco')) {
    return (
      <svg viewBox="0 0 48 30" width="34" height="22" fill="#00BCEB" aria-label="Cisco">
        <rect x="2" y="10" width="3.2" height="18" rx="1.6" />
        <rect x="7.8" y="4" width="3.2" height="24" rx="1.6" />
        <rect x="13.6" y="10" width="3.2" height="18" rx="1.6" />
        <rect x="19.4" y="0" width="3.2" height="28" rx="1.6" />
        <rect x="25.2" y="0" width="3.2" height="28" rx="1.6" />
        <rect x="31" y="10" width="3.2" height="18" rx="1.6" />
        <rect x="36.8" y="4" width="3.2" height="24" rx="1.6" />
        <rect x="42.6" y="10" width="3.2" height="18" rx="1.6" />
      </svg>
    );
  }

  if (norm.includes('infosys')) {
    return (
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#007CC3' }}>
        infy
      </span>
    );
  }

  if (norm.includes('excelr')) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>
        <span style={{ color: '#FF4500', fontSize: '1.15rem' }}>E</span>
        <span style={{ color: '#00B4D8', fontSize: '0.85rem' }}>R</span>
      </div>
    );
  }

  if (norm.includes('spoken') || norm.includes('iit')) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
        <span style={{ color: '#FF7A00', fontSize: '0.75rem', fontWeight: 900, fontFamily: 'var(--font-heading)' }}>IITB</span>
        <span style={{ color: '#888', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>SPOKEN</span>
      </div>
    );
  }

  // NPTEL / SWAYAM / Languages
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
      <span style={{ color: '#FF4500', fontSize: '0.78rem', fontWeight: 900, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em' }}>NPTEL</span>
      <span style={{ color: '#A5A5A5', fontSize: '0.5rem', fontWeight: 600 }}>SWAYAM</span>
    </div>
  );
}

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI & Data' | 'Development' | 'Design'>('All');

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'All') return certs;
    return certs.filter((c) => c.domainGroup === activeFilter);
  }, [activeFilter]);

  const counts = useMemo(() => {
    return {
      all: certs.length,
      ai: certs.filter((c) => c.domainGroup === 'AI & Data').length,
      dev: certs.filter((c) => c.domainGroup === 'Development').length,
      design: certs.filter((c) => c.domainGroup === 'Design').length,
    };
  }, []);

  return (
    <section className={styles.section} id="certifications" aria-label="Certifications" data-stacked-section>
      <span className={styles.bgWatermark} aria-hidden="true">07</span>

      <div className={styles.container} data-stacked-inner>
        {/* ── DESKTOP HEADER (Preserved 100%) ── */}
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

        {/* ── MOBILE HEADER (Futuristic, Minimal, Compact) ── */}
        <div className={styles.mobileHeaderWrapper}>
          <div className={styles.mobileHeadingBlock}>
            <div className={styles.mobileSlashes}>
              <span className={styles.slash}>/</span>
              <span className={styles.slash}>/</span>
              <span className={styles.mobileKicker}>CREDENTIAL VAULT</span>
            </div>
            <h2 className={styles.mobileTitle}>
              CERTIFICATIONS<span className={styles.orangeDot}>.</span>
            </h2>
            <p className={styles.mobileSubtitle}>Professional credentials &amp; achievements</p>
          </div>

          {/* ── MOBILE STATISTICS OVERVIEW ── */}
          <div className={styles.mobileStatsPanel}>
            <div className={styles.mobileStatItem}>
              <div className={styles.mobileStatValueRow}>
                <span className={styles.statDot} />
                <span className={styles.mobileStatVal}>07</span>
              </div>
              <span className={styles.mobileStatLbl}>TOTAL</span>
            </div>

            <span className={styles.mobileStatSep} />

            <div className={styles.mobileStatItem}>
              <div className={styles.mobileStatValueRow}>
                <span className={styles.statDot} />
                <span className={styles.mobileStatVal}>03</span>
              </div>
              <span className={styles.mobileStatLbl}>DOMAINS</span>
            </div>

            <span className={styles.mobileStatSep} />

            <div className={styles.mobileStatItem}>
              <div className={styles.mobileStatValueRow}>
                <span className={styles.statDot} />
                <span className={styles.mobileStatVal}>2024–26</span>
              </div>
              <span className={styles.mobileStatLbl}>ACTIVE SPAN</span>
            </div>
          </div>

          {/* ── MOBILE CATEGORY FILTERS ── */}
          <div className={styles.mobileFiltersRow} role="tablist" aria-label="Filter certifications by domain">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'All'}
              className={`${styles.filterChip} ${activeFilter === 'All' ? styles.activeFilterChip : ''}`}
              onClick={() => setActiveFilter('All')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>All ({counts.all})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'AI & Data'}
              className={`${styles.filterChip} ${activeFilter === 'AI & Data' ? styles.activeFilterChip : ''}`}
              onClick={() => setActiveFilter('AI & Data')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <span>AI &amp; Data ({counts.ai})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'Development'}
              className={`${styles.filterChip} ${activeFilter === 'Development' ? styles.activeFilterChip : ''}`}
              onClick={() => setActiveFilter('Development')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>Development ({counts.dev})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'Design'}
              className={`${styles.filterChip} ${activeFilter === 'Design' ? styles.activeFilterChip : ''}`}
              onClick={() => setActiveFilter('Design')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 8 8 12 12 16 16 12 12 8" />
              </svg>
              <span>Design ({counts.design})</span>
            </button>
          </div>
        </div>

        {/* ── DESKTOP GRID (Preserved 100% desktop presentation) ── */}
        <div className={styles.desktopGridWrapper}>
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
                <span className={styles.cardBgNum} aria-hidden="true">{cert.index}</span>
                <div className={styles.cardTop}>
                  <span className={styles.cardCategory}>{cert.category}</span>
                  <span className={styles.cardDate}>{cert.date}</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardIssuer}>{cert.issuer}</span>
                  <h3 className={styles.cardTitle}>{cert.title}</h3>
                  <p className={styles.cardDesc}>{cert.description}</p>
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.viewCta}>
                    VIEW CERTIFICATE <ArrowUpRight />
                  </span>
                </div>
                <span className={styles.cardAccentLine} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* ── INNOVATIVE MOBILE CERTIFICATION CARDS LIST ── */}
        <div className={styles.mobileCardsList} role="region" aria-label="Certifications list">
          {filteredCerts.map((cert) => {
            const domainClass =
              cert.domainGroup === 'AI & Data'
                ? styles.domainAi
                : cert.domainGroup === 'Development'
                ? styles.domainDev
                : styles.domainDesign;

            return (
              <a
                key={`mobile-${cert.id}`}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.mobileCard} ${domainClass}`}
                aria-label={`Open certificate for ${cert.title} by ${cert.issuer}`}
              >
                {/* Asymmetric corner edge & subtle domain gradient */}
                <span className={styles.mobileCardCornerCut} aria-hidden="true" />
                <span className={styles.mobileCardBgPattern} aria-hidden="true" />

                {/* Left Zone — Issuer Identity */}
                <div className={styles.mobileIssuerZone}>
                  <div className={styles.mobileLogoBox}>
                    <IssuerLogo issuer={cert.issuer} />
                  </div>
                  <span className={styles.mobileCardIndex}>{cert.index}</span>
                </div>

                {/* Diagonal fine separator */}
                <span className={styles.mobileZoneSeparator} aria-hidden="true" />

                {/* Center Zone — Certificate Information */}
                <div className={styles.mobileInfoZone}>
                  <div className={styles.mobileBadgeRow}>
                    <span className={styles.mobileCategoryBadge}>{cert.badge}</span>
                  </div>
                  <h3 className={styles.mobileCardTitle}>{cert.title}</h3>
                  <div className={styles.mobileCardIssuerRow}>
                    <span className={styles.issuerDot} />
                    <span className={styles.mobileCardIssuerName}>{cert.issuer}</span>
                  </div>
                  {cert.description && (
                    <p className={styles.mobileCardDesc}>{cert.description}</p>
                  )}
                </div>

                {/* Diagonal fine separator */}
                <span className={styles.mobileZoneSeparator} aria-hidden="true" />

                {/* Right Zone — Metadata and Action */}
                <div className={styles.mobileMetaActionZone}>
                  <div className={styles.mobileYearBadge}>
                    <CalendarIcon />
                    <span>{cert.date}</span>
                  </div>

                  <span className={styles.mobileArrowBtn} aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
