import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/* ---------------------------------------------------------------------------
 * SPOTLIGHT CARD
 *
 * The shell every card grid on the site sits in. Its hover states — the warm
 * spotlight tracking the cursor and the hairline lifting — all live in the `.card` rule in index.css as pseudo-elements,
 * so a card needs no wrapper elements and any existing markup can opt in by
 * taking the class. This component is only the convenience: pick the right
 * element for the destination and apply it.
 * ------------------------------------------------------------------------- */

export interface SpotlightCardProps {
  children: ReactNode;
  /** Internal route. Renders a <Link>; otherwise the card is a plain <div>. */
  to?: string;
  /** External href. Renders an <a>. */
  href?: string;
  className?: string;
  'aria-label'?: string;
}

export function SpotlightCard({
  children,
  to,
  href,
  className = '',
  ...rest
}: SpotlightCardProps) {
  const props = {
    className: `card group ${className}`,
    ...rest,
  };

  if (to) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return <div {...props}>{children}</div>;
}

export default SpotlightCard;
