import { PROGRAMMES, PROGRAMME_BY_SLUG, programmePath } from './programmes';

export interface NavLink {
  label: string;
  to: string;
  /** Short descriptor shown in the mega-menu. */
  note?: string;
  designation?: string;
}

/**
 * A titled column inside a group's mega-menu. Ten programmes in one flat grid
 * reads as a list to be scanned; split under headings, it reads as a structure
 * to be navigated.
 */
export interface NavSection {
  label: string;
  links: NavLink[];
}

export interface NavGroup {
  label: string;
  /** Landing page for the group, if it has one. */
  to?: string;
  blurb: string;
  /**
   * Every link in the group, flat. The footer sitemap and the mobile drawer
   * both render from this, so it stays the complete list regardless of how
   * `sections` divides it.
   */
  links: NavLink[];
  /** Grouped view for the desktop mega-menu. Falls back to `links` if absent. */
  sections?: NavSection[];
}

function toLink(slug: string): NavLink {
  const programme = PROGRAMME_BY_SLUG[slug];
  return {
    label: programme.name,
    to: programmePath(programme.slug),
    note: programme.tagline,
    designation: programme.designation,
  };
}

function linksFor(category: 'systems' | 'ai'): NavLink[] {
  return PROGRAMMES.filter((p) => p.category === category).map((p) => toLink(p.slug));
}

/** Named slug groups, so a menu column is a content decision rather than a layout one. */
function section(label: string, slugs: string[]): NavSection {
  return { label, links: slugs.map(toLink) };
}

/**
 * Four groups, and every entry opens a page that actually exists. The two
 * capability groups are AI and Systems: the intelligence layer, and the
 * hardware it flies on.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Valley',
    to: '/valley',
    blurb: 'The integration platform. Every sensor, every effector, one grid.',
    links: [
      {
        label: 'The Unified Grid',
        to: '/valley',
        note: 'How the platform holds a single picture',
        designation: 'VALLEY',
      },
      {
        label: 'Command & Control',
        to: '/valley/command-control',
        note: 'Decision at the speed of the fight',
        designation: 'C2',
      },
      {
        label: 'Mission Autonomy',
        to: '/valley/mission-autonomy',
        note: 'Autonomy that holds through disconnection',
        designation: 'AUTONOMY',
      },
      {
        label: 'Partner Program',
        to: '/valley/partner-program',
        note: 'Bring your platform onto the grid',
        designation: 'PARTNERS',
      },
    ],
  },
  {
    label: 'AI',
    to: '/ai',
    blurb: 'Aorizon, Talon and Sentinel, and the intelligence underneath them.',
    links: linksFor('ai'),
    sections: [
      section('Deployable products', ['aorizon', 'talon', 'sentinel']),
      section('Foundations', ['digital-twin', 'quantum']),
    ],
  },
  {
    label: 'Systems',
    to: '/systems',
    blurb: 'Hardware programmes across air, air defence and space.',
    links: linksFor('systems'),
    sections: [
      section('Air & strike', ['ankosha', 'hypersonics']),
      section('Air defence', ['counter-uas', 'legacy-systems']),
      section('Space', ['orbital-systems']),
    ],
  },
  {
    label: 'Company',
    to: '/about',
    blurb: 'Who we are and how to reach us.',
    links: [
      { label: 'About', to: '/about', note: 'Mandate, posture and leadership' },
      { label: 'Careers', to: '/careers', note: 'Open positions' },
      { label: 'Contact', to: '/contact', note: 'Programme and partnership enquiries' },
    ],
  },
];
