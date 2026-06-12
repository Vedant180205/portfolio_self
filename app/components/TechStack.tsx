/* TechStack — flat icon grid, no categories */
const techs = [
  // Languages
  { name: 'Python',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',           invert: false },
  { name: 'TypeScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',   invert: false },
  { name: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',   invert: false },
  { name: 'Java',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',                 invert: false },
  { name: 'C',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',                     invert: false },
  { name: 'C++',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',     invert: false },
  
  // Web & Frontend
  { name: 'React',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',             invert: false },
  { name: 'Next.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',           invert: true  },
  { name: 'HTML5',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',             invert: false },
  { name: 'CSS3',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',               invert: false },
  { name: 'Node.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',           invert: false },
  
  // Databases
  { name: 'PostgreSQL',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',   invert: false },
  { name: 'MySQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',             invert: false },
  { name: 'MongoDB',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',         invert: false },
  { name: 'Supabase',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',       invert: false },
  { name: 'Firebase',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg',         invert: false },

  // Machine Learning & Data
  { name: 'NumPy',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg',             invert: false },
  { name: 'Pandas',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg',           invert: false },
  { name: 'scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg', invert: false },
  
  // Tools & Hardware & Others
  { name: 'Git',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',                 invert: false },
  { name: 'GitHub',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',           invert: true  },
  { name: 'Canva',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',               invert: false },
  { name: 'CapCut',       icon: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Capcut-icon.svg',                             invert: false },
  { name: 'Arduino',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg',         invert: false },
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
    </section>
  );
}
