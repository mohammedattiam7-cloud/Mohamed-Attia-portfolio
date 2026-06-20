"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Text, Heading, Media } from "@once-ui-system/core";
import styles from "./DesignDecisions.module.scss";

const cards = [
  {
    problem: "No system existed yet. To check their leave balance, employees had to ask HR every time a basic question that turned into a manual back and forth.",
    insight: "Research showed people wanted their balance right at the moment of requesting leave — not chased down through someone else.",
    decision: "Building from scratch, I placed the balance inline the moment a leave type is selected Sick leave (Balance: 5 days) with a dedicated screen for the full view.",
    goal: "Turn ask HR first into a self-service moment confident decisions, in context.",
    imageSrc: "/images/projects/vacay-track/image03.jpg",
    imageAlt: "Leave type picker showing balance inline",
    emphasized: true,
  },
  {
    insight: "Opaque request status created anxiety after submitting.",
    decision: "A live shift card on Home, clear status tags on every request (Pending, Approved, Rejected, Canceled), and a full request history.",
    goal: "The user always knows where they stand.",
    imageSrc: "/images/projects/vacay-track/image04.jpg",
    imageAlt: "Home shift card and request list with status tags",
    emphasized: false,
  },
  {
    insight: "Everything lived in separate tools.",
    decision: "One Home that summarizes tasks, requests, and attendance, each with a \"See all\" entry point.",
    goal: "Delivers the core promise while keeping it simple.",
    imageSrc: "/images/projects/vacay-track/image05.jpg",
    imageAlt: "Home dashboard with tasks, requests, attendance and See all links",
    emphasized: false,
  },
];

const NUM = cards.length;
const ENTER_RANGE = 0.7;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export const DesignDecisions: React.FC = () => {
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
    <Column gap="8">
      <Heading as="h2" variant="heading-strong-xl">Design Decisions</Heading>
      <Text variant="body-default-l" onBackground="neutral-weak">
        Three decisions shaped directly by what I found in research.
      </Text>
    </Column>
  );

  if (!mounted || reduced) {
    return (
      <Column fillWidth gap="xl">
        {header}
        <Column fillWidth gap="m">
          {cards.map((card) => (
            <Column key={card.insight} padding="l" radius="l" background="surface" border="neutral-alpha-weak" gap="l">
              <Media aspectRatio="16 / 9" radius="m" border="neutral-alpha-weak" src={card.imageSrc} alt={card.imageAlt} />
              <Column gap="16">
                {card.problem && (
                  <Column gap="4">
                    <Text variant="label-default-s" onBackground="neutral-weak">Problem</Text>
                    <Text variant="body-default-m" onBackground="neutral-medium">{card.problem}</Text>
                  </Column>
                )}
                <Column gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">Insight</Text>
                  <Text variant="body-default-m" onBackground="neutral-medium">{card.insight}</Text>
                </Column>
                <Text variant={card.emphasized ? "heading-strong-m" : "heading-strong-s"} onBackground="neutral-strong">{card.decision}</Text>
                <Column gap="4">
                  <Text variant="label-default-s" onBackground="neutral-weak">Goal</Text>
                  <Text variant="body-default-m" onBackground="neutral-medium">{card.goal}</Text>
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
      <Column fillWidth gap="20">
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
                      <Media aspectRatio="9 / 16" radius="m" border="neutral-alpha-weak" src={card.imageSrc} alt={card.imageAlt} sizes="(max-width: 768px) 100vw, 240px" />
                    </div>
                    <Column className={styles.textSide} gap="20">
                      {card.problem && (
                        <Column gap="4">
                          <Text variant="label-default-s" onBackground="neutral-weak">Problem</Text>
                          <Text variant="body-default-m" onBackground="neutral-medium">{card.problem}</Text>
                        </Column>
                      )}
                      <Column gap="4">
                        <Text variant="label-default-s" onBackground="neutral-weak">Insight</Text>
                        <Text variant="body-default-m" onBackground="neutral-medium">{card.insight}</Text>
                      </Column>
                      <Text variant={card.emphasized ? "display-strong-xs" : "heading-strong-m"} onBackground="neutral-strong">{card.decision}</Text>
                      <Column gap="4">
                        <Text variant="label-default-s" onBackground="neutral-weak">Goal</Text>
                        <Text variant="body-default-m" onBackground="neutral-medium">{card.goal}</Text>
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
