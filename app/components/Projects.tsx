'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';
import { ProjectModal } from './ProjectModal';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'OPTIONS PRICING MODEL',
    subtitle: 'Quantitative Finance',
    cardDescription: 'Built a quantitative finance platform for pricing and analyzing stock options using derivatives models. Implemented the CRR Binomial Tree Model, EWMA volatility forecasting, and risk-neutral valuation to estimate option prices under varying market conditions.',
    description: (
      <>
        Built a <strong>quantitative finance platform</strong> for pricing and analyzing stock options using industry-standard derivatives models. Implemented the <strong>Cox-Ross-Rubinstein (CRR) Binomial Tree Model</strong>, <strong>EWMA volatility forecasting</strong>, and <strong>risk-neutral valuation</strong> techniques to estimate option prices under varying market conditions. Integrated <strong>interactive visualizations</strong> and <strong>financial analytics</strong> to help users evaluate volatility, risk exposure, and potential trading opportunities.
      </>
    ),
    mobileDescription: 'Quantitative finance platform for options pricing and risk analysis using CRR Binomial Tree, EWMA volatility, and risk-neutral valuation.',
    tags: ['Python', 'Binomial Tree', 'Black-Scholes', 'Finance'],
    github: 'https://github.com/Vedant180205/OptionsPricingModel_QuantDevs',
    image: '/images/projects/thumbs/Quant_bg.webp',
    imageAlt: 'QUANTDEVS — Options pricing and risk analysis CLI splash screen',
    imagePosition: 'center center',
  },
  {
    id: 2,
    number: '02',
    title: 'CAMPUS IQ',
    subtitle: 'AI-Powered Campus Platform',
    cardDescription: 'Built an AI-powered placement intelligence platform that predicts student readiness through automated resume analysis and portfolio evaluation. Leveraged Groq Llama-3 and skill-gap detection to generate real-time career insights.',
    description: (
      <>
        Built an <strong>AI-powered placement intelligence platform</strong> that predicts student placement readiness through automated resume analysis, GitHub portfolio evaluation, and skill-gap detection. Leveraged <strong>Groq Llama-3</strong>, <strong>PDFMiner</strong>, <strong>GitHub API integration</strong>, and a custom <strong>Placement Readiness Score (PRS)</strong> algorithm to generate real-time career insights and personalized improvement recommendations. Designed a <strong>Power BI-style analytics dashboard</strong> that enables administrators to identify at-risk students, track campus-wide skill trends, and take proactive interventions before placement season.
      </>
    ),
    mobileDescription: 'AI-powered placement intelligence platform analyzing student resumes and portfolios to identify and bridge technical skill gaps.',
    tags: ['Next.js', 'Groq Llama-3', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Vedant180205/CyberDevs_AMUHACKS5.0',
    image: '/images/projects/thumbs/campus_bg.webp',
    imageAlt: 'CampusIQ — placement readiness platform landing page',
    imagePosition: 'center center',
  },
  {
    id: 3,
    number: '03',
    title: 'PREDICTKART',
    subtitle: 'Machine Learning Marketplace',
    cardDescription: 'Developed a machine learning e-commerce intelligence system that automates product discovery and price comparison. Integrated large language models and web scraping to predict price-drop probabilities.',
    description: (
      <>
        Developed a <strong>full-stack e-commerce intelligence system</strong> that automates cross-platform product discovery and price comparison across online marketplaces. Integrated <strong>large language models (Groq Llama 3.1)</strong>, <strong>web scraping infrastructure</strong>, and <strong>predictive analytics</strong> techniques to generate deal recommendations, estimate price-drop probabilities, and provide personalized shopping insights. Engineered a scalable architecture using <strong>FastAPI</strong>, <strong>Next.js</strong>, <strong>PostgreSQL</strong>, and <strong>asynchronous data processing</strong> to deliver real-time market intelligence for consumer purchasing decisions.
      </>
    ),
    mobileDescription: 'E-commerce intelligence system using machine learning and web scraping to compare prices and predict price-drop probabilities.',
    tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'Llama 3.1'],
    github: 'https://github.com/Vedant180205/PredictKart',
    image: '/images/projects/thumbs/predict_bg.webp',
    imageAlt: 'PredictKart — price history & tracker web app homepage',
    imagePosition: 'center center',
  },
  {
    id: 4,
    number: '04',
    title: 'VITAL TRACKER',
    subtitle: 'Healthcare IoT Project',
    cardDescription: 'Developed an AI-powered IoT health monitoring system that continuously tracks vitals using ESP32 sensors. Integrated Firebase for live data streaming and Google Gemini for wellness recommendations.',
    description: (
      <>
        Developed an <strong>AI-powered IoT health monitoring system</strong> that continuously tracks <strong>Heart Rate, SpO₂ and fatigue levels</strong> using <strong>ESP32 and MAX30102 sensors</strong>. Integrated <strong>Firebase Realtime Database</strong> for live health data streaming and <strong>Google Gemini</strong> to provide personalized wellness insights through an intelligent healthcare assistant. Implemented <strong>fatigue analysis</strong> using HRV patterns, oxygen saturation trends, and movement data, enabling <strong>real-time health monitoring</strong>, <strong>anomaly detection</strong>, and <strong>proactive wellness recommendations</strong>.
      </>
    ),
    mobileDescription: 'AI-powered IoT health monitoring system tracking heart rate, SpO₂ and fatigue levels using ESP32 and Firebase.',
    tags: ['IoT', 'ESP32', 'Firebase', 'Gemini AI'],
    github: 'https://github.com/Vedant180205/VitalTracker',
    image: '/images/projects/thumbs/vital_bg.webp',
    imageAlt: 'Vital Tracker — IoT breadboard prototype with OLED display',
    imagePosition: 'center center',
  },
  {
    id: 5,
    number: '05',
    title: 'GESTURE CONTROL SYSTEM',
    subtitle: 'Computer Vision',
    cardDescription: 'Built a privacy-first gesture-controlled browser interface for touchless navigation using computer vision. Utilized Google MediaPipe Hand Landmarker for low-latency gesture recognition.',
    description: (
      <>
        Built a <strong>privacy-first gesture-controlled browser interface</strong> that enables touchless navigation using real-time hand tracking and computer vision. Utilized <strong>Google MediaPipe Hand Landmarker</strong>, <strong>WebAssembly inference</strong>, <strong>21-point hand landmark detection</strong>, <strong>Euclidean-distance-based gesture classification</strong>, and temporal smoothing techniques to achieve low-latency gesture recognition directly in the browser. Engineered a <strong>Chrome Extension architecture</strong> with cross-context messaging, dynamic gesture pipelines, and <strong>local-first processing</strong> for real-time scrolling, tab management, and virtual cursor control without transmitting any data.
      </>
    ),
    mobileDescription: 'Privacy-first Chrome extension enabling touchless browser navigation using Google MediaPipe Hand Landmarker.',
    tags: ['MediaPipe', 'WebAssembly', 'Chrome Extension', 'CV'],
    github: 'https://github.com/Vedant180205/Gesture-based-control-system',
    image: '/images/projects/thumbs/f6aa9235-b84f-42b1-b577-e234a603db72.webp',
    imageAlt: 'Gesture Control System — Chrome extension overlay with hand landmark tracking',
    imagePosition: 'center center',
  },
  {
    id: 6,
    number: '06',
    title: 'STANDEASE',
    subtitle: 'E-Commerce Platform',
    cardDescription: 'Built a full-stack e-commerce platform for ergonomic insoles. Developed product comparison tools, persistent cart management, Firebase authentication, and guest-to-user cart merging.',
    description: (
      <>
        Built a <strong>full-stack e-commerce platform</strong> for ergonomic insoles designed for people who stand for long hours. Developed product browsing, comparison tools, an interactive standing-time recommender, cart management, checkout flow, mock Card/UPI payment simulation, and real-time order tracking. Implemented <strong>Firebase Authentication and Firestore</strong> to manage user accounts, saved addresses, persistent carts, and orders. Added <strong>guest-to-user cart merging</strong> using LocalStorage and Firestore, allowing shoppers to retain cart items after signing in without duplicate products.
      </>
    ),
    mobileDescription: 'Full-stack e-commerce platform for ergonomic insoles featuring interactive standing-time recommendation, Firebase auth, and guest-to-user cart merging.',
    tags: ['React', 'Firebase', 'Firestore', 'E-Commerce'],
    github: 'https://github.com/Vedant180205/StandEase-Web',
    image: '/images/projects/thumbs/standease_bg.webp',
    imageAlt: 'StandEase — E-Commerce platform checkout and product pages',
    imagePosition: '55% center',
  },
];

const layoutVariants = [
  'standard', // Row 1, Left
  'featured', // Row 1, Center
  'standard', // Row 1, Right
  'featured', // Row 2, Left
  'standard', // Row 2, Center
  'featured', // Row 2, Right
];

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  

  const firstRowProjects = projects.slice(0, 3);
  const secondRowProjects = projects.slice(3, 6);

  const handleCardClick = (project: typeof projects[0]) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      // On mobile, card click doesn't open the popup modal.
      return;
    }
    setSelectedProject(project);
  };

  const renderCard = (project: typeof projects[0], index: number) => {
    const variant = layoutVariants[index];
    const isFeatured = variant === 'featured';

    return (
      <div
        className={`${styles.card} ${styles[variant]}`}
        key={project.id}
        onClick={() => handleCardClick(project)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick(project);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
        id={`project-card-${project.id}`}
      >
        {/* Hover Details Button Overlay */}
        <div className={styles.hoverOverlay} aria-hidden="true">
          <span className={styles.detailBtn}>View in Detail</span>
        </div>

        {isFeatured ? (
          // Featured layout: Image at top, text at bottom
          <>
            <div className={styles.imageWrapper}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                style={{ objectPosition: project.imagePosition }}
                className={styles.image}
              />
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.cardHeader}>
                <span className={styles.projectNumber}>
                  {project.number} / {project.subtitle.toUpperCase()}
                </span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>
              <p className={styles.cardDesc}>{project.cardDescription}</p>
              <p className={styles.mobileDesc}>{project.mobileDescription}</p>
              <div className={styles.tagList}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileCardGithubBtn}
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon />
                <span>VIEW REPOSITORY</span>
              </a>
            </div>
          </>
        ) : (
          // Standard layout: Text at top, image at bottom
          <>
            <div className={styles.contentWrapper}>
              <div className={styles.cardHeader}>
                <div className={styles.metaRow}>
                  <span className={styles.projectNumber}>
                    {project.number} / {project.subtitle.toUpperCase()}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>
              <p className={styles.cardDesc}>{project.cardDescription}</p>
              <p className={styles.mobileDesc}>{project.mobileDescription}</p>
              <div className={styles.tagList}>
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileCardGithubBtn}
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon />
                <span>VIEW REPOSITORY</span>
              </a>
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                style={{ objectPosition: project.imagePosition }}
                className={styles.image}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <section className={styles.section} id="projects" aria-label="Projects">
      {/* Accent line at the very top of the section */}
      <div className={styles.topAccentLine} />

      {/* Section header */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.eyebrowContainer}>
            <svg className={styles.starMarker} width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
            </svg>
            <span className={styles.sectionEyebrow}>SELECTED WORK / 01–06</span>
          </div>
          <h2 className={styles.sectionTitle}>
            ENGINEERING PROJECTS
            <br />
            BUILT TO WORK.
          </h2>
        </div>
        <div className={styles.headerRight} />
      </div>

      {/* Project rows (Desktop 3-column asymmetric layout) */}
      <div className={styles.projectRows}>
        <div className={styles.projectRow}>
          {firstRowProjects.map((project, idx) => renderCard(project, idx))}
        </div>

        {/* Render second row if showAll is true */}
        <div className={`${styles.projectRow} ${styles.secondRow} ${showAll ? styles.showRow : ''}`}>
          {secondRowProjects.map((project, idx) => renderCard(project, idx + 3))}
        </div>
      </div>

      {/* Center toggle button below the cards (for both desktop and mobile/tablet) */}
      <div className={styles.toggleWrapper}>
        <button
          className={styles.viewMoreBtn}
          onClick={() => {
            if (showAll) {
              setShowAll(false);
              const section = document.getElementById('projects');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              setShowAll(true);
            }
          }}
          aria-label={showAll ? 'Show fewer projects' : 'View all projects'}
          id="projects-toggle-bottom"
        >
          <span>{showAll ? 'SHOW FEWER' : 'VIEW ALL PROJECTS'}</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${styles.headerArrow} ${showAll ? styles.headerArrowRotate : ''}`}
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      {/* Modal Popup Details */}
      
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
