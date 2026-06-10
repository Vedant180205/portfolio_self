'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Education.module.css';

const educationData = [
  {
    phase: 'PHASE 01',
    yearTop: '20',
    yearBottom: '21',
    titleLine1: 'VIVEKANAND ENGLISH',
    titleLine2: 'HIGH SCHOOL',
    degree: 'Secondary Schooling (SSC)',
    highlight: '97.8% in 10th Grade',
    period: 'Completed 2021',
    description: 'Developed core analytical, mathematical, and logical foundations, achieving top honors in final board examinations.',
    image: '/vehs.jpg',
    imageAlt: 'Vivekanand English High School Building',
  },
  {
    phase: 'PHASE 02',
    yearTop: '20',
    yearBottom: '23',
    titleLine1: 'RAMNIVAS RUIA',
    titleLine2: 'JUNIOR COLLEGE',
    degree: 'Junior College (11th & 12th)',
    highlight: 'Science Stream',
    period: 'Completed 2023',
    description: 'Studied core sciences and mathematics, building a solid bridge into engineering and computing systems.',
    image: '/ruia.png',
    imageAlt: 'Ramnivas Ruia Junior College Building',
  },
  {
    phase: 'PHASE 03',
    yearTop: '20',
    yearBottom: '28',
    titleLine1: 'SHAH & ANCHOR KUTCHHI',
    titleLine2: 'ENGINEERING COLLEGE',
    degree: 'Bachelor of Technology (BTech)',
    highlight: 'Electronics & Computer Science',
    period: 'Ongoing (2023 - 2028)',
    description: 'Engineering systems across hardware and software domains, specializing in systems programming, IoT, and application development.',
    image: '/sakec.png',
    imageAlt: 'Shah and Anchor Kutchhi Engineering College Building',
  },
];

const ticks = [
  { year: '2020', top: '12%', side: 'right' },
  { year: '2022', top: '42%', side: 'left' },
  { year: '2024', top: '70%', side: 'right' },
  { year: '2025', top: '77%', side: 'left' },
  { year: '2026', top: '84%', side: 'right' },
];

export default function Education() {
  const [revealedRows, setRevealedRows] = useState<Record<string, boolean>>({});
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const phase = entry.target.getAttribute('data-phase') || '';
            setRevealedRows((prev) => ({ ...prev, [phase]: true }));
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    Object.values(rowRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="education" aria-label="Education Journey">
      {/* Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionEyebrow}>ACADEMIC PATHWAY</span>
        <h2 className={styles.sectionTitle}>EDUCATION</h2>
      </div>

      {/* Timeline Layout */}
      <div className={styles.timeline}>
        
        {/* Central Spine */}
        <div className={styles.timelineSpine}>
          <div className={styles.spineTicks}>
            {ticks.map((tick) => (
              <div
                key={tick.year}
                className={`${styles.tick} ${
                  tick.side === 'left' ? styles.tickLeft : styles.tickRight
                }`}
                style={{ top: tick.top }}
              >
                <span className={styles.tickLabel}>{tick.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Rows */}
        <div className={styles.timelineList}>
          {educationData.map((item, index) => {
            const isEven = index % 2 === 1;
            const isRevealed = !!revealedRows[item.phase];

            return (
              <div
                key={item.titleLine1}
                className={`${styles.milestoneRow} ${
                  isRevealed ? styles.rowRevealed : ''
                }`}
                ref={(el) => {
                  rowRefs.current[item.phase] = el;
                }}
                data-phase={item.phase}
              >
                {/* Year Block inside the Spine */}
                <div className={styles.yearBlock}>
                  <span className={styles.yearTop}>{item.yearTop}</span>
                  <span className={styles.yearBottom}>{item.yearBottom}</span>
                </div>

                {/* Left Column */}
                <div className={styles.leftCol}>
                  {!isEven ? (
                    <div className={styles.textBlock}>
                      <h3 className={styles.title}>
                        <span className={styles.titleLine}>{item.titleLine1}</span>
                        <br />
                        <span className={styles.titleAccent}>{item.titleLine2}</span>
                      </h3>
                      <p className={styles.degree}>{item.degree}</p>
                      <p className={styles.desc}>{item.description}</p>
                      <span className={styles.highlightText}>{item.highlight}</span>
                    </div>
                  ) : (
                    <div className={styles.imageWrap}>
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className={styles.img}
                        sizes="(max-width: 768px) 100vw, 45vw"
                        quality={95}
                        priority={index === 0}
                      />
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className={styles.rightCol}>
                  {isEven ? (
                    <div className={styles.textBlock}>
                      <h3 className={styles.title}>
                        <span className={styles.titleLine}>{item.titleLine1}</span>
                        <br />
                        <span className={styles.titleAccent}>{item.titleLine2}</span>
                      </h3>
                      <p className={styles.degree}>{item.degree}</p>
                      <p className={styles.desc}>{item.description}</p>
                      <span className={styles.highlightText}>{item.highlight}</span>
                    </div>
                  ) : (
                    <div className={styles.imageWrap}>
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className={styles.img}
                        sizes="(max-width: 768px) 100vw, 45vw"
                        quality={95}
                        priority={index === 0}
                      />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
