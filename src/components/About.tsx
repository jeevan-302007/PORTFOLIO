import { useState, useCallback } from "react";
import { portfolioData } from "../data/portfolio";
import Reveal from "./Reveal";
import styles from "./About.module.css";

export default function About() {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const tmp = document.createElement("input");
      tmp.value = profile.email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [profile.email]);

  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <h2 className="section-title">About &amp; Contact</h2>
        </Reveal>

        <div className={styles.aboutGrid}>
          {/* Left Column (65%): Bio Copy & Direct Links */}
          <Reveal delay={80} className={styles.copyCol}>
            <p className={styles.bioText}>{profile.aboutText}</p>

            <div className={styles.linksRow}>
              <button
                type="button"
                className={`${styles.copyEmailBtn} ${
                  copied ? styles.copied : ""
                }`}
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? "✓ Copied" : `✉ ${profile.email}`}
              </button>

              {profile.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  GitHub
                </a>
              )}

              {profile.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                >
                  LinkedIn
                </a>
              )}
            </div>
          </Reveal>

          {/* Right Column (35%): Photo frame (Mobile first) */}
          <Reveal delay={120} className={styles.photoCol}>
            <div className={styles.photoFrame}>
              {!imgError ? (
                <img
                  src="/images/profile.webp"
                  alt="Jeevan Kumar Karri, portrait"
                  width={220}
                  height={220}
                  loading="lazy"
                  decoding="async"
                  onError={() => setImgError(true)}
                  className={styles.profileImg}
                />
              ) : (
                <div className={styles.fallbackInitials} aria-label={profile.name}>
                  {profile.photo.fallbackInitials}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
