import { PROGRAMMES, programmePath } from './programmes';

export interface NavLink {
  label: string;
  to: string;
  /** Short descriptor shown in the mega-menu. */
  note?: string;
  designation?: string;
}

export interface NavGroup {
  label: string;
  /** Landing page for the group, if it has one. */
  to?: string;
  blurb: string;
  links: NavLink[];
}

function linksFor(category: 'systems' | 'ai'): NavLink[] {
  return PROGRAMMES.filter((p) => p.category === category).map((p) => ({
    label: p.name,
    to: programmePath(p.slug),
    note: p.tagline,
    designation: p.designation,
  }));
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
  },
  {
    label: 'Systems',
    to: '/systems',
    blurb: 'Hardware programmes across air, air defence and space.',
    links: linksFor('systems'),
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
