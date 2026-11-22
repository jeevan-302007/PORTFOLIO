import { portfolioData } from "../data/portfolio";
import Nav from "./Nav";
import styles from "./Hero.module.css";

export default function Hero() {
  const { profile } = portfolioData;
  const nameWords = profile.name.split(" ");
  const hasGithub = Boolean(profile.socials.github);

  return (
    <header className={styles.hero} id="hero">
      {/* Top Nav is integrated into the Hero */}
      <Nav />

      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent}>
            <h1 className={styles.name}>
              {nameWords.map((word, i) => (
                <span
                  key={i}
                  className={styles.word}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {word}
                  {i < nameWords.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </h1>

            <p className={styles.positioning}>{profile.positioning}</p>
            <p className={styles.focusLine}>{profile.currentFocus}</p>

            <div className={styles.stackPills}>
              {profile.coreStack.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>

            <div className={styles.ctas}>
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              {hasGithub && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Desktop Right Anchor Card */}
          <aside
            className={styles.statusCard}
            aria-label="Current focus and availability"
          >
            <div className={styles.statusHeader}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span>{profile.statusCard.statusText}</span>
            </div>

            <p className={styles.statusHeading}>
              {profile.statusCard.heading}
            </p>

            <ul className={styles.focusList}>
              {profile.statusCard.focusAreas.map((area, i) => (
                <li key={i} className={styles.focusItem}>
                  <span className={styles.focusBullet} aria-hidden="true">
                    ›
                  </span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </header>
  );
}
