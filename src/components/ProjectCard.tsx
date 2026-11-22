import type { Project } from "../data/portfolio";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const dotClass =
    project.status === "Completed"
      ? styles.dotCompleted
      : project.status === "Built"
      ? styles.dotBuilt
      : styles.dotInProgress;

  const validLinks: { label: string; url: string }[] = [];
  if (project.links.demo && project.links.demo !== "#") {
    validLinks.push({ label: "Live Demo", url: project.links.demo });
  }
  if (project.links.repo && project.links.repo !== "#") {
    validLinks.push({ label: "Repository", url: project.links.repo });
  }
  if (
    project.links.other?.url &&
    project.links.other.url !== "#" &&
    project.links.other.label
  ) {
    validLinks.push({
      label: project.links.other.label,
      url: project.links.other.url,
    });
  }

  const renderContent = () => (
    <>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>

      {project.collaborator && (
        <p className={styles.collaborator}>
          Built with{" "}
          <a
            href={project.collaborator.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.collabLink}
          >
            {project.collaborator.name}
          </a>
        </p>
      )}

      <ul className={styles.highlights}>
        {project.highlights.map((h, i) => (
          <li key={i} className={styles.highlight}>
            {h}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <article className={`${styles.card} ${project.featured ? styles.featuredCard : ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.statusPill}>
          <span className={`${styles.statusDot} ${dotClass}`} aria-hidden="true" />
          <span>{project.status}</span>
        </div>
        <span className={styles.context} title={project.context}>
          {project.context}
        </span>
      </div>

      {/* Body */}
      {project.featured ? (
        <div className={styles.featuredLayout}>
          <div>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.summary}>{project.summary}</p>
            {project.collaborator && (
              <p className={styles.collaborator}>
                Built with{" "}
                <a
                  href={project.collaborator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.collabLink}
                >
                  {project.collaborator.name}
                </a>
              </p>
            )}
          </div>
          <div>
            <ul className={styles.highlights}>
              {project.highlights.map((h, i) => (
                <li key={i} className={styles.highlight}>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        renderContent()
      )}

      {/* Tech Tags */}
      <div className={styles.tags}>
        {project.stack.map((tech) => (
          <span key={tech} className="mono-tag">
            {tech}
          </span>
        ))}
      </div>

      {/* Links (Pinned at the bottom, only if valid URLs exist) */}
      {validLinks.length > 0 && (
        <div className={styles.links}>
          {validLinks.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: "8px 16px", fontSize: "0.8125rem", minHeight: "44px" }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
