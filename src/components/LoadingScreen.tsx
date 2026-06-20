"use client";

import { useEffect, useState } from "react";

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const shown = sessionStorage.getItem("loading-shown");
    if (shown) {
      setVisible(false);
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const duration = mq.matches ? 400 : 3000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("loading-shown", "1");
            window.dispatchEvent(new Event("loading-complete"));
          }, mq.matches ? 0 : 500);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--static-space-24)",
        background: "var(--page-background)",
        opacity: fadeOut ? 0 : 1,
        transition: reduced ? "none" : "opacity 500ms ease",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--static-space-4)",
          fontFamily: "var(--font-heading)",
        }}
      >
        <span
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--brand-on-background-strong)",
          }}
        >
          Mohamed
        </span>
        <span
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--neutral-on-background-strong)",
          }}
        >
          Attia
        </span>
      </div>

      <div
        style={{
          width: "min(200px, 60vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--static-space-8)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "3px",
            borderRadius: "var(--radius-full, 9999px)",
            background: "var(--neutral-alpha-weak)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              borderRadius: "var(--radius-full, 9999px)",
              background: "var(--brand-on-background-strong)",
              transition: reduced ? "none" : "width 60ms linear",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: "var(--font-size-label-default-s, 12px)",
            fontWeight: 500,
            letterSpacing: "0.05em",
            color: "var(--neutral-on-background-weak)",
          }}
        >
          LOADING
        </span>
      </div>
    </div>
  );
};
