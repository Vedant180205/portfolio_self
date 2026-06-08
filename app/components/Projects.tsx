import Image from 'next/image';
import styles from './Projects.module.css';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'OPTIONS PRICING MODEL',
    subtitle: 'Quantitative Finance',
    description:
      'A quantitative finance hackathon project implementing Black-Scholes and binomial tree models for real-time options pricing. Combines mathematical finance theory with practical market data analysis to evaluate derivatives.',
    tags: ['Python', 'NumPy', 'Black-Scholes', 'Finance'],
    github: 'https://github.com/Vedant180205/OptionsPricingModel_QuantDevs',
    image: '/project-quantdevs.jpg',
    imageAlt: 'QUANTDEVS — Options pricing and risk analysis CLI splash screen',
  },
  {
    id: 2,
    number: '02',
    title: 'CAMPUS IQ',
    subtitle: 'AI-Powered Campus Platform',
    description:
      'An intelligent campus management system built at AMUHACKS 5.0. Leverages AI to streamline student services, automate administrative workflows, and deliver smart insights for universities.',
    tags: ['Next.js', 'AI', 'Node.js', 'MongoDB'],
    github: 'https://github.com/Vedant180205/CyberDevs_AMUHACKS5.0',
    image: '/project-campusiq.png',
    imageAlt: 'CampusIQ — placement readiness platform landing page',
  },
  {
    id: 3,
    number: '03',
    title: 'PREDICTKART',
    subtitle: 'Machine Learning Marketplace',
    description:
      'A machine learning model deployment platform where users can upload datasets, train models, and get predictions in real time — making ML accessible without needing a data science background.',
    tags: ['Python', 'ML', 'Flask', 'React'],
    github: 'https://github.com/Vedant180205/PredictKart',
    image: '/project-predictkart.png',
    imageAlt: 'PredictKart — price history & tracker web app homepage',
  },
  {
    id: 4,
    number: '04',
    title: 'VITAL TRACKER',
    subtitle: 'Healthcare IoT Project',
    description:
      'A healthcare-focused project that tracks and monitors patient vital signs in real time, generating alerts and trend analysis to assist medical professionals in early diagnosis and patient management.',
    tags: ['IoT', 'Python', 'Healthcare', 'Real-time'],
    github: 'https://github.com/Vedant180205/VitalTracker',
    image: '/project-vital-tracker.jpg',
    imageAlt: 'Vital Tracker — IoT breadboard prototype with OLED display',
  },
  {
    id: 5,
    number: '05',
    title: 'GESTURE CONTROL SYSTEM',
    subtitle: 'Computer Vision',
    description:
      'A Chrome Extension enabling browser control through real-time hand gesture recognition. Built with MediaPipe, WebAssembly, and Manifest V3 — no keyboard or mouse needed to navigate the web.',
    tags: ['MediaPipe', 'WebAssembly', 'Chrome Extension', 'CV'],
    github: 'https://github.com/Vedant180205/Gesture-based-control-system',
    image: '/project-gesture-control.png',
    imageAlt: 'Gesture Control System — Chrome extension overlay with hand landmark tracking',
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
          return (
            <article
              key={project.id}
              className={`${styles.projectRow} ${isEven ? styles.projectRowReverse : ''}`}
              id={`project-${project.id}`}
            >
              {/* ── Collage side ── */}
              <div className={`${styles.collage} ${isEven ? styles.collageReverse : ''}`}>
                {/* Block A — large, bottom-left (or bottom-right when reversed) */}
                <div className={styles.blockA} />
                {/* Block B — smaller, top-right (or top-left when reversed) */}
                <div className={styles.blockB} />
                {/* Block C — tiny accent sliver */}
                <div className={styles.blockC} />
                {/* Main image — largest, front */}
                <div className={styles.mainWrap}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={1200}
                    height={800}
                    className={styles.mainImg}
                    sizes="(max-width: 768px) 100vw, 42vw"
                    quality={88}
                  />
                </div>

              </div>

              {/* ── Text side ── */}
              <div className={styles.textSide}>
                <p className={styles.subtitle}>{project.subtitle}</p>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
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
    </section>
  );
}
