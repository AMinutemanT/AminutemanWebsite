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
    note: 'Design, airframe and systems build, and the secure engineering facility with air-gapped development workstations.',
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
    note: 'Secure engineering facility, and the point of contact for the services and the ministry.',
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

/** The engineering floor, photographed on site. */
export const FACILITY: FacilityShot[] = [
  {
    src: '/images/facility/floor-hero.jpg',
    label: 'ENGINEERING FLOOR',
    caption: 'Rotary-wing airframes on the bench, under the programme banner',
    ratio: '3/2',
  },
  {
    src: '/images/facility/rotary-bench.jpg',
    label: 'ROTARY BENCH',
    caption: 'Multirotor development airframes in build',
    ratio: '3/2',
  },
  {
    src: '/images/facility/fixed-wing.jpg',
    label: 'FIXED WING',
    caption: 'Fixed-wing test article alongside the rotary fleet',
    ratio: '3/2',
  },
  {
    src: '/images/facility/integration.jpg',
    label: 'INTEGRATION',
    caption: 'Payload and airframe integration at the desk',
    ratio: '3/2',
  },
  {
    src: '/images/facility/workfloor.jpg',
    label: 'WORK FLOOR',
    caption: 'Engineering positions across the floor',
    ratio: '3/2',
  },
  {
    src: '/images/facility/entrance.jpg',
    label: 'FACILITY',
    caption: 'Meeting rooms and the secure development area',
    ratio: '3/2',
  },
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
  basis: string;
  note: string;
}

/** Indian defence ecosystem engagements. */
export const DOMESTIC_PARTNERS: Partner[] = [
  {
    name: 'Adani Defence & Aerospace',
    region: 'India',
    basis: 'Active engagement',
    note: 'AI-centric systems collaboration across manufacturing and integration.',
  },
  {
    name: 'Alpha Design Technologies',
    region: 'India',
    basis: 'Active engagement',
    note: 'AI-centric systems collaboration on integration and production.',
  },
  {
    name: 'Bharat Electronics',
    region: 'India',
    basis: 'Active engagement',
    note: 'AI-centric systems collaboration with the national electronics prime.',
  },
  {
    name: 'Indian Army',
    region: 'India',
    basis: 'End-user validation',
    note: 'Field validation of counter-UAS and loitering munition capability.',
  },
  {
    name: 'JSW Group',
    region: 'India',
    basis: 'Memorandum of understanding',
    note: 'Manufacturing capacity for airframe and structural production.',
  },
  {
    name: 'Elbatech Group',
    region: 'India',
    basis: 'Memorandum of understanding',
    note: 'Radio frequency engineering and datalink hardware.',
  },
  {
    name: 'Pax Intelligence',
    region: 'India',
    basis: 'Memorandum of understanding',
    note: 'Cybersecurity and secure systems assurance.',
  },
];

/** International agreements and collaborations. */
export const INTERNATIONAL_PARTNERS: Partner[] = [
  {
    name: 'Nicomatic',
    region: 'France',
    basis: 'Agreement',
    note: 'High-reliability interconnect for airborne and space-qualified assemblies.',
  },
];

export interface Milestone {
  year: string;
  title: string;
  body: string;
}

export const RECORD: Milestone[] = [
  {
    year: '2023',
    title: 'Founded in Pune',
    body: 'Established to build autonomous defence hardware together with the autonomy stack that runs it, instead of integrating somebody else’s.',
  },
  {
    year: '2024',
    title: 'First autonomous combat system',
    body: 'First AI-driven combat system taken from design to demonstration, carried from airframe and avionics through to a flown trial.',
  },
  {
    year: '2025',
    title: 'Ankosha-A and the industrial base',
    body: 'Ankosha-A published at 1,000 km range and 8 hours endurance on a 20 kg warhead. Manufacturing, RF and cybersecurity partners brought under memoranda with JSW Group, Elbatech Group and Pax Intelligence.',
  },
  {
    year: '2026',
    title: 'Four capitals, and a sovereign model programme',
    body: 'Sovereign multi-modal foundation model programme under way for a service customer. International agreement concluded with Nicomatic for high-reliability interconnect. Operations across Pune, Delhi, Bengaluru and Madhya Pradesh.',
  },
];

export interface Achievement {
  label: string;
  value: string;
  note: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    label: 'Surya Dronathon 2025',
    value: 'Indian Army',
    note: 'Flown and evaluated at Sumdo at 10,700 feet under an Indian Army initiative, August 2025.',
  },
  {
    label: 'Engineering bench',
    value: '22 engineers',
    note: 'Across pretraining, multi-modal systems, security, MLOps and physics.',
  },
  {
    label: 'Turbo Quant Engine',
    value: 'In production',
    note: 'Proprietary quantisation and distillation tooling, already shipping inside our own stack.',
  },
  {
    label: 'Software readiness',
    value: 'TRL 5 / 4 / 3',
    note: 'Talon at TRL 5, Aorizon at TRL 4, Sentinel at TRL 3, all shipping in phases.',
  },
  {
    label: 'Edge hardware lab',
    value: 'Jetson · ARM · x86',
    note: 'Industrial edge compute kits supporting the Ankosha A and B programmes.',
  },
  {
    label: 'Sovereign compute',
    value: 'National allocation',
    note: 'Dedicated accelerator capacity for the foundation model programme, held on Indian infrastructure.',
  },
];
