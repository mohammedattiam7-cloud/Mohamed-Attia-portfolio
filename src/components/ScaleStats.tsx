"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Row, Text } from "@once-ui-system/core";
import styles from "./ScaleStats.module.scss";

const SUPPORTING_STATS = [
  { value: "7", label: "Theme dimensions", sub: "multiply into 576" },
  { value: "18", label: "Variable collections", sub: "organize the architecture" },
  { value: "~1.06k", label: "Design variables", sub: "held across collections" },
];

const TARGET = 576;
const DURATION = 1000;

export function ScaleStats() {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setCount(TARGET);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * TARGET));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Column
      ref={containerRef}
      fillWidth
      border="neutral-alpha-weak"
      radius="l"
      padding="l"
      marginBottom="8"
      className="static-card"
    >
      <Row fillWidth gap="l" className={styles.layout}>
        <Column gap="12" className={styles.left}>
          <Text variant="label-default-s" onBackground="neutral-weak">
            RUNTIME COMBINATIONS
          </Text>
          <Text variant="display-strong-l" onBackground="neutral-strong">
            {count}
          </Text>
          <Text variant="body-default-xl" onBackground="neutral-medium">
            Every theme state the system can render — generated, never hand-built.
          </Text>
        </Column>

        <Column gap="8" className={styles.right}>
          {SUPPORTING_STATS.map(({ value, label, sub }) => (
            <Row
              key={label}
              fillWidth
              paddingX="m"
              paddingY="m"
              radius="m"
              border="neutral-alpha-weak"
              gap="16"
              vertical="center"
            >
              <Text
                variant="display-strong-xs"
                onBackground="neutral-strong"
                className={styles.statValue}
              >
                {value}
              </Text>
              <Column gap="2">
                <Text variant="label-default-s" onBackground="neutral-strong">
                  {label}
                </Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {sub}
                </Text>
              </Column>
            </Row>
          ))}
        </Column>
      </Row>
    </Column>
  );
}
