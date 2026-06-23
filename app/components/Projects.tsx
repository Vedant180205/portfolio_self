'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'OPTIONS PRICING MODEL',
    subtitle: 'Quantitative Finance',
    description: (
      <>
        Built a <strong>quantitative finance platform</strong> for pricing and analyzing stock options using industry-standard derivatives models. Implemented the <strong>Cox-Ross-Rubinstein (CRR) Binomial Tree Model</strong>, <strong>EWMA volatility forecasting</strong>, and <strong>risk-neutral valuation</strong> techniques to estimate option prices under varying market conditions. Integrated <strong>interactive visualizations</strong> and <strong>financial analytics</strong> to help users evaluate volatility, risk exposure, and potential trading opportunities.
      </>
    ),
    mobileDescription: 'Quantitative finance platform for options pricing and risk analysis using CRR Binomial Tree, EWMA volatility, and risk-neutral valuation.',
    tags: ['Python', 'Binomial Tree', 'Black-Scholes', 'Finance'],
    github: 'https://github.com/Vedant180205/OptionsPricingModel_QuantDevs',
    image: '/images/projects/thumbs/project-quantdevs.jpg',
    imageAlt: 'QUANTDEVS — Options pricing and risk analysis CLI splash screen',
    bgImage: '/images/projects/bg/options_pricing_bg.png',
  },
  {
    id: 2,
    number: '02',
    title: 'CAMPUS IQ',
    subtitle: 'AI-Powered Campus Platform',
    description: (
      <>
        Built an <strong>AI-powered placement intelligence platform</strong> that predicts student placement readiness through automated resume analysis, GitHub portfolio evaluation, and skill-gap detection. Leveraged <strong>Groq Llama-3</strong>, <strong>PDFMiner</strong>, <strong>GitHub API integration</strong>, and a custom <strong>Placement Readiness Score (PRS)</strong> algorithm to generate real-time career insights and personalized improvement recommendations. Designed a <strong>Power BI-style analytics dashboard</strong> that enables administrators to identify at-risk students, track campus-wide skill trends, and take proactive interventions before placement season.
      </>
    ),
    mobileDescription: 'AI-powered placement intelligence platform analyzing student resumes and portfolios to identify and bridge technical skill gaps.',
    tags: ['Next.js', 'Groq Llama-3', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Vedant180205/CyberDevs_AMUHACKS5.0',
    image: '/images/projects/thumbs/project-campusiq.png',
    imageAlt: 'CampusIQ — placement readiness platform landing page',
    bgImage: '/images/projects/bg/campusiq_bg.png',
    bgOpacity: 0.55,
  },
  {
    id: 3,
    number: '03',
    title: 'PREDICTKART',
    subtitle: 'Machine Learning Marketplace',
    description: (
      <>
        Developed a <strong>full-stack e-commerce intelligence system</strong> that automates cross-platform product discovery and price comparison across online marketplaces. Integrated <strong>large language models (Groq Llama 3.1)</strong>, <strong>web scraping infrastructure</strong>, and <strong>predictive analytics</strong> techniques to generate deal recommendations, estimate price-drop probabilities, and provide personalized shopping insights. Engineered a scalable architecture using <strong>FastAPI</strong>, <strong>Next.js</strong>, <strong>PostgreSQL</strong>, and <strong>asynchronous data processing</strong> to deliver real-time market intelligence for consumer purchasing decisions.
      </>
    ),
    mobileDescription: 'E-commerce intelligence system using machine learning and web scraping to compare prices and predict price-drop probabilities.',
    tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'Llama 3.1'],
    github: 'https://github.com/Vedant180205/PredictKart',
    image: '/images/projects/thumbs/project-predictkart.png',
    imageAlt: 'PredictKart — price history & tracker web app homepage',
    bgImage: '/images/projects/bg/predictkart_bg.png',
  },
  {
    id: 4,
    number: '04',
    title: 'VITAL TRACKER',
    subtitle: 'Healthcare IoT Project',
    description: (
      <>
        Developed an <strong>AI-powered IoT health monitoring system</strong> that continuously tracks <strong>Heart Rate, SpO₂, and fatigue levels</strong> using <strong>ESP32 and MAX30102 sensors</strong>. Integrated <strong>Firebase Realtime Database</strong> for live health data streaming and <strong>Google Gemini</strong> to provide personalized wellness insights through an intelligent healthcare assistant. Implemented <strong>fatigue analysis</strong> using HRV patterns, oxygen saturation trends, and movement data, enabling <strong>real-time health monitoring</strong>, <strong>anomaly detection</strong>, and <strong>proactive wellness recommendations</strong>.
      </>
    ),
    mobileDescription: 'AI-powered IoT health monitoring system tracking heart rate, SpO₂, and fatigue levels using ESP32 and Firebase.',
    tags: ['IoT', 'ESP32', 'Firebase', 'Gemini AI'],
    github: 'https://github.com/Vedant180205/VitalTracker',
    image: '/images/projects/thumbs/project-vital-tracker.jpg',
    imageAlt: 'Vital Tracker — IoT breadboard prototype with OLED display',
    bgImage: '/images/projects/bg/vital_tracker_bg.png',
  },
  {
    id: 5,
    number: '05',
    title: 'GESTURE CONTROL SYSTEM',
    subtitle: 'Computer Vision',
    description: (
      <>
        Built a <strong>privacy-first gesture-controlled browser interface</strong> that enables touchless navigation using real-time hand tracking and computer vision. Utilized <strong>Google MediaPipe Hand Landmarker</strong>, <strong>WebAssembly inference</strong>, <strong>21-point hand landmark detection</strong>, <strong>Euclidean-distance-based gesture classification</strong>, and temporal smoothing techniques to achieve low-latency gesture recognition directly in the browser. Engineered a <strong>Chrome Extension architecture</strong> with cross-context messaging, dynamic gesture pipelines, and <strong>local-first processing</strong> for real-time scrolling, tab management, and virtual cursor control without transmitting any user data.
      </>
    ),
    mobileDescription: 'Privacy-first Chrome extension enabling touchless browser navigation using Google MediaPipe Hand Landmarker.',
    tags: ['MediaPipe', 'WebAssembly', 'Chrome Extension', 'CV'],
    github: 'https://github.com/Vedant180205/Gesture-based-control-system',
    image: '/images/projects/thumbs/project-gesture-control.png',
    imageAlt: 'Gesture Control System — Chrome extension overlay with hand landmark tracking',
    bgImage: '/images/projects/bg/gesture_control_bg.png',
  },
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

  return (
    <section className={styles.section} id="projects" aria-label="Projects">
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>SELECTED WORK</span>
        <h2 className={styles.sectionTitle}>PROJECTS</h2>
      </div>

      {/* Project rows */}
      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const isEven = index % 2 === 1;
          const isHiddenOnMobile = index >= 3 && !showAll;
          return (
            <article
              key={project.id}
              className={`${styles.projectRow} ${isEven ? styles.projectRowReverse : ''} ${
                isHiddenOnMobile ? styles.mobileHidden : ''
              }`}
              id={`project-${project.id}`}
            >
              {project.bgImage && (
                <div className={styles.rowBg} aria-hidden="true">
                  <Image
                    src={project.bgImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={50}
                    style={{
                      objectFit: 'cover',
                      opacity: project.bgOpacity !== undefined ? project.bgOpacity : 1,
                    }}
                  />
                </div>
              )}

              {/* Mobile-only header (renders first in flex column) */}
              <div className={styles.mobileHeader}>
                <span className={styles.subtitle}>{project.subtitle}</span>
                <h3 className={styles.title}>{project.title}</h3>
              </div>

              {/* ── Collage side ── */}
              <div className={`${styles.collage} ${isEven ? styles.collageReverse : ''}`}>
                {/* Main image — largest, front */}
                <div className={styles.mainWrap}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={1200}
                    height={800}
                    className={styles.mainImg}
                    sizes="(max-width: 768px) 100vw, 42vw"
                    quality={78}
                  />
                </div>

              </div>

              {/* ── Text side ── */}
              <div className={styles.textSide}>
                {/* Desktop-only header */}
                <div className={styles.desktopHeader}>
                  <p className={styles.subtitle}>{project.subtitle}</p>
                  <h3 className={styles.title}>{project.title}</h3>
                </div>

                <p className={styles.desc}>{project.description}</p>
                <p className={styles.mobileDesc}>{project.mobileDescription}</p>
                <div className={styles.tagList}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewBtn}
                  aria-label={`View ${project.title} on GitHub`}
                  id={`project-${project.id}-github`}
                >
                  <GitHubIcon />
                  <span>VIEW PROJECT</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {showAll ? (
        <button
          className={styles.viewMoreBtn}
          onClick={() => {
            setShowAll(false);
            const section = document.getElementById('projects');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="View less projects"
          id="projects-view-less"
        >
          View Less Projects
        </button>
      ) : (
        <button
          className={styles.viewMoreBtn}
          onClick={() => setShowAll(true)}
          aria-label="View more projects"
          id="projects-view-more"
        >
          View More Projects
        </button>
      )}
    </section>
  );
}
