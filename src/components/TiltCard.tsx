import { useRef, useCallback, type ReactNode } from "react";
import styles from "./TiltCard.module.css";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  const isFine =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches;

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isFine || !innerRef.current || !wrapperRef.current) return;
      cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const rect = wrapperRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        // Subtle tilt: max ~4.5 degrees
        innerRef.current!.style.transform = `perspective(1000px) rotateX(${
          -y * 5
        }deg) rotateY(${x * 5}deg)`;
      });
    },
    [isFine]
  );

  const onLeave = useCallback(() => {
    if (!innerRef.current) return;
    cancelAnimationFrame(rafId.current);
    innerRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div ref={innerRef} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
