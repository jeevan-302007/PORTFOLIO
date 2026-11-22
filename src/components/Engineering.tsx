import { portfolioData } from "../data/portfolio";
import Reveal from "./Reveal";
import styles from "./Engineering.module.css";

export default function Engineering() {
  const { engineeringMilestones, techStack } = portfolioData;

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <Reveal>
          <h2 className="section-title">Engineering &amp; Technical Stack</h2>
        </Reveal>

        <div className={styles.layout}>
          {/* Engineering Milestones */}
          <Reveal delay={80}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>
                <span className={styles.panelIcon} aria-hidden="true">
                  ⚡
                </span>
                <span>Engineering Milestones</span>
              </h3>

              <div className={styles.milestonesList}>
                {engineeringMilestones.map((m, i) => (
                  <div key={i} className={styles.milestoneItem}>
                    <h4 className={styles.milestoneTitle}>{m.title}</h4>
                    <p className={styles.milestoneRole}>{m.roleOrDetail}</p>
                    <p className={styles.milestoneContext}>{m.context}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Technical Stack (3 Groups with mono tags) */}
          <Reveal delay={160}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>
                <span className={styles.panelIcon} aria-hidden="true">
                  ⚙️
                </span>
                <span>Core Technical Stack</span>
              </h3>

              <div className={styles.stackGroups}>
                {techStack.map((group, idx) => (
                  <div key={idx}>
                    <h4 className={styles.groupTitle}>{group.category}</h4>
                    <div className={styles.tagsContainer}>
                      {group.skills.map((skill) => (
                        <span key={skill} className="mono-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
