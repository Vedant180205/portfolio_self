'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'HOME',         href: '#home' },
  { label: 'ABOUT',        href: '#about' },
  { label: 'PROJECTS',     href: '#projects' },
  { label: 'TECH STACK',   href: '#techstack' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'JOURNEY',      href: '#journey' },
  { label: 'CONTACT',      href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('HOME');
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (label: string) => {
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <a href="#home" className={styles.logo} id="nav-logo">
          <div className={styles.logoMark}>
            <Image
              src="/logo.png"
              alt="VP Logo"
              width={80}
              height={80}
              className={styles.logoImg}
              priority
            />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoRole}>ENGINEERING THE IMPOSSIBLE.</span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className={styles.navLinks} role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`${styles.navLink} ${active === link.label ? styles.activeLink : ''}`}
                onClick={() => handleLinkClick(link.label)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: CTA + toggle + hamburger */}
        <div className={styles.rightGroup}>
          <a href="#contact" id="nav-connect-btn" className={styles.ctaBtn}>
            LET&apos;S CONNECT
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <ThemeToggle />

          {/* Hamburger — mobile only */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            id="nav-hamburger"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} role="dialog" aria-label="Navigation menu">
        <ul className={styles.drawerLinks}>
          {navLinks.map((link, i) => (
            <li key={link.label} style={{ animationDelay: `${i * 0.06}s` }}>
              <a
                href={link.href}
                className={`${styles.drawerLink} ${active === link.label ? styles.drawerLinkActive : ''}`}
                onClick={() => handleLinkClick(link.label)}
              >
                <span className={styles.drawerNum}>0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={styles.drawerCta}
          onClick={() => setMenuOpen(false)}
        >
          LET&apos;S CONNECT →
        </a>
      </div>
    </>
  );
}
