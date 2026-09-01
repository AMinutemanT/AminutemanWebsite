import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  /** Seconds of delay before the reveal starts. */
  delay?: number;
  direction?: Direction;
  className?: string;
  /** How much of the element must be visible before it animates in. */
  amount?: number;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Replaces the hand-rolled IntersectionObserver blocks that
 * were duplicated across every page.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  amount = 0.15,
}: RevealProps) {
  const reduced = useReducedMotion();
  const offset = offsets[direction];

  // With reduced motion requested, content is simply present, never faded in from
  // an inline opacity a stylesheet cannot override.
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  step?: number;
}

/** Wraps a list so children animate in sequence. Children must be <StaggerItem>. */
export function Stagger({ children, className = '', step = 0.08 }: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
