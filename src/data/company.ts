/* ---------------------------------------------------------------------------
 * Company facts: tagline, sites, partners, engagements and record.
 *
 * Everything here is drawn from company documentation or supplied directly by
 * the company. Nothing is inferred, and nothing under a customer confidentiality
 * obligation appears here.
 *
 * Where imagery does not exist yet, `image` names the path a photograph should
 * be dropped at. The UI renders a labelled placeholder until it appears.
 * ------------------------------------------------------------------------- */

export const TAGLINE = 'Shaping the Deterrence';

export interface Office {
  city: string;
  state: string;
  role: string;
  note: string;
  lines?: string[];
  image?: string;
  primary?: boolean;
}

export const OFFICES: Office[] = [
  {
    city: 'Pune',
    state: 'Maharashtra',
    role: 'Headquarters and works',
    note: 'Design and systems build.',
    lines: ['Dhanori, Pune 411015'],
    primary: true,
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    role: 'Research and development',
    note: 'Aerodynamics, structures and edge-autonomy research, co-located with the institute laboratories.',
    lines: ['Akurdi, Nigdi, Pune 411044'],
  },
  {
    city: 'New Delhi',
    state: 'Delhi',
    role: 'Programme office',
    note: 'Point of contact for the services and the ministry.',
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    role: 'Avionics and autonomy',
    note: 'Avionics, mission software and the Valley engineering bench, alongside the national aerospace supply base.',
    image: '/images/facility/floor-hero.jpg',
  },
  {
    city: 'Madhya Pradesh',
    state: 'Madhya Pradesh',
    role: 'Test and integration',
    note: 'Range work, integration and trials for the loitering munition and counter-UAS programmes.',
  },
];

export interface FacilityShot {
  src: string;
  label: string;
  caption: string;
  ratio: '16/9' | '4/5' | '3/2';
}

/**
 * General office photography, Bengaluru only. Not labelled per-shot and not
 * captioned as depicting anything specific (a prior version claimed things
 * like "airframe assembly" and "secure development area" that these photos
 * do not actually show) — plain, unlabelled photos, kept to a small number.
 */
export const FACILITY: FacilityShot[] = [
  { src: '/images/facility/floor-hero.jpg', label: '', caption: '', ratio: '3/2' },
  { src: '/images/facility/workfloor.jpg', label: '', caption: '', ratio: '3/2' },
];

export interface Shot {
  /** Still image, and the poster frame when `video` is set. */
  src: string;
  /** Onboard footage. Where present it plays in place of the still. */
  video?: string;
  label: string;
  caption: string;
  ratio: '16/9' | '4/5' | '3/2';
}

/** Trials, evaluation and service engagement. */
export const FIELD: Shot[] = [
  {
    src: '/images/field/army-trial.jpg',
    label: 'FIELD EVALUATION',
    caption: 'Walking an Army officer through the airframe at the trial site',
    ratio: '3/2',
  },
  {
    src: '/images/field/dronathon-stage.jpg',
    label: 'SURYA DRONATHON 2025',
    caption: 'Recognised at the Indian Army drone trials, Sumdo',
    ratio: '3/2',
  },
  {
    src: '/images/field/high-altitude.jpg',
    label: 'HIGH ALTITUDE',
    caption: 'Flying at 10,700 feet, where thin air changes every assumption',
    ratio: '3/2',
  },
  {
    src: '/images/field/dronathon-award.jpg',
    label: 'FLY WHERE ONLY EAGLES DARE',
    caption: 'Surya Dronathon 2025, an Indian Army initiative',
    ratio: '3/2',
  },
  {
    src: '/videos/fibre-optic-trial.jpg',
    video: '/videos/fibre-optic-trial.mp4',
    label: 'Fibre-optic control trial',
    caption: 'Onboard footage from a tethered fibre-optic control run. The command link is physical, so there is nothing on it to jam.',
    ratio: '3/2',
  },
  {
    src: '/videos/payload-release-trial.jpg',
    video: '/videos/payload-release-trial.mp4',
    label: 'Payload release trial',
    caption: 'A grenade release over the range, flown and filmed from the airframe. Release, separation and the run off target.',
    ratio: '3/2',
  },
];

/** Where we show the work and who we stand alongside. */
export const EXHIBITIONS: Shot[] = [
  {
    src: '/images/exhibitions/booth-stand.jpg',
    label: 'DEFENCE EXHIBITION',
    caption: 'Airframes and live detection on the stand',
    ratio: '3/2',
  },
  {
    src: '/images/exhibitions/booth-team.jpg',
    label: 'BRIEFING',
    caption: 'Walking visitors through the flagship programmes',
    ratio: '3/2',
  },
  {
    src: '/images/exhibitions/aesi-pune.jpg',
    label: 'AERONAUTICAL SOCIETY OF INDIA',
    caption: 'At the Aeronautical Society of India, Pune',
    ratio: '3/2',
  },
];

export interface PressItem {
  outlet: string;
  href: string;
}

export interface PressStory {
  headline: string;
  date: string;
  outlets: PressItem[];
}

/**
 * Press coverage. Every link here was checked and resolves to the article.
 *
 * These outlets carried the same piece on the same day, so it is presented as
 * one story with the outlets that ran it, rather than as six separate items.
 * Padding a syndicated release out into a wall of entries is the sort of thing
 * a reader checks, and it costs more credibility than it buys.
 */
export const PRESS: PressStory[] = [
  {
    headline: 'Aminuteman Technologies: A Young Startup Taking Bold Strides in Defense',
    date: '16 September 2025',
    outlets: [
      { outlet: 'Hindustan Metro', href: 'https://www.hindustanmetro.com/aminuteman-technologies-a-young-startup-taking-bold-strides-in-defense/' },
      { outlet: 'Indian Sentinel', href: 'https://www.indiansentinel.in/aminuteman-technologies-a-young-startup-taking-bold-strides-in-defense/' },
      { outlet: 'Republic News India', href: 'https://republicnewsindia.com/aminuteman-technologies-a-young-startup-taking-bold-strides-in-defense/' },
      { outlet: 'NewsMint24', href: 'https://newsmint24.com/aminuteman-technologies-a-young-startup-taking-bold-strides-in-defense/' },
      { outlet: 'Entrepreneur Hunt', href: 'https://entrepreneurhunt.com/aminuteman-technologies-a-young-startup-taking-bold-strides-in-defense' },
    ],
  },
];

export interface Partner {
  name: string;
  region: string;
}

/**
 * Names for the public partner list. Engagement details are not published.
 */
export const DOMESTIC_PARTNERS: Partner[] = [
  { name: 'Adani Defence & Aerospace', region: 'India' },
  { name: 'Alpha Design Technologies', region: 'India' },
  { name: 'Bharat Electronics', region: 'India' },
  { name: 'Indian Army', region: 'India' },
  { name: 'JSW Group', region: 'India' },
  { name: 'Elbatech Group', region: 'India' },
  { name: 'Pax Intelligence', region: 'India' },
];

/** International names for the public partner list. */
export const INTERNATIONAL_PARTNERS: Partner[] = [
  { name: 'Nicomatic', region: 'France' },
];

/**
 * Deliberately removed: a detailed year-by-year record (specific programme
 * milestones, published figures, named agreements) is more disclosure than a
 * defence company needs to make public. Founded 2023 is the one fact that
 * still appears, in the About page hero line.
 */

/**
 * Deliberately removed: this previously listed internal team headcount and
 * composition, proprietary tooling status, and internal compute/hardware
 * inventory as a public "stat tile" band. None of that needs to be public for
 * a defence company, and Surya Dronathon 2025 (the one genuinely external,
 * press-covered item) is already covered, with real photography, in `FIELD`.
 */
