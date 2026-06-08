'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'HOME',       href: '#home' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'TECH STACK', href: '#techstack' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'JOURNEY',    href: '#journey' },
  { label: 'CONTACT',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('HOME');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      {/* Logo */}
      <a href="#home" className={styles.logo} id="nav-logo">
        <div className={styles.logoMark}>
          <span className={styles.logoLetters}>VP</span>
          <span className={styles.logoDot}></span>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>VEDANT PATIL</span>
          <span className={styles.logoRole}>BUILDER &amp; ENGINEER</span>
        </div>
      </a>

      {/* Nav Links */}
      <ul className={styles.navLinks} role="list">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className={`${styles.navLink} ${active === link.label ? styles.activeLink : ''}`}
              onClick={() => setActive(link.label)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Right side: CTA + pull cord */}
      <div className={styles.rightGroup}>
        <a href="#contact" id="nav-connect-btn" className={styles.ctaBtn}>
          LET&apos;S CONNECT
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
