import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface CountUpNumberProps {
  target: number;
  startFrom?: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export function CountUpNumber({
  target,
  startFrom = 32,
  suffix = '',
  durationMs = 800,
  className = '',
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const safeStart = Math.min(startFrom, target);
  const [value, setValue] = useState(prefersReducedMotion ? target : safeStart);

  useEffect(() => {
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }
    if (!isInView) return;

    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(safeStart + eased * (target - safeStart)));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, safeStart, durationMs, prefersReducedMotion]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {value}
      {suffix}
    </span>
  );
}
