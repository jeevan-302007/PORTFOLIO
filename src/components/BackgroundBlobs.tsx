import { useEffect, useRef } from "react";
import styles from "./BackgroundBlobs.module.css";

export default function BackgroundBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!containerRef.current) return;
      const blobs = containerRef.current.querySelectorAll(`.${styles.blob}`);
      blobs.forEach((blob) => {
        (blob as HTMLElement).style.animationPlayState = document.hidden
          ? "paused"
          : "running";
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div ref={containerRef} className={styles.bgBlobs} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  );
}
