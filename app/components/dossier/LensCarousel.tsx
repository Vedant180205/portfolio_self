'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './LensCarousel.module.css';

export interface LensPhoto {
  id: string;
  num: string;
  title: string;
  alt: string;
  src: string;
}

export const defaultLensPhotos: LensPhoto[] = [
  {
    id: 'C1_01',
    num: '01',
    title: 'Studio Session',
    alt: 'Musician in studio portrait',
    src: '/images/photography/20230530_190843.jpg',
  },
  {
    id: 'C1_02',
    num: '02',
    title: 'Vintage Optics',
    alt: 'Vintage analog camera study',
    src: '/images/photography/20230528_112806.jpg',
  },
  {
    id: 'C1_03',
    num: '03',
    title: 'Monsoon Lights',
    alt: 'Street photography during night rain',
    src: '/images/photography/20240223_171922.jpg',
  },
  {
    id: 'C1_04',
    num: '04',
    title: 'Ironwork Form',
    alt: 'Architectural iron gate perspective',
    src: '/images/photography/20230528_063251.jpg',
  },
  {
    id: 'C2_01',
    num: '05',
    title: 'Dramatic Sky',
    alt: 'Urban skyline with atmospheric clouds',
    src: '/images/photography/20230529_184440.jpg',
  },
  {
    id: 'C2_02',
    num: '06',
    title: 'Street Pulse',
    alt: 'Candid market vendor perspective',
    src: '/images/photography/20230528_063441.jpg',
  },
  {
    id: 'C2_03',
    num: '07',
    title: 'Abstract Shadows',
    alt: 'Geometry and shadow play on concrete',
    src: '/images/photography/20240603_100635.jpg',
  },
  {
    id: 'C2_04',
    num: '08',
    title: 'Golden Horizon',
    alt: 'Sunset silhouette landscape',
    src: '/images/photography/20251217_071811.jpg',
  },
  {
    id: 'C3_01',
    num: '09',
    title: 'Autumn Macro',
    alt: 'Detailed texture of foliage',
    src: '/images/photography/20240603_183133.jpg',
  },
  {
    id: 'C3_02',
    num: '10',
    title: 'Minimalist Void',
    alt: 'Negative space architecture',
    src: '/images/photography/20240606_094433.jpg',
  },
  {
    id: 'C3_03',
    num: '11',
    title: 'Heritage Monolith',
    alt: 'Historical monument angle',
    src: '/images/photography/20230425_165853.jpg',
  },
  {
    id: 'C3_04',
    num: '12',
    title: 'Night Cityscape',
    alt: 'Low-light evening metropolis',
    src: '/images/photography/20251220_174915.jpg',
  },
];

interface LensCarouselProps {
  photos?: LensPhoto[];
}

export default function LensCarousel({ photos = defaultLensPhotos }: LensCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const progressRef = useRef(15);
  const [activeIdx, setActiveIdx] = useState(1);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const [cursorVisible, setCursorVisible] = useState(false);

  const speedWheel = 0.035;
  const speedDrag = -0.15;
  const totalItems = photos.length;

  const updateCarousel = useCallback(() => {
    // Clamp progress between 0 and 100
    progressRef.current = Math.max(0, Math.min(progressRef.current, 100));
    const active = Math.floor((progressRef.current / 100) * (totalItems - 1));
    setActiveIdx(active);

    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const zIndex = totalItems - Math.abs(index - active);
      const activeValue = (index - active) / totalItems;
      item.style.setProperty('--zIndex', String(zIndex));
      item.style.setProperty('--active', String(activeValue));
    });
  }, [totalItems]);

  useEffect(() => {
    updateCarousel();
  }, [updateCarousel]);

  // Handle Drag & Pointer Interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDownRef.current = true;
    startXRef.current = e.clientX;
    if (stageRef.current) {
      stageRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }

    if (!isDownRef.current) return;
    const delta = (e.clientX - startXRef.current) * speedDrag;
    progressRef.current += delta;
    startXRef.current = e.clientX;
    updateCarousel();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDownRef.current = false;
    if (stageRef.current && stageRef.current.hasPointerCapture(e.pointerId)) {
      stageRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // Wheel handling scoped specifically inside the carousel with data-lenis-prevent
  const handleWheel = (e: React.WheelEvent) => {
    // Only capture horizontal or vertical scroll if dragging / intentionally hovering
    const wheelDelta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * speedWheel;
    progressRef.current += wheelDelta;
    updateCarousel();
  };

  // Click on item to navigate directly
  const handleItemClick = (index: number) => {
    progressRef.current = (index / (totalItems - 1)) * 100;
    updateCarousel();
  };

  return (
    <section className={styles.carouselSection} id="photography" aria-label="Through My Lens Photography">
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Section Header */}
      <div className={styles.headerBlock}>
        <span className={styles.eyebrow}>EXHIBIT // VISUAL ARCHIVE</span>
        <h2 className={styles.title}>THROUGH MY LENS.</h2>
        <p className={styles.subtitle}>
          Moments frozen in time — an archive of geometry, light, texture, and raw perspectives.
        </p>
      </div>

      {/* 3D Arc Stage */}
      <div
        ref={stageRef}
        className={styles.carouselStage}
        data-lenis-prevent
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onMouseEnter={() => setCursorVisible(true)}
        onMouseLeave={() => setCursorVisible(false)}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            className={styles.carouselItem}
            onClick={() => handleItemClick(index)}
            style={{
              '--items': totalItems,
            } as React.CSSProperties}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${photo.num}: ${photo.title}`}
          >
            <div className={styles.carouselBox}>
              <span className={styles.num}>{photo.num}</span>
              <div className={styles.metaInfo}>
                <h3 className={styles.photoTitle}>{photo.title}</h3>
                <span className={styles.photoAlt}>{photo.alt}</span>
              </div>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 70vw, 340px"
                className={styles.photoImg}
                priority={index < 4}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Custom Cursor */}
      <div
        ref={cursorRef}
        className={`${styles.customCursor} ${cursorVisible ? styles.showCursor : ''}`}
        aria-hidden="true"
      >
        <span>DRAG</span>
      </div>
    </section>
  );
}
