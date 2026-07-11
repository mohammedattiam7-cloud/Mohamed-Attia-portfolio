"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Row, Text, Heading } from "@once-ui-system/core";

interface StatConfig {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { value: 4, suffix: "+", label: "Years experience" },
  { value: 20, suffix: "+", label: "Projects completed" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function useCountUp(target: number, duration: number, active: boolean, instant: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (instant) {
      setCount(target);
      return;
    }
    if (!active) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [active, instant, target, duration]);

  return count;
}

function StatItem({ value, suffix, label, active, instant }: StatConfig & { active: boolean; instant: boolean }) {
  const count = useCountUp(value, 1500, active, instant);

  return (
    <Column horizontal="center" align="center" gap="4">
      <Heading variant="display-strong-xs" onBackground="brand-strong">
        {count}
        {suffix}
      </Heading>
      <Text variant="label-default-s" onBackground="neutral-weak" align="center">
        {label}
      </Text>
    </Column>
  );
}

export function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <Row fillWidth gap="xl" horizontal="center" style={{ flexWrap: "wrap" }}>
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} active={active} instant={instant} />
        ))}
      </Row>
    </div>
  );
}
