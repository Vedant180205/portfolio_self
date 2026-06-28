'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/dossier/page.module.css';

interface Sketch {
  id: string;
  src: string;
  title: string;
  medium: string;
  year: string;
}

export function CollapsibleSketches({ sketches }: { sketches: Sketch[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // We assume the first 3 sketches are rendered by the parent Server Component.
  // This component manages sketches starting from index 3.
  const extraSketches = sketches.slice(3);

  if (extraSketches.length === 0) return null;

  if (!isOpen) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
        <button className={styles.viewMoreBtn} onClick={() => setIsOpen(true)}>
          VIEW MORE SKETCHES
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.museumRow}>
        {extraSketches.slice(0, 2).map((sketch, index) => (
          <div className={styles.exhibitionFrame} id={`artwork-${index + 4}`} key={sketch.id}>
            <div className={styles.artworkContainer}>
              <div className={styles.canvasTexture} />
              <Image
                src={sketch.src}
                alt={sketch.title}
                fill
                className={styles.sketchImage}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.museumTag}>
              <span className={styles.tagNum}>{sketch.id}</span>
              <h4 className={styles.tagTitle}>{sketch.title}</h4>
              <p className={styles.tagMedium}>{sketch.medium}</p>
              <p className={styles.tagYear}>{sketch.year}</p>
            </div>
          </div>
        ))}
      </div>

      {extraSketches[2] && (
        <div className={styles.museumRowSingle}>
          <div className={styles.exhibitionFrameLarge} id="artwork-6">
            <div className={styles.artworkContainerLarge}>
              <div className={styles.canvasTexture} />
              <Image
                src={extraSketches[2].src}
                alt={extraSketches[2].title}
                fill
                className={styles.sketchImage}
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
            <div className={styles.museumTag}>
              <span className={styles.tagNum}>{extraSketches[2].id}</span>
              <h4 className={styles.tagTitle}>{extraSketches[2].title}</h4>
              <p className={styles.tagMedium}>{extraSketches[2].medium}</p>
              <p className={styles.tagYear}>{extraSketches[2].year}</p>
            </div>
          </div>
        </div>
      )}

      {/* View Less Button */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
        <button className={styles.viewMoreBtn} onClick={() => setIsOpen(false)}>
          VIEW LESS
        </button>
      </div>
    </>
  );
}
