"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Text, Media } from "@once-ui-system/core";
import styles from "./PosDecisions.module.scss";

type DecisionCard = {
  title?: string;
  insight: string;
  decision?: string;
  why?: string;
  result?: string;
  businessImpact?: string;
  imageSrc?: string;
  imageAlt?: string;
  emphasized: boolean;
};

const cards: DecisionCard[] = [
  {
    title: "Decision 1 – Automated Menu Building",
    insight: "The success or failure of any point-of-sale (POS) system hinges on the structure of its menu, including items, sizes, extra options, and promotions. Other systems forced restaurant owners to build menus manually, resulting in lost customers.",
    decision: "The easiest solution was an optimized form. I decided to eliminate the form entirely. The restaurant owner photographs their paper menu, and AI builds the entire structure, shifting their role from creation to review. A manual editor covers any gaps left by the AI. Promotions, such as \"buy one, get one free,\" are added to the form as a general rule, not as an alternative.",
    why: "I shifted the heavy lifting from the user to the system.",
    result: "The system was tested with 7 restaurant owners. Most built their entire menus in approximately 15 minutes on their own, without any assistance.",
    businessImpact: "During testing, it became clear that menu creation is the step that requires the most support, and it's the same step where competitors lose customers. Automating this step means that restaurant owners will start working on it themselves, which means reducing the support requests that reach the support team once the product is launched.",
    imageSrc: "/images/projects/pos-system/photo-08.jpg",
    imageAlt: "Three-step sequence: a photo of a paper menu, the AI-generated menu structure built from it, and the owner reviewing and correcting the result",
    emphasized: false,
  },
  {
    title: "Decision 02 — Identity is a system, not a color",
    insight: "The menu  digital menu and online ordering  shipped with one theme, so the owner could only change the brand color. Every restaurant looked like the same menu in a different coat, and one color can't carry an identity. The lazy fix is more colors. My move was full themes  type, layout, spacing, and feel packaged together so the owner picks an identity in one tap, not a paint job.",
    why: "I took a designer level decision off the user and put it in the system. Owners self serve a real identity, so we ship distinct looking restaurants with no designer in the loop. And themes weren't only a look  they opened pricing tiers, turning identity into something owners would pay more for.",
    result: "Tested with 7 owners. They split across different themes instead of defaulting to one range was felt, not just offered.",
    businessImpact: "Premium themes sit behind a higher tier  so identity isn't just a better experience, it's a new revenue stream for the product.",
    imageSrc: "/images/projects/pos-system/photo-07.jpg",
    imageAlt: "Two restaurant menus shown side by side in different full themes — distinct type, layout, spacing, and color, not just a different brand color",
    emphasized: false,
  },
];

const NUM = cards.length;
const ENTER_RANGE = 0.7;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export const PosDecisions: React.FC = () => {
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

  if (!mounted || reduced) {
    return (
      <Column fillWidth gap="m">
        {cards.map((card) => (
          <Column key={card.insight} padding="l" radius="l" background="surface" border="neutral-alpha-weak" gap="l">
            {card.imageSrc && <Media aspectRatio="16 / 9" radius="m" border="neutral-alpha-weak" src={card.imageSrc ?? ""} alt={card.imageAlt ?? ""} />}
            <Column gap="16">
              {card.title && (
                <Text variant="heading-strong-s" onBackground="neutral-strong">{card.title}</Text>
              )}
              <Column gap="4">
                <Text variant="body-strong-s" onBackground="neutral-strong">Insight</Text>
                <Text variant="body-default-m" onBackground="neutral-medium">{card.insight}</Text>
              </Column>
              {card.decision && (
                <Text variant="body-default-m" onBackground="neutral-medium">{card.decision}</Text>
              )}
              {card.why && (
                <Column gap="4">
                  <Text variant="body-strong-s" onBackground="neutral-strong">Why it mattered</Text>
                  <Text variant="body-default-m" onBackground="neutral-medium">{card.why}</Text>
                </Column>
              )}
              {card.result && (
                <Column gap="4">
                  <Text variant="body-strong-s" onBackground="neutral-strong">Result</Text>
                  <Text variant="body-default-m" onBackground="neutral-medium">{card.result}</Text>
                </Column>
              )}
              {card.businessImpact && (
                <Column gap="4">
                  <Text variant="body-strong-s" onBackground="neutral-strong">Business impact</Text>
                  <Text variant="body-default-m" onBackground="neutral-medium">{card.businessImpact}</Text>
                </Column>
              )}
            </Column>
          </Column>
        ))}
      </Column>
    );
  }

  return (
    <div className={styles.sectionWrapper}>
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
                    {card.imageSrc && (
                      <div className={styles.imageFrame}>
                        <Media aspectRatio="16 / 9" radius="m" border="neutral-alpha-weak" src={card.imageSrc ?? ""} alt={card.imageAlt ?? ""} sizes="(max-width: 768px) 100vw, 320px" />
                      </div>
                    )}
                    <Column className={styles.textSide} gap="20">
                      {card.title && (
                        <Text variant="heading-strong-s" onBackground="neutral-strong">{card.title}</Text>
                      )}
                      <Column gap="4">
                        <Text variant="body-strong-s" onBackground="neutral-strong">Insight</Text>
                        <Text variant="body-default-m" onBackground="neutral-medium">{card.insight}</Text>
                      </Column>
                      {card.decision && (
                        <Text variant="body-default-m" onBackground="neutral-medium">{card.decision}</Text>
                      )}
                      {card.why && (
                        <Column gap="4">
                          <Text variant="body-strong-s" onBackground="neutral-strong">Why it mattered</Text>
                          <Text variant="body-default-m" onBackground="neutral-medium">{card.why}</Text>
                        </Column>
                      )}
                      {card.result && (
                        <Column gap="4">
                          <Text variant="body-strong-s" onBackground="neutral-strong">Result</Text>
                          <Text variant="body-default-m" onBackground="neutral-medium">{card.result}</Text>
                        </Column>
                      )}
                      {card.businessImpact && (
                        <Column gap="4">
                          <Text variant="body-strong-s" onBackground="neutral-strong">Business impact</Text>
                          <Text variant="body-default-m" onBackground="neutral-medium">{card.businessImpact}</Text>
                        </Column>
                      )}
                    </Column>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
