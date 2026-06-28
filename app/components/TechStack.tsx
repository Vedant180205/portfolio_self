/* TechStack — flat icon grid, no categories */
const techs = [
  // Languages
  { name: 'Python', icon: '/icons/tech/python.svg', invert: false },
  { name: 'TypeScript', icon: '/icons/tech/typescript.svg', invert: false },
  { name: 'JavaScript', icon: '/icons/tech/javascript.svg', invert: false },
  { name: 'Java', icon: '/icons/tech/java.svg', invert: false },
  { name: 'C', icon: '/icons/tech/c.svg', invert: false },
  { name: 'C++', icon: '/icons/tech/cplusplus.svg', invert: false },

  // Web & Frontend
  { name: 'React', icon: '/icons/tech/react.svg', invert: false },
  { name: 'Next.js', icon: '/icons/tech/nextjs.svg', invert: true },
  { name: 'HTML5', icon: '/icons/tech/html5.svg', invert: false },
  { name: 'CSS3', icon: '/icons/tech/css3.svg', invert: false },
  { name: 'Node.js', icon: '/icons/tech/nodejs.svg', invert: false },

  // Databases
  { name: 'PostgreSQL', icon: '/icons/tech/postgresql.svg', invert: false },
  { name: 'MySQL', icon: '/icons/tech/mysql.svg', invert: false },
  { name: 'MongoDB', icon: '/icons/tech/mongodb.svg', invert: false },
  { name: 'Supabase', icon: '/icons/tech/supabase.svg', invert: false },
  { name: 'Firebase', icon: '/icons/tech/firebase.svg', invert: false },

  // Machine Learning & Data
  { name: 'NumPy', icon: '/icons/tech/numpy.svg', invert: false },
  { name: 'Pandas', icon: '/icons/tech/pandas.svg', invert: false },
  { name: 'scikit-learn', icon: '/icons/tech/scikitlearn.svg', invert: false },

  // Tools & Hardware & Others
  { name: 'Git', icon: '/icons/tech/git.svg', invert: false },
  { name: 'GitHub', icon: '/icons/tech/github.svg', invert: true },
  { name: 'Canva', icon: '/icons/tech/canva.svg', invert: false },
  { name: 'CapCut', icon: '/icons/tech/capcut.svg', invert: false },
  { name: 'Arduino', icon: '/icons/tech/arduino.svg', invert: false },
  { name: 'MediaPipe', icon: '/icons/tech/google.svg', invert: false },
  { name: 'Vercel', icon: '/icons/tech/vercel.svg', invert: true },
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
