import { portfolioData } from "../data/portfolio";
import ProjectCard from "./ProjectCard";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid() {
  const { projects } = portfolioData;

  return (
    <section id="projects">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Featured &amp; Selected Projects</h2>
        </Reveal>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 50}
              className={project.featured ? styles.colFeatured : styles.colRegular}
            >
              <TiltCard>
                <ProjectCard project={project} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
