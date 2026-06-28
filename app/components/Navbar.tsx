'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';


const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'EDUCATION', href: '/education' },
  { label: 'EXPERIENCE', href: '/experience' },
  { label: 'DOSSIER', href: '/dossier' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const active = pathname === '/' ? 'HOME' : pathname.slice(1).toUpperCase() || 'HOME';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when drawer is open (iOS compliant)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overscrollBehavior = '';
    }
    return () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overscrollBehavior = '';
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${pathname === '/education' && !scrolled ? styles.lightMode : ''}`}>
        {/* Logo */}
        <a href={pathname === '/' ? '#home' : '/'} className={styles.logo} id="nav-logo">
          <div className={styles.logoMark}>
            <Image
              src={pathname === '/education' && !scrolled ? "/ui/logo-education.webp" : "/ui/logo-new.webp"}
              alt="VP Logo"
              width={80}
              height={80}
              className={styles.logoImg}
              priority
            />
          </div>
          <div className={styles.logoText}>
            <span className={`${styles.logoRole} ${styles.hiddenOnDesktop}`}>ENGINEERING THE IMPOSSIBLE.</span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className={styles.navLinks} role="list">
          {navLinks.map((link) => {
            const isAnchor = link.href.startsWith('#');
            const href = isAnchor && pathname !== '/' ? `/${link.href}` : link.href;

            return (
              <li key={link.label}>
                <a
                  href={href}
                  id={`nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  className={`${styles.navLink} ${active === link.label ? styles.activeLink : ''}`}
                  onClick={() => handleLinkClick()}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: CTA + toggle + hamburger */}
        <div className={styles.rightGroup}>
          <a href={pathname === '/' ? '#contact' : '/#contact'} id="nav-connect-btn" className={styles.ctaBtn}>
            LET&apos;S CONNECT
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

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
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} role="dialog" aria-labelledby="drawer-heading">
        <h2 id="drawer-heading" className={styles.visuallyHidden}>Navigation Menu</h2>
        <ul className={styles.drawerLinks}>
          {navLinks.map((link, i) => {
            const isAnchor = link.href.startsWith('#');
            const href = isAnchor && pathname !== '/' ? `/${link.href}` : link.href;

            return (
              <li key={link.label} style={{ animationDelay: `${i * 0.06}s` }}>
                <a
                  href={href}
                  className={`${styles.drawerLink} ${active === link.label ? styles.drawerLinkActive : ''}`}
                  onClick={() => handleLinkClick()}
                >
                  <span className={styles.drawerNum}>0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={pathname === '/' ? '#contact' : '/#contact'}
          className={styles.drawerCta}
          onClick={() => setMenuOpen(false)}
        >
          LET&apos;S CONNECT →
        </a>
      </div>
    </>
  );
}
