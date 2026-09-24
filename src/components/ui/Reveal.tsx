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

/** Layout wrapper retained for existing pages. Reading never waits for scrolling. */
export function Reveal({ children, className = '' }: RevealProps) {
  return <div className={className}>{children}</div>;
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  step?: number;
}

/** Shared list wrapper; items remain visible during loading and keyboard navigation. */
export function Stagger({ children, className = '' }: StaggerProps) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
