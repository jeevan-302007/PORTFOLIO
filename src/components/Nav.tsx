import { useState, useEffect, useCallback, useRef } from "react";
import { portfolioData } from "../data/portfolio";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const { brand, links, resume } = portfolioData.navigation;
  const showResume = resume && resume.available;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Focus trap in mobile menu */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* Desktop: Vertical pill at top of page */}
      <nav
        className={`${styles.navPill} ${
          scrolled ? styles.pillHidden : styles.pillVisible
        }`}
        aria-label="Primary desktop navigation"
        aria-hidden={scrolled}
      >
        <a href="#hero" className={styles.pillBrand} aria-label={brand.name}>
          <span className={styles.logoBadge}>{brand.logo}</span>
          <span className={styles.brandName}>{brand.name}</span>
        </a>

        <div className={styles.pillLinks}>
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              tabIndex={scrolled ? -1 : 0}
            >
              {item.label}
            </a>
          ))}
          {showResume && (
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
              tabIndex={scrolled ? -1 : 0}
            >
              {resume.label}
            </a>
          )}
        </div>
      </nav>

      {/* Desktop: Horizontal floating bar when scrolled > 80px */}
      <nav
        className={`${styles.navBar} ${
          scrolled ? styles.barVisible : styles.barHidden
        }`}
        aria-label="Scrolled floating navigation"
        aria-hidden={!scrolled}
      >
        <a href="#hero" className={styles.barBrand} aria-label={brand.name}>
          <span className={styles.logoBadge}>{brand.logo}</span>
          <span className={styles.brandName}>{brand.name}</span>
        </a>

        <div className={styles.barLinks}>
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              tabIndex={scrolled ? 0 : -1}
            >
              {item.label}
            </a>
          ))}
          {showResume && (
            <a
              href={resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
              tabIndex={scrolled ? 0 : -1}
            >
              {resume.label}
            </a>
          )}
        </div>
      </nav>

      {/* Mobile navigation toggle */}
      <div className={styles.mobileNav}>
        <button
          ref={hamburgerRef}
          className={`${styles.hamburger} ${
            menuOpen ? styles.hamburgerOpen : ""
          }`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-dialog"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-nav-dialog"
        className={`${styles.mobileOverlay} ${menuOpen ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {links.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.navLink}
            onClick={closeMenu}
            ref={i === 0 ? firstLinkRef : undefined}
          >
            {item.label}
          </a>
        ))}
        {showResume && (
          <a
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
            onClick={closeMenu}
          >
            {resume.label}
          </a>
        )}
      </div>
    </>
  );
}
