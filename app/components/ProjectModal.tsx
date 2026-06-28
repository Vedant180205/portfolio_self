'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Projects.module.css';

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

// We type project as any to avoid redefining the whole structure since we're reusing it directly from Projects.tsx
interface ProjectModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (project) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [project]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) {
        onClose();
      }
    };
    const dialog = dialogRef.current;
    dialog?.addEventListener('click', handleClickOutside);
    return () => dialog?.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  if (!project) return null;

  return (
    <dialog ref={dialogRef} className={styles.projectDialog}>
      <div className={styles.modalBody}>
        {/* Left Column: text details & GitHub link */}
        <div className={styles.modalLeft}>
          <span className={styles.modalNumber}>
            {project.number} / {project.subtitle.toUpperCase()}
          </span>
          <h3 id="modal-title" className={styles.modalTitle}>
            {project.title}
          </h3>
          <div className={styles.modalDesc}>{project.description}</div>
          <div className={styles.modalTags}>
            {project.tags.map((tag: string) => (
              <span key={tag} className={styles.modalTag}>
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.modalGithubBtn}
            aria-label={`View ${project.title} repository on GitHub`}
          >
            <GitHubIcon />
            <span>VIEW REPOSITORY</span>
          </a>
        </div>

        {/* Right Column: high-res image */}
        <div className={styles.modalRight}>
          <div className={styles.modalImageWrapper}>
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className={styles.modalImage}
            />
          </div>
        </div>

        <button
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </dialog>
  );
}
