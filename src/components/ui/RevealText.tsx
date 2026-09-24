import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/* ---------------------------------------------------------------------------
 * REVEAL TEXT
 *
 * Display type rising into place a word at a time from behind its own baseline.
 * Each word sits in an overflow-hidden box and translates up from 105%, so the
 * line assembles rather than fading in — the difference between type that
 * appears and type that arrives.
 *
 * Only strings can be split. A ReactNode title (one carrying a <br/>, say) is
 * rendered whole, and reduced-motion viewers get the text with no animation at
 * all rather than a staggered version of the same thing.
 * ------------------------------------------------------------------------- */

export function RevealText({
  children,
  className = '',
  delay = 0,
  /** Seconds between each word. */
  step = 0.055,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced || typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  const words = children.split(' ');

  return (
    <>
    <span className="sr-only">{children}</span>
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: step, delayChildren: delay } } }}
      aria-hidden="true"
    >
      {words.map((word, i) => (
        // The box clips the word to its own line box; the inner span is what
        // actually moves. A trailing space inside the box keeps the natural
        // word spacing without a margin that would break justification.
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '105%' },
              visible: { y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
    </>
  );
}

export default RevealText;
