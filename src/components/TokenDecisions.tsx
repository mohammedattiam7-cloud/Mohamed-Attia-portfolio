"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Text, Heading, Media } from "@once-ui-system/core";
import styles from "./TokenDecisions.module.scss";

const cards = [
  {
    insight: "Building for multiple languages and directions from a single layout was unsustainable.",
    decision: "Real RTL & i18n — not a mirrored layout. Direction, font family and text content live as variables in a dedicated Language mode (EN / AR). Even asymmetric details like border width are tokenized.",
    why: "Switching to Arabic changes data, not hand-built screens.",
    imageSrc: "/images/projects/design-tokens/Image06.jpg",
    imageAlt: "Language mode switching between English and Arabic",
    emphasized: true,
  },
  {
    insight: "Brand and density changes required touching every component manually.",
    decision: "Swap brands without touching components — radius, density and shadow abstracted into sm–xl scales at the semantic layer. Components reference the scale, never the raw number.",
    why: "A brand or density change ripples through automatically.",
    imageSrc: "/images/projects/design-tokens/Image07.jpg",
    imageAlt: "Semantic T-shirt scales applied across brands",
    emphasized: false,
  },
];

const NUM = cards.length;
const ENTER_RANGE = 0.7;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export const TokenDecisions: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setProgress(clamp((-rect.top / scrollable) * NUM, 0, NUM));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const header = (
    <Column gap="12">
      <Heading as="h2" variant="heading-strong-xl">Two Decisions That Made It Scale</Heading>
      <Text variant="body-default-l" onBackground="neutral-weak">
        Language handled as a switchable mode, not a duplicated layout. Token names built on a fixed grammar. Semantic scales so a brand swap never touches a single component.
      </Text>
    </Column>
  );

  if (!mounted || reduced) {
    return (
      <Column fillWidth gap="24">
        {header}
        <Column fillWidth gap="m">
          {cards.map((card) => (
            <Column key={card.insight} padding="l" radius="l" background="surface" border="neutral-alpha-weak" gap="l">
              <Media aspectRatio="1 / 1" radius="m" border="neutral-alpha-weak" src={card.imageSrc} alt={card.imageAlt} />
              <Column gap="16">
                <Column gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">Insight</Text>
                  <Text variant="body-default-m" onBackground="neutral-medium">{card.insight}</Text>
                </Column>
                <Text variant={card.emphasized ? "heading-strong-m" : "heading-strong-s"} onBackground="neutral-strong">{card.decision}</Text>
                <Column gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">Why it matters</Text>
                  <Text variant="body-default-m" onBackground="neutral-medium">{card.why}</Text>
                </Column>
              </Column>
            </Column>
          ))}
        </Column>
      </Column>
    );
  }

  return (
    <div className={styles.sectionWrapper}>
      <Column fillWidth gap="8">
        {header}
        <div ref={outerRef} className={styles.outer} style={{ height: `${NUM * 100}vh` }}>
          <div className={styles.stickyContainer}>
            {cards.map((card, i) => {
              const enterProgress = clamp((progress - (i - ENTER_RANGE)) / ENTER_RANGE, 0, 1);
              const translateYvh = i === 0 ? 0 : (1 - enterProgress) * 110;
              const depth = clamp(progress - i - 0.5, 0, NUM);
              const scale = clamp(1 - depth * 0.04, 0.80, 1);
              const opacity = clamp(1 - depth * 0.22, 0.2, 1);
              const imageLeft = i % 2 === 0;

              return (
                <div
                  key={card.insight}
                  className={styles.cardWrapper}
                  style={{
                    zIndex: i + 1,
                    transform: `translateY(${translateYvh}vh) scale(${scale})`,
                    opacity,
                    transformOrigin: "top center",
                  }}
                >
                  <div className={styles.card}>
                    <span className={styles.cardNumber} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`${styles.inner} ${imageLeft ? styles.imgLeft : styles.imgRight}`}>
                      <div className={styles.imageFrame}>
                        <Media aspectRatio="1 / 1" radius="m" border="neutral-alpha-weak" src={card.imageSrc} alt={card.imageAlt} sizes="(max-width: 768px) 100vw, 320px" />
                      </div>
                      <Column className={styles.textSide} gap="20">
                        <Column gap="4">
                          <Text variant="label-default-s" onBackground="neutral-weak">Insight</Text>
                          <Text variant="body-default-m" onBackground="neutral-medium">{card.insight}</Text>
                        </Column>
                        <Text variant={card.emphasized ? "display-strong-xs" : "heading-strong-m"} onBackground="neutral-strong">{card.decision}</Text>
                        <Column gap="4">
                          <Text variant="label-default-s" onBackground="neutral-weak">Why it matters</Text>
                          <Text variant="body-default-m" onBackground="neutral-medium">{card.why}</Text>
                        </Column>
                      </Column>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Column>
    </div>
  );
};
