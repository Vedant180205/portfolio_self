'use client';

/* Workflow — flat icon grid, AI and productivity tools */
const tools = [
  { name: 'Antigravity', icon: '/icons/antigravity.svg', invert: false },
  { name: 'ChatGPT', icon: '/icons/chatgpt.svg', invert: false },
  { name: 'Gemini', icon: '/icons/gemini.svg', invert: false },
  { name: 'DeepSeek', icon: '/icons/deepseek.svg', invert: false },
  { name: 'Perplexity', icon: '/icons/perplexity.svg', invert: false },
  { name: 'GitHub Copilot', icon: '/icons/copilot.svg', invert: false },
];

import { useNearViewport } from '../hooks/useNearViewport';
import styles from './Workflow.module.css';

export default function Workflow() {
  const { ref, isNearViewport } = useNearViewport<HTMLElement>();
  return (
    <section ref={ref} className={`${styles.section} ${isNearViewport ? styles.isActive : styles.isPaused}`} id="workflow" aria-label="Workflow tools">
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>AI & UTILITIES</span>
        <h2 className={styles.title}>WORKFLOW</h2>
      </div>

      {/* Icon grid */}
      <div className={styles.grid}>
        {tools.map((tool) => (
          <div key={tool.name} className={styles.card}>
            <div className={`${styles.iconWrap} ${tool.invert ? styles.invertDark : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.icon}
                alt={tool.name}
                width={48}
                height={48}
                loading="lazy"
              />
            </div>
            <span className={styles.cardName}>{tool.name}</span>
          </div>
        ))}
      </div>

      {/* Scrolling marquee strip */}
      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...tools, ...tools, ...tools, ...tools].map((tool, i) => (
            <span key={i} className={styles.marqueeItem}>
              {tool.name}
              <span className={styles.marqueeDot}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
