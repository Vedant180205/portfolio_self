'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import styles from './Certifications.module.css';

interface CertItem {
  id: string;
  index: string;
  issuer: string;
  title: string;
  description: string;
  url: string; // fallback / direct asset
  image: string; // optimized webp
  thumb: string; // lightweight thumb webp
  date: string;
  category: string;
  catClass: string;
  domainGroup: 'AI & Data' | 'Development' | 'Design';
  badge: string;
  themeGradient: string; // custom aesthetic glow matching the reference
}

const certs: CertItem[] = [
  {
    id: 'cert-1',
    index: '01',
    issuer: 'Cisco Networking Academy',
    title: 'Data Analytics Essentials',
    description: 'Querying, transforming, and modeling data to extract actionable business intelligence from complex datasets.',
    url: '/certs/optimized/cisco_data_analytics_vedantpatil_1.webp',
    image: '/certs/optimized/cisco_data_analytics_vedantpatil_1.webp',
    thumb: '/certs/thumbs/cisco_data_analytics_vedantpatil_1.webp',
    date: '2026',
    category: 'AI & DATA',
    catClass: 'catAiData',
    domainGroup: 'AI & Data',
    badge: 'ANALYTICS',
    themeGradient: 'linear-gradient(135deg, rgba(0, 188, 235, 0.45) 0%, rgba(13, 148, 136, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
  {
    id: 'cert-2',
    index: '02',
    issuer: 'ExcelR Solutions',
    title: 'AIML & Power BI',
    description: 'Machine learning pipelines and professional-grade data visualization using Power BI dashboards for analytics.',
    url: '/certs/optimized/AIML_pwerrBI_certificate_1.webp',
    image: '/certs/optimized/AIML_pwerrBI_certificate_1.webp',
    thumb: '/certs/thumbs/AIML_pwerrBI_certificate_1.webp',
    date: '2025',
    category: 'AI & DATA',
    catClass: 'catAiData',
    domainGroup: 'AI & Data',
    badge: 'MACHINE LEARNING',
    themeGradient: 'linear-gradient(135deg, rgba(255, 69, 0, 0.45) 0%, rgba(245, 158, 11, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
  {
    id: 'cert-3',
    index: '03',
    issuer: 'Cisco Networking Academy',
    title: 'Data Science Essentials',
    description: 'Core data science concepts, analytics methodologies, and Python tools for data-driven exploration.',
    url: '/certs/optimized/Data_Science_Essentials_with_Python_certificate_vedant-patil242-sakec-ac-in_a5b2aee3-b7a0-4444-891a-c944dabff2a2_1.webp',
    image: '/certs/optimized/Data_Science_Essentials_with_Python_certificate_vedant-patil242-sakec-ac-in_a5b2aee3-b7a0-4444-891a-c944dabff2a2_1.webp',
    thumb: '/certs/thumbs/Data_Science_Essentials_with_Python_certificate_vedant-patil242-sakec-ac-in_a5b2aee3-b7a0-4444-891a-c944dabff2a2_1.webp',
    date: '2025',
    category: 'AI & DATA',
    catClass: 'catAiData',
    domainGroup: 'AI & Data',
    badge: 'DATA SCIENCE',
    themeGradient: 'linear-gradient(135deg, rgba(14, 165, 233, 0.45) 0%, rgba(99, 102, 241, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
  {
    id: 'cert-4',
    index: '04',
    issuer: 'Cisco / NDG',
    title: 'Linux Essentials',
    description: 'Operating systems fundamentals, command-line administration, bash scripting, and Linux file systems.',
    url: '/certs/optimized/Linux_Essentials_certificate_vedant-patil242-sakec-ac-in_1b6efe39-1555-4a35-a05d-cae2589c99f1_1.webp',
    image: '/certs/optimized/Linux_Essentials_certificate_vedant-patil242-sakec-ac-in_1b6efe39-1555-4a35-a05d-cae2589c99f1_1.webp',
    thumb: '/certs/thumbs/Linux_Essentials_certificate_vedant-patil242-sakec-ac-in_1b6efe39-1555-4a35-a05d-cae2589c99f1_1.webp',
    date: '2025',
    category: 'SOFTWARE DEV',
    catClass: 'catSoftware',
    domainGroup: 'Development',
    badge: 'SYSTEMS / LINUX',
    themeGradient: 'linear-gradient(135deg, rgba(234, 179, 8, 0.45) 0%, rgba(249, 115, 22, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
  {
    id: 'cert-5',
    index: '05',
    issuer: 'Infosys Springboard',
    title: 'Python Programming',
    description: 'Core Python programming, data structures, and procedural logic patterns for real-world applications.',
    url: '/certs/optimized/ved_infosys_python.webp',
    image: '/certs/optimized/ved_infosys_python.webp',
    thumb: '/certs/thumbs/ved_infosys_python.webp',
    date: '2024',
    category: 'SOFTWARE DEV',
    catClass: 'catSoftware',
    domainGroup: 'Development',
    badge: 'CORE PYTHON',
    themeGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.45) 0%, rgba(37, 99, 235, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
  {
    id: 'cert-6',
    index: '06',
    issuer: 'Infosys Springboard',
    title: 'C++ Programming',
    description: 'Object-oriented design, memory management, pointers, and structured systems programming in C++.',
    url: '/certs/optimized/ved_infosys_cpp.webp',
    image: '/certs/optimized/ved_infosys_cpp.webp',
    thumb: '/certs/thumbs/ved_infosys_cpp.webp',
    date: '2025',
    category: 'SOFTWARE DEV',
    catClass: 'catSoftware',
    domainGroup: 'Development',
    badge: 'OOP / C++',
    themeGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.45) 0%, rgba(124, 58, 237, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
  {
    id: 'cert-7',
    index: '07',
    issuer: 'IIT Bombay / Spoken Tutorial',
    title: 'Java Training',
    description: 'Structured Java programming covering object-oriented concepts, inheritance, and application design.',
    url: '/certs/optimized/VEDANT-PATIL-java_training.webp',
    image: '/certs/optimized/VEDANT-PATIL-java_training.webp',
    thumb: '/certs/thumbs/VEDANT-PATIL-java_training.webp',
    date: '2024',
    category: 'SOFTWARE DEV',
    catClass: 'catSoftware',
    domainGroup: 'Development',
    badge: 'JAVA OOP',
    themeGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.45) 0%, rgba(220, 38, 38, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
  {
    id: 'cert-8',
    index: '08',
    issuer: 'NPTEL / Swayam',
    title: 'German Language',
    description: 'Foundational German vocabulary, grammar structures, pronunciation, and conversational competency.',
    url: '/certs/optimized/germancertificate_copy_1.webp',
    image: '/certs/optimized/germancertificate_copy_1.webp',
    thumb: '/certs/thumbs/germancertificate_copy_1.webp',
    date: '2025',
    category: 'LANGUAGES',
    catClass: 'catLanguages',
    domainGroup: 'Design',
    badge: 'GLOBAL COMM',
    themeGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.45) 0%, rgba(217, 119, 6, 0.25) 50%, rgba(17, 18, 19, 0.95) 100%)',
  },
];

function ArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 11L11 2M11 2H4.5M11 2V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'AI & Data' | 'Development' | 'Design'>('All');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  const filteredCerts = useMemo(() => {
    if (activeFilter === 'All') return certs;
    return certs.filter((c) => c.domainGroup === activeFilter);
  }, [activeFilter]);

  // Mobile 4-card display grid with "View More" toggle
  const visibleMobileCerts = useMemo(() => {
    if (isExpanded) return filteredCerts;
    return filteredCerts.slice(0, 4);
  }, [filteredCerts, isExpanded]);

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
      <span className={styles.bgWatermark} aria-hidden="true">08</span>

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
              <span className={styles.statNum}>08</span>
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
        </div>

        {/* ── DESKTOP GRID (Preserved 100% desktop presentation) ── */}
        <div className={styles.desktopGridWrapper}>
          <div className={styles.grid}>
            {certs.map((cert) => (
              <a
                key={cert.id}
                href={cert.image}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCert(cert);
                }}
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

        {/* ── INNOVATIVE MOBILE 4-CARD SHOWCASE GRID (Reference Style) ── */}
        <div className={styles.mobileShowcaseWrapper}>
          <div className={styles.mobileCardsGrid} role="region" aria-label="Certifications grid">
            {visibleMobileCerts.map((cert) => (
              <div
                key={`mobile-grid-${cert.id}`}
                className={styles.mobilePillCard}
                style={{ background: cert.themeGradient }}
                onClick={() => setSelectedCert(cert)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${cert.title} certificate`}
              >
                {/* Upper Certificate Image with Radial Glow & Fade */}
                <div className={styles.pillImageContainer}>
                  <Image
                    src={cert.thumb}
                    alt={cert.title}
                    width={280}
                    height={190}
                    className={styles.pillCertImage}
                    priority={false}
                  />
                  {/* Subtle fade mist gradient to blend into card bottom */}
                  <div className={styles.pillImageFade} />
                </div>

                {/* Inner Card Content: Title and Arrow aligned side-by-side */}
                <div className={styles.pillCardBody}>
                  <div className={styles.pillHeaderRow}>
                    <h3 className={styles.pillTitle}>{cert.title}</h3>
                    <button
                      type="button"
                      className={styles.pillActionBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                      aria-label={`View ${cert.title}`}
                    >
                      <ArrowUpRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More / View Less Toggle Button */}
          {filteredCerts.length > 4 && (
            <div className={styles.mobileViewMoreContainer}>
              <button
                type="button"
                className={styles.mobileViewMoreBtn}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>{isExpanded ? 'Show Less' : `View More (+${filteredCerts.length - 4})`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── IN-APP LIGHTBOX MODAL (Opens certificate directly on site without Google Drive) ── */}
      {selectedCert && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setSelectedCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${selectedCert.title}`}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.lightboxHeader}>
              <div className={styles.lightboxTitleInfo}>
                <span className={styles.lightboxBadge}>{selectedCert.badge}</span>
                <h3 className={styles.lightboxTitle}>{selectedCert.title}</h3>
                <span className={styles.lightboxIssuer}>{selectedCert.issuer} • {selectedCert.date}</span>
              </div>
              <button
                type="button"
                className={styles.lightboxCloseBtn}
                onClick={() => setSelectedCert(null)}
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Image Display */}
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                width={1100}
                height={750}
                className={styles.lightboxImage}
                priority
              />
            </div>

            {/* Modal Footer Description */}
            <div className={styles.lightboxFooter}>
              <p className={styles.lightboxDesc}>{selectedCert.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
