"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const BREAKPOINT = 768;

export const MobileGate: React.FC = () => {
  const [show, setShow] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("mobile-gate-dismissed");
    if (dismissed) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    if (window.innerWidth < BREAKPOINT) {
      previousFocus.current = document.activeElement as HTMLElement;
      setShow(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimateIn(true));
      });
    }
  }, []);

  useEffect(() => {
    if (show && btnRef.current) {
      btnRef.current.focus();
    }
  }, [show]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
      }
      if (e.key === "Tab") {
        const sheet = sheetRef.current;
        if (!sheet) return;
        const focusable = sheet.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    []
  );

  const dismiss = () => {
    setAnimateIn(false);
    setTimeout(
      () => {
        setShow(false);
        sessionStorage.setItem("mobile-gate-dismissed", "1");
        previousFocus.current?.focus();
      },
      reduced ? 0 : 400
    );
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Desktop recommended"
      onKeyDown={handleKeyDown}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Backdrop with blurred avatar */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--page-background)",
          opacity: animateIn ? 0.85 : 0,
          transition: reduced ? "none" : "opacity 400ms ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          backgroundImage: "url(/images/profile.PNG)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          opacity: animateIn ? 0.3 : 0,
          transition: reduced ? "none" : "opacity 600ms ease",
        }}
      />

      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        style={{
          position: "relative",
          zIndex: 1,
          background: "var(--surface-background)",
          borderTop: "1px solid var(--neutral-alpha-weak)",
          borderRadius: "var(--radius-xl, 24px) var(--radius-xl, 24px) 0 0",
          padding: "var(--static-space-12) var(--static-space-24) var(--static-space-40)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--static-space-24)",
          transform: animateIn ? "translateY(0)" : "translateY(100%)",
          transition: reduced ? "none" : "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: "36px",
            height: "4px",
            borderRadius: "var(--radius-full, 9999px)",
            background: "var(--neutral-alpha-medium)",
            flexShrink: 0,
          }}
        />

        {/* Avatar */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid var(--neutral-alpha-weak)",
          }}
        >
          <img
            src="/images/profile.PNG"
            alt="Mohamed Attia"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Heading */}
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
              fontSize: "var(--font-size-heading-strong-l, 20px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              textAlign: "center",
            }}
          >
            <span style={{ color: "var(--brand-on-background-strong)" }}>BETTER</span>{" "}
            <span style={{ color: "var(--neutral-on-background-strong)" }}>ON DESKTOP</span>
          </span>
        </div>

        {/* Body */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-body-default-m, 16px)",
            lineHeight: 1.5,
            color: "var(--neutral-on-background-weak)",
            textAlign: "center",
            margin: 0,
            maxWidth: "320px",
          }}
        >
          This portfolio is crafted for desktop. Open it on a laptop or desktop for the full
          experience.
        </p>

        {/* CTA */}
        <button
          ref={btnRef}
          onClick={dismiss}
          aria-label="Continue to mobile site"
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "var(--static-space-12) var(--static-space-24)",
            fontFamily: "var(--font-label)",
            fontSize: "var(--font-size-body-default-m, 16px)",
            fontWeight: 600,
            color: "var(--solid-on-solid-strong)",
            background: "var(--solid-background)",
            border: "none",
            borderRadius: "var(--radius-l, 16px)",
            cursor: "pointer",
            transition: reduced ? "none" : "opacity 150ms ease",
          }}
        >
          Continue Anyway
        </button>
      </div>
    </div>
  );
};
