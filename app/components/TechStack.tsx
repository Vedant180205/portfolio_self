/* TechStack — flat icon grid, no categories */
const techs = [
  { name: 'Python',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',           invert: false },
  { name: 'TypeScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',   invert: false },
  { name: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',   invert: false },
  { name: 'C',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',                     invert: false },
  { name: 'C++',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',     invert: false },
  { name: 'React',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',             invert: false },
  { name: 'Next.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',           invert: true  },
  { name: 'HTML5',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',             invert: false },
  { name: 'CSS3',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',               invert: false },
  { name: 'Node.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',           invert: false },
  { name: 'Flask',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',             invert: true  },
  { name: 'Express',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',         invert: true  },
  { name: 'NumPy',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',             invert: false },
  { name: 'Pandas',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',           invert: false },
  { name: 'scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', invert: false },
  { name: 'MongoDB',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',         invert: false },
  { name: 'Git',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',                 invert: false },
  { name: 'GitHub',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',           invert: true  },
  { name: 'Arduino',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',         invert: false },
  { name: 'Raspberry Pi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg', invert: false },
  { name: 'MediaPipe',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',           invert: false },
  { name: 'Vercel',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',           invert: true  },
];

import styles from './TechStack.module.css';

export default function TechStack() {
  return (
    <section className={styles.section} id="techstack" aria-label="Tech Stack">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>TOOLKIT</span>
        <h2 className={styles.title}>TECH STACK</h2>
      </div>

      {/* Icon grid */}
      <div className={styles.grid}>
        {techs.map((tech) => (
          <div key={tech.name} className={styles.card}>
            <div className={`${styles.iconWrap} ${tech.invert ? styles.invertDark : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.icon}
                alt={tech.name}
                width={48}
                height={48}
                loading="lazy"
              />
            </div>
            <span className={styles.cardName}>{tech.name}</span>
          </div>
        ))}
      </div>

      {/* Scrolling marquee strip */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...techs, ...techs].map((tech, i) => (
            <span key={i} className={styles.marqueeItem}>
              {tech.name}
              <span className={styles.marqueeDot}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
