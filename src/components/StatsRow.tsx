"use client";

import { useEffect, useRef, useState } from "react";
import { Text, Heading } from "@once-ui-system/core";

interface StatConfig {
  value: number;
  suffix: string;
  label: string;
}

const STATS: StatConfig[] = [
  { value: 4,   suffix: "+", label: "Years experience" },
  { value: 20,  suffix: "+", label: "Projects completed" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

function useCountUp(
  target: number,
  duration: number,
  active: boolean,
  instant: boolean,
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (instant) { setCount(target); return; }
    if (!active) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - (1 - p) ** 3) * target));
      if (p < 1) rafId = requestAnimationFrame(animate);
      else setCount(target);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [active, instant, target, duration]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  active,
  instant,
}: StatConfig & { active: boolean; instant: boolean }) {
  const count = useCountUp(value, 1500, active, instant);

  return (
    <li className="stat-item">
      <Heading variant="display-strong-xs" onBackground="brand-strong">
        {/* aria-label exposes final value to screen readers while count animates */}
        <span aria-label={`${value}${suffix}`}>
          {count}{suffix}
        </span>
      </Heading>
      <Text variant="label-default-s" onBackground="neutral-weak">
        {label}
      </Text>
    </li>
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
    <div ref={ref} className="stats-wrapper">
      {/* Fading top rule — left solid → right transparent */}
      <div className="stats-top-line" aria-hidden="true" />

      <ul className="stats-row">
        {STATS.flatMap((stat, index) => [
          index > 0 && (
            <div
              key={`vdiv-${stat.label}`}
              className="stats-v-divider"
              aria-hidden="true"
            />
          ),
          <StatItem
            key={stat.label}
            {...stat}
            active={active}
            instant={instant}
          />,
        ]).filter(Boolean)}
      </ul>
    </div>
  );
}
