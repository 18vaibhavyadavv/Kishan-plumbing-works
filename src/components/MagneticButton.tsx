import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticAnchorProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  sheen?: boolean;
  autoSheen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function MagneticAnchor({
  href,
  children,
  className = '',
  target,
  rel,
  ariaLabel,
  sheen = true,
  autoSheen = false,
  onClick,
}: MagneticAnchorProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const relY = (e.clientY - rect.top - rect.height / 2) * 0.18;
    setOffset({ x: relX, y: relY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={prefersReducedMotion ? undefined : { x: offset.x, y: offset.y }}
      whileHover={prefersReducedMotion ? undefined : { y: -1.5 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96, y: 0 }}
      transition={{ type: 'spring', stiffness: 450, damping: 26, mass: 0.5 }}
      className={`group btn-sheen-trigger relative overflow-hidden ${className}`}
    >
      {sheen && !prefersReducedMotion && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent ${
            autoSheen ? 'btn-sheen-auto' : 'btn-sheen-layer'
          }`}
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
        {children}
      </span>
    </motion.a>
  );
}

interface MagneticButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  sheen?: boolean;
  autoSheen?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function MagneticButton({
  type = 'button',
  children,
  className = '',
  disabled = false,
  ariaLabel,
  sheen = true,
  autoSheen = false,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const relY = (e.clientY - rect.top - rect.height / 2) * 0.18;
    setOffset({ x: relX, y: relY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={prefersReducedMotion ? undefined : { x: offset.x, y: offset.y }}
      whileHover={prefersReducedMotion || disabled ? undefined : { y: -1.5 }}
      whileTap={prefersReducedMotion || disabled ? undefined : { scale: 0.96, y: 0 }}
      transition={{ type: 'spring', stiffness: 450, damping: 26, mass: 0.5 }}
      className={`group btn-sheen-trigger relative overflow-hidden ${className}`}
    >
      {sheen && !disabled && !prefersReducedMotion && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent ${
            autoSheen ? 'btn-sheen-auto' : 'btn-sheen-layer'
          }`}
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5">
        {children}
      </span>
    </motion.button>
  );
}
