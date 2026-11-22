import CustomCursor from "./components/CustomCursor";
import BackgroundBlobs from "./components/BackgroundBlobs";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import Engineering from "./components/Engineering";
import About from "./components/About";
import { portfolioData } from "./data/portfolio";

export default function App() {
  const { profile } = portfolioData;

  return (
    <>
      <CustomCursor />
      <BackgroundBlobs />

      <Hero />

      <main>
        <ProjectGrid />
        <Engineering />
        <About />
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "var(--space-48)",
          paddingBottom: "max(var(--space-48), env(safe-area-inset-bottom))",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: "0.875rem",
        }}
      >
        <div className="container">
          <p>© 2026 {profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
