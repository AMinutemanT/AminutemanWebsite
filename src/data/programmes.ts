import type { Spec } from '../components/ui/SpecTable';

/* ---------------------------------------------------------------------------
 * Single source of truth for every programme on the site.
 *
 * Detail pages are generated from these records, so copy, imagery slots and
 * navigation stay in step. Designations, figures and imagery paths are all
 * editable here without touching a component.
 *
 * Convention on figures: where a parameter is not releasable, write
 * "CLASSIFIED" or "ON REQUEST" rather than inventing a number. SpecTable
 * renders those states deliberately.
 * ------------------------------------------------------------------------- */

export type Category = 'systems' | 'ai' | 'platform';

export interface Variant {
  designation: string;
  name: string;
  role: string;
  note: string;
}

export interface GalleryItem {
  label: string;
  caption: string;
  path: string;
  ratio?: '16/9' | '4/3' | '3/2' | '1/1' | '4/5' | '21/9';
  src?: string;
  video?: string;
  /** `contain` for cut-out CAD renders that must not be cropped. */
  fit?: 'cover' | 'contain';
}

export interface ModelSpec {
  /** Path under /models to a Draco-compressed GLB derived from the STEP assembly. */
  src: string;
  label: string;
  caption?: string;
  readouts?: { label: string; value: string }[];
}

export interface Capability {
  title: string;
  body: string;
}

export interface Programme {
  slug: string;
  category: Category;
  /** Short all-caps programme code used in HUD chrome. */
  designation: string;
  name: string;
  tagline: string;
  domain: string[];
  status: string;
  /** One-paragraph summary used on index cards and meta descriptions. */
  summary: string;
  hero: { label: string; path: string; src?: string; video?: string; fit?: 'cover' | 'contain' };
  overview: { heading: string; body: string[] };
  capabilities: Capability[];
  specs: Spec[];
  variants?: Variant[];
  gallery?: GalleryItem[];
  /** Live CAD geometry, tessellated from the engineering STEP assembly. */
  model?: ModelSpec;
  /** How the programme plugs into Valley. Rendered as the integration band. */
  integration?: string;
  related: string[];
}

export const CATEGORY_LABEL: Record<Category, string> = {
  systems: 'Systems',
  ai: 'AI',
  platform: 'Platform',
};

/* ========================================================================= */
/* SYSTEMS                                                                   */
/* ========================================================================= */

const ankosha: Programme = {
  slug: 'ankosha',
  category: 'systems',
  designation: 'ANKOSHA',
  name: 'Ankosha Family',
  tagline: 'Cruciform loitering munitions for contested airspace',
  domain: ['Air', 'Strike', 'Attritable'],
  status: 'In trials',
  summary:
    'A common-architecture family of loitering munitions spanning man-portable to extended-range deep strike, flown as a formation rather than as individual rounds.',
  hero: {
    label: 'ANKOSHA / AIRFRAME WITH POWERPLANT',
    path: '/images/ankosha/airframe-powerplant.webp',
    src: '/images/ankosha/airframe-powerplant.webp',
    fit: 'contain',
  },
  overview: {
    heading: 'One architecture. Four airframes. A single formation.',
    body: [
      'Ankosha is built the way a family should be built: one autonomy core, one datalink, one ground segment, one logistics tail, wrapped in five airframes sized for five different fights. A section commander carrying an Ankosha-A and a strike cell tasking an Ankosha-C are operating the same system with the same interface and the same rules of engagement.',
      'The airframes fly as a cruciform formation. Sensing, decision and effect are distributed across the cross: outer elements screen and localise, the arms carry the mixed payload load-out, and the lead element holds the engagement picture. Losing any single element degrades the formation gracefully: the remaining aircraft re-elect a lead and re-plan the run in flight, without a link back to the operator.',
      'Every round is dual-role. Until the moment of commitment an Ankosha is an ISR asset feeding the grid; commitment is a human decision, taken against a target the operator can see, on a timeline the operator controls.',
    ],
  },
  capabilities: [
    {
      title: 'Formation autonomy',
      body: 'Elements share a single track picture over a mesh datalink. Task allocation, re-tasking and lead succession are resolved on the airframes, at the edge, without operator arbitration.',
    },
    {
      title: 'Common autonomy core',
      body: 'The same Valley-derived flight and mission stack runs across the family. A behaviour qualified on one airframe is available on all of them after re-validation, not re-development.',
    },
    {
      title: 'Denied-environment navigation',
      body: 'Terrain-referenced and visual-inertial navigation carry the aircraft through GNSS denial and active jamming. Position is held against the map, not against a satellite.',
    },
    {
      title: 'Man-in-the-loop commitment',
      body: 'Target nomination is machine-assisted; commitment is human. Every engagement is recorded end to end for post-mission review and legal audit.',
    },
    {
      title: 'Mixed payload bays',
      body: 'A shared mechanical and electrical interface accepts fragmentation, shaped-charge, thermobaric and non-kinetic payloads without airframe change.',
    },
    {
      title: 'Field-recoverable',
      body: 'Training and ISR sorties recover under parachute for re-use. Only the committed round is expended.',
    },
  ],
  variants: [
    {
      designation: 'ANKOSHA-A',
      name: 'Long-range high-endurance',
      role: 'Deep loitering strike and surveillance',
      note: '2,600 mm delta airframe, rotary engine on heavy fuel, 1,000 km range and 8 hours endurance carrying a 20 kg warhead or an EO/IR surveillance fit. Catapult or solid-motor launch.',
    },
    {
      designation: 'ANKOSHA-B',
      name: 'Vehicle-launched',
      role: 'Company and battalion strike',
      note: 'Canisterised for light vehicle and boat mounts. Shorter dwell than the A, sized so a section can carry and launch it without a prepared site.',
    },
    {
      designation: 'ANKOSHA-C',
      name: 'Extended range',
      role: 'Formation lead and deep ISR-strike',
      note: 'Carries the formation engagement picture. Heavier sensor package, longer endurance, launched from the ground or from another aircraft.',
    },
    {
      designation: 'ANKOSHA-S',
      name: 'Swarm element',
      role: 'Saturation, decoy and screening',
      note: 'Low-cost attritable element flown in quantity. Screens the formation, saturates air defences and localises emitters.',
    },
  ],
  specs: [
    { label: 'Overall length', value: '2,600 mm', note: 'Delta planform, folding for canister carriage' },
    { label: 'Max take-off mass', value: 'Under 135 kg', note: 'Including battery' },
    { label: 'Payload', value: '18 to 20 kg', note: 'Warhead or high-fidelity sensor package' },
    { label: 'Warhead', value: '20 kg', note: 'RDX or plastic explosive fill' },
    { label: 'Range', value: 'Up to 1,000 km', note: 'Mission profile dependent' },
    { label: 'Endurance', value: '8 hours', note: '7.5 hours operational loiter' },
    { label: 'Max speed', value: '165 km/h' },
    { label: 'Operating altitude', value: '29,000 ft', note: 'Launch altitude to 15,000 ft AMSL' },
    { label: 'Service ceiling', value: '5,000 m AMSL', note: 'Without payload' },
    { label: 'Powerplant', value: 'Rotary engine', note: 'Heavy fuel, single-fuel logistics' },
    { label: 'Wind resistance', value: '20 m/s' },
    { label: 'Operating temperature', value: 'Minus 35 to 40 C' },
    { label: 'Navigation', value: 'NavIC constellation', note: 'Indigenous positioning, GNSS-independent modes' },
    { label: 'Ground segment', value: '300 km', note: 'GCS control range' },
    { label: 'BVLOS', value: 'Yes' },
    { label: 'Swarm capability', value: 'Yes' },
    { label: 'Onboard compute', value: '100 TOPS', note: 'SLAM and DETR, generative targeting' },
    { label: 'Sensor', value: 'EO / IR, 10x zoom', note: '40 mm equivalent, R-JPEG spot and area measurement' },
    { label: 'Aural signature', value: 'Not detectable', note: 'Loitering at 200 m overhead' },
    { label: 'Launch', value: 'Catapult or solid motor' },
    { label: 'Autonomy', value: 'Powered by Valley' },
    { label: 'Terminal accuracy', value: 'ON REQUEST' },
  ],
  gallery: [
    {
      label: 'ANKOSHA / CLEAN AIRFRAME',
      caption: 'Delta planform, payload bays closed',
      path: '/images/ankosha/airframe-clean.webp',
      src: '/images/ankosha/airframe-clean.webp',
      ratio: '3/2',
      fit: 'contain',
    },
    {
      label: 'ANKOSHA / POWERPLANT INTEGRATION',
      caption: 'Pusher powerplant on the centre spine',
      path: '/images/ankosha/airframe-rear-quarter.webp',
      src: '/images/ankosha/airframe-rear-quarter.webp',
      ratio: '3/2',
      fit: 'contain',
    },
    {
      label: 'ANKOSHA / PLANFORM',
      caption: 'Bay layout across the wing root',
      path: '/images/ankosha/airframe-planform.webp',
      src: '/images/ankosha/airframe-planform.webp',
      ratio: '3/2',
      fit: 'contain',
    },
  ],
  model: {
    src: '/models/ankosha_a.glb',
    label: 'ANKOSHA-A / STEP ASSEMBLY',
    caption: 'Live geometry, tessellated from the Ankosha-A engineering assembly',
    readouts: [
      { label: 'LEN', value: '2,600 mm' },
      { label: 'MTOW', value: '<135 kg' },
      { label: 'RANGE', value: '1,000 km' },
      { label: 'ENDURANCE', value: '8 h' },
    ],
  },
  integration:
    'Every Ankosha element is a Valley node. Tracks it generates are published to the grid the moment they are formed, and any authorised effector on the grid, not only another Ankosha, can be paired against them.',
  related: ['counter-uas', 'hypersonics', 'talon', 'valley'],
};

const counterUas: Programme = {
  slug: 'counter-uas',
  category: 'systems',
  designation: 'RYDER · INDRASTRA',
  name: 'Counter-UAS',
  tagline: 'A layered answer to the cheapest threat on the battlefield',
  domain: ['Air defence', 'C-UAS', 'Layered'],
  status: 'In trials',
  summary:
    'INDRASTRA senses, classifies and holds the low-altitude air picture. RYDER is the hard-kill effector it commands. Together they cover the drone threat from commercial quadcopter to high-speed loitering munition.',
  hero: {
    label: 'RYDER / HARD-KILL INTERCEPTOR',
    path: '/images/counter-uas/ryder-interceptor.jpg',
    src: '/images/counter-uas/ryder-interceptor.jpg',
  },
  overview: {
    heading: 'Cost per engagement is the whole problem.',
    body: [
      'The uncomfortable arithmetic of modern air defence is that a system costing lakhs is routinely spent on a threat costing thousands, and the side with the cheaper magazine wins by arithmetic alone. Any credible counter-UAS answer has to be layered, and every layer has to be priced against what it is shooting at.',
      'INDRASTRA is the sensing and command layer. It fuses radar, radio-frequency, electro-optical and acoustic sensing into a single low-altitude picture, classifies what it sees against a continuously updated signature library, and holds custody of every track from first detection to resolution. It is designed to run on sensors already deployed at a site, not to require replacement of them.',
      'RYDER is the effector layer INDRASTRA commands: soft-kill through RF and navigation denial for the low end, and a hard-kill interceptor for what soft-kill cannot touch: hardened, autonomous or high-speed rounds flying without a link to deny. Every engagement is priced against what it is shooting at, so the magazine holds through a saturation attack rather than being spent on the first one.',
      'Both elements are grid-native. A site does not defend itself in isolation. It defends as one cell of a national picture, handing tracks forward and receiving cueing from sensors it will never see.',
    ],
  },
  capabilities: [
    {
      title: 'INDRASTRA · multi-sensor fusion',
      body: 'Radar, RF, EO/IR and acoustic feeds resolved into a single track per object. Classification runs against a signature library updated from the field, not frozen at delivery.',
    },
    {
      title: 'INDRASTRA · track custody',
      body: 'Continuous custody from detection through classification, threat evaluation, effector pairing and battle damage assessment. Every decision is time-stamped and attributable.',
    },
    {
      title: 'RYDER · soft kill',
      body: 'Directional RF and navigation denial against link-dependent air vehicles, with geofenced emission control so friendly spectrum is protected.',
    },
    {
      title: 'RYDER · hard kill',
      body: 'A guided interceptor for autonomous and hardened targets, priced and sized for the threat rather than for the airframe it defends.',
    },
    {
      title: 'Swarm handling',
      body: 'Simultaneous track and engagement management against saturation attacks, with automated effector allocation across the site.',
    },
    {
      title: 'Mobile and fixed',
      body: 'The same architecture deploys as a fixed-site installation, a vehicle-mounted cell, or a rapidly emplaced kit for a forward position.',
    },
  ],
  variants: [
    {
      designation: 'INDRASTRA',
      name: 'Sense and command layer',
      role: 'Detection, classification, C2',
      note: 'Sensor-agnostic fusion and battle management. Integrates existing site sensors and publishes the resulting picture to the wider grid.',
    },
    {
      designation: 'RYDER',
      name: 'Effector layer',
      role: 'Soft kill and hard kill',
      note: 'RF/navigation denial plus a guided hard-kill interceptor, commanded by INDRASTRA and allocated automatically under operator authority.',
    },
  ],
  specs: [
    { label: 'Sensor types fused', value: 'RF · Radar · EO/IR · Acoustic' },
    { label: 'Target classes', value: 'Class I to III UAS', note: 'Including high-speed loitering munitions' },
    { label: 'Simultaneous tracks', value: 'ON REQUEST' },
    { label: 'Detection range', value: 'CLASSIFIED', note: 'Sensor fit dependent' },
    { label: 'Effector options', value: 'Soft kill / hard kill' },
    { label: 'Emplacement', value: 'Fixed · mobile · man-portable kit' },
    { label: 'Decision loop', value: 'Operator-authorised' },
    { label: 'Grid interface', value: 'Native', note: 'Publishes to and subscribes from Valley' },
  ],
  gallery: [
    {
      label: 'RYDER / INTERCEPTOR',
      caption: 'Tilting rotor arms on a faired body, sized for the climb to intercept',
      path: '/images/counter-uas/ryder-interceptor.jpg',
      src: '/images/counter-uas/ryder-interceptor.jpg',
      ratio: '3/2',
    },
    {
      label: 'INDRASTRA / SENSOR NODE',
      caption: 'Airborne sensor node and ground control at the trial site',
      path: '/images/counter-uas/ryder-field.jpg',
      src: '/images/counter-uas/ryder-field.jpg',
      ratio: '3/2',
    },
    {
      label: 'FIELD TRIAL',
      caption: 'Sensor node, control unit and payload set up on the range',
      path: '/images/counter-uas/ryder-field-vertical.jpg',
      src: '/images/counter-uas/ryder-field-vertical.jpg',
      ratio: '4/5',
    },
  ],
  model: {
    src: '/models/ryder.glb',
    label: 'RYDER / STEP ASSEMBLY',
    caption: 'Live geometry, tessellated from the Ryder interceptor assembly',
    readouts: [
      { label: 'ROLE', value: 'Interceptor' },
      { label: 'GUIDANCE', value: 'EO / RF' },
      { label: 'LAUNCH', value: 'Canister' },
    ],
  },
  integration:
    'INDRASTRA is the air-defence face of Valley. Tracks it holds are visible to every authorised node on the grid, and cueing from orbital, airborne and ground sensors flows back to it without an integration project.',
  related: ['ankosha', 'sentinel', 'talon', 'valley'],
};

const hypersonics: Programme = {
  slug: 'hypersonics',
  category: 'systems',
  designation: 'HYPERSONICS',
  name: 'Hypersonic Systems',
  tagline: 'Glide vehicles and balloon-launched hypersonic weapons',
  domain: ['Strategic', 'Hypersonic', 'High altitude'],
  status: 'In development',
  summary:
    'A hypersonic glide vehicle programme paired with a stratospheric balloon launch approach that removes the booster stage from the cost and signature equation.',
  hero: {
    label: 'HGV / GLIDE BODY',
    path: '/images/hypersonics/glide-iso.webp',
    src: '/images/hypersonics/glide-iso.webp',
    fit: 'contain',
  },
  overview: {
    heading: 'Speed is a defence-penetration argument, not a marketing one.',
    body: [
      'A manoeuvring vehicle at hypersonic speed collapses an adversary\'s decision timeline and defeats the predicted-intercept assumption that most integrated air defence rests on. That is the entire strategic case, and it is why the capability is worth the considerable engineering difficulty of getting there.',
      'Our glide vehicle work concentrates on the three problems that actually gate the capability: thermal protection that survives a full glide phase without a mass penalty that eats the payload, guidance and control authority that remain effective through plasma-attenuated communications, and manufacturability of the leading-edge structures at a rate that makes the weapon a magazine item rather than a demonstration.',
      'The balloon-launched approach addresses the other half of the problem. Lifting a vehicle to the stratosphere under a high-altitude balloon removes the first-stage booster entirely. With it goes the launch signature, most of the launch cost and the fixed-site infrastructure that makes a hypersonic magazine targetable. Release above the dense atmosphere puts the vehicle into its glide regime with a fraction of the energy a ground launch demands.',
      'This is long-horizon work, stated as such. We publish where the programme is, not where it will be.',
    ],
  },
  capabilities: [
    {
      title: 'Manoeuvring glide',
      body: 'Cross-range manoeuvre through the glide phase defeats predicted-intercept fire control and keeps the terminal aimpoint ambiguous until late.',
    },
    {
      title: 'Thermal protection',
      body: 'Leading-edge and acreage TPS development targeted at full-duration glide with a mass budget that leaves useful payload.',
    },
    {
      title: 'Balloon launch',
      body: 'Stratospheric release removes the booster stage, the fixed launch site and the launch signature that make hypersonic magazines vulnerable.',
    },
    {
      title: 'Plasma-tolerant guidance',
      body: 'Navigation and control designed to hold accuracy through communication blackout, without dependence on a continuous external update.',
    },
    {
      title: 'Digital-twin qualification',
      body: 'Flight regimes that cannot be tested affordably are qualified against a validated digital twin, with physical tests spent where they carry the most information.',
    },
    {
      title: 'Producibility',
      body: 'Structures and TPS designed from the outset for a production rate, not for a single demonstrator.',
    },
  ],
  variants: [
    {
      designation: 'HGV',
      name: 'Hypersonic glide vehicle',
      role: 'Manoeuvring terminal delivery',
      note: 'Boost-glide vehicle with cross-range manoeuvre authority through the glide phase.',
    },
    {
      designation: 'BLHV',
      name: 'Balloon-launched hypersonic vehicle',
      role: 'Low-signature stratospheric release',
      note: 'High-altitude balloon lift to release altitude, removing the first-stage booster and its associated infrastructure.',
    },
  ],
  specs: [
    { label: 'Regime', value: 'Hypersonic glide' },
    { label: 'Release altitude', value: 'Stratospheric', note: 'Balloon-lifted configuration' },
    { label: 'Cross-range manoeuvre', value: 'CLASSIFIED' },
    { label: 'Terminal accuracy', value: 'CLASSIFIED' },
    { label: 'Thermal protection', value: 'In qualification' },
    { label: 'Programme phase', value: 'Development' },
    { label: 'Test approach', value: 'Twin-led', note: 'Validated simulation plus targeted flight test' },
    { label: 'Launch infrastructure', value: 'Minimal', note: 'No fixed booster site required' },
  ],
  gallery: [
    {
      label: 'HGV / PROFILE',
      caption: 'Waverider forebody and control surfaces',
      path: '/images/hypersonics/glide-profile.webp',
      src: '/images/hypersonics/glide-profile.webp',
      ratio: '16/9',
      fit: 'contain',
    },
    {
      label: 'HGV / PAYLOAD BAYS',
      caption: 'Plan view, bays open',
      path: '/images/hypersonics/glide-plan-bays.webp',
      src: '/images/hypersonics/glide-plan-bays.webp',
      ratio: '16/9',
      fit: 'contain',
    },
    {
      label: 'HGV / UNDERSIDE',
      caption: 'Compression surface and strake geometry',
      path: '/images/hypersonics/glide-underside.webp',
      src: '/images/hypersonics/glide-underside.webp',
      ratio: '16/9',
      fit: 'contain',
    },
    {
      label: 'HGV / REAR QUARTER',
      caption: 'Fin and body-flap arrangement',
      path: '/images/hypersonics/glide-rear-iso.webp',
      src: '/images/hypersonics/glide-rear-iso.webp',
      ratio: '16/9',
      fit: 'contain',
    },
    {
      label: 'HGV / PLANFORM',
      caption: 'Upper surface, nose to tail',
      path: '/images/hypersonics/glide-plan.webp',
      src: '/images/hypersonics/glide-plan.webp',
      ratio: '16/9',
      fit: 'contain',
    },
    {
      label: 'HGV / QUARTER VIEW',
      caption: 'Leading-edge line through the glide phase',
      path: '/images/hypersonics/glide-quarter.webp',
      src: '/images/hypersonics/glide-quarter.webp',
      ratio: '16/9',
      fit: 'contain',
    },
  ],
  model: {
    src: '/models/hgv.glb',
    label: 'HGV / STEP ASSEMBLY',
    caption: 'Live geometry, tessellated from the glide vehicle engineering assembly',
    readouts: [
      { label: 'LEN', value: '10.1 m' },
      { label: 'SPAN', value: '3.6 m' },
      { label: 'REGIME', value: 'Hypersonic glide' },
      { label: 'RELEASE', value: 'Stratospheric' },
    ],
  },
  integration:
    'Targeting, release authority and post-release custody run over Valley, with the vehicle appearing on the grid as a scheduled effect rather than as a platform to be flown.',
  related: ['orbital-systems', 'digital-twin', 'quantum', 'valley'],
};

const orbitalSystems: Programme = {
  slug: 'orbital-systems',
  category: 'systems',
  designation: 'PRAHARI · KETU',
  name: 'Orbital Systems',
  tagline: 'Bodyguard and co-orbital effects for contested space',
  domain: ['Space', 'Co-orbital', 'Defensive'],
  status: 'In development',
  summary:
    'PRAHARI escorts and defends high-value national space assets. KETU is the co-orbital effector it can call on. Space is treated as a domain that has to be held, not merely used.',
  hero: {
    label: 'PRAHARI / BUS CONFIGURATION',
    path: '/images/orbital/bus-iso.webp',
    src: '/images/orbital/bus-iso.webp',
    fit: 'contain',
  },
  overview: {
    heading: 'An orbit is only an asset for as long as it can be defended.',
    body: [
      'National communications, navigation and imaging now sit on a small number of satellites whose orbits are public, whose approach can be watched and whose loss would be felt on the ground within hours. Every serious space power has been developing the means to interfere with them. Defending them has lagged badly behind.',
      'PRAHARI is a bodyguard satellite: a manoeuvrable escort that keeps station near a high-value asset, maintains local space situational awareness, characterises approaching objects, and interposes itself or manoeuvres the pair out of a developing threat geometry. It buys the one thing a defended satellite has never had: warning and options.',
      'KETU is the co-orbital element. Where a threat cannot be avoided or deterred, it provides a proportionate, attributable response held under national command authority. Both elements are designed for rapid replenishment, because in space the side that can reconstitute its constellation faster wins the second week of a conflict.',
      'This work is defensive in posture and framed accordingly. Rules of engagement, escalation control and attribution are designed into the system rather than added to it.',
    ],
  },
  capabilities: [
    {
      title: 'PRAHARI · escort station-keeping',
      body: 'Manoeuvrable co-orbital escort holding a defensive geometry around a designated high-value asset.',
    },
    {
      title: 'PRAHARI · local space awareness',
      body: 'Onboard optical and RF characterisation of approaching objects, closing the gap that ground-based tracking leaves at short range.',
    },
    {
      title: 'PRAHARI · interposition',
      body: 'Physical screening and coordinated evasive manoeuvre of the protected asset under operator authority.',
    },
    {
      title: 'KETU · co-orbital effect',
      body: 'A proportionate co-orbital response option held under national command authority, with attribution and escalation control designed in.',
    },
    {
      title: 'Rapid replenishment',
      body: 'Designed for small-launch cadence and constellation reconstitution rather than for single exquisite deployment.',
    },
    {
      title: 'Autonomous under blackout',
      body: 'Both elements hold their mission through loss of ground contact, with pre-delegated authority bounded by rules loaded before launch.',
    },
  ],
  variants: [
    {
      designation: 'PRAHARI',
      name: 'Bodyguard satellite',
      role: 'Protection of high-value orbital assets',
      note: 'Manoeuvrable escort providing local space situational awareness, threat characterisation and interposition.',
    },
    {
      designation: 'KETU',
      name: 'Co-orbital effector',
      role: 'Proportionate co-orbital response',
      note: 'Held under national command authority. Attribution, escalation control and engagement rules are part of the design.',
    },
  ],
  specs: [
    { label: 'Orbital regime', value: 'ON REQUEST' },
    { label: 'Manoeuvre budget', value: 'CLASSIFIED' },
    { label: 'Onboard sensing', value: 'Optical + RF' },
    { label: 'Autonomy', value: 'Blackout-tolerant', note: 'Bounded pre-delegated authority' },
    { label: 'Command authority', value: 'National' },
    { label: 'Replenishment', value: 'Small-launch cadence' },
    { label: 'Bus class', value: 'ON REQUEST' },
    { label: 'Grid interface', value: 'Native Valley node' },
  ],
  gallery: [
    {
      label: 'PRAHARI / ARRAYS DEPLOYED',
      caption: 'Hexagonal bus with deployed solar wings',
      path: '/images/orbital/panels-deployed.webp',
      src: '/images/orbital/panels-deployed.webp',
      ratio: '16/9',
      fit: 'contain',
    },
    {
      label: 'PRAHARI / THRUSTER DECK',
      caption: 'Attitude control cluster on the upper deck',
      path: '/images/orbital/thruster-deck.webp',
      src: '/images/orbital/thruster-deck.webp',
      ratio: '4/5',
      fit: 'contain',
    },
    {
      label: 'PRAHARI / ARRAY PLAN',
      caption: 'Array geometry, plan view',
      path: '/images/orbital/panels-plan.webp',
      src: '/images/orbital/panels-plan.webp',
      ratio: '16/9',
      fit: 'contain',
    },
    {
      label: 'PRAHARI / BUS QUARTER',
      caption: 'Payload apertures across the bus faces',
      path: '/images/orbital/bus-quarter.webp',
      src: '/images/orbital/bus-quarter.webp',
      ratio: '4/5',
      fit: 'contain',
    },
  ],
  model: {
    src: '/models/kamikaze_sat.glb',
    label: 'KETU / STEP ASSEMBLY',
    caption: 'Live geometry, tessellated from the co-orbital vehicle assembly',
    readouts: [
      { label: 'BUS', value: 'Hexagonal' },
      { label: 'ARRAYS', value: 'Deployable' },
      { label: 'ROLE', value: 'Co-orbital' },
    ],
  },
  integration:
    'Orbital assets appear on the grid alongside air and ground nodes. A threat characterised in orbit and a threat characterised at a forward site are the same class of object to Valley, and can be reasoned about together.',
  related: ['quantum', 'sentinel', 'hypersonics', 'valley'],
};

/* ========================================================================= */
/* AI                                                                        */
/* ========================================================================= */

const digitalTwin: Programme = {
  slug: 'digital-twin',
  category: 'ai',
  designation: 'DIGITAL TWIN',
  name: 'Digital Twins for Weapons',
  tagline: 'Every round has a model, and the model is kept honest by the round',
  domain: ['Simulation', 'Sustainment', 'Test'],
  status: 'Operational',
  summary:
    'High-fidelity twins of weapons and platforms, validated against flight data, used to qualify what cannot be affordably tested and to predict what a stockpile will actually do.',
  hero: {
    label: 'DIGITAL TWIN / FLIGHT CORRELATION',
    path: '/images/digital-twin/hero-correlation.jpg',
  },
  overview: {
    heading: 'A stockpile you have not modelled is a stockpile you are guessing about.',
    body: [
      'Weapons spend almost their entire lives not being fired. They sit in a canister through temperature cycles, humidity, vibration and handling, and then they are expected to work perfectly, once, on a day nobody scheduled. The traditional way to gain confidence in that is to fire a sample and extrapolate: expensive, slow, and statistically thin at exactly the tail of the distribution that matters.',
      'A digital twin changes the economics. We build a physics-based model of the airframe, the powerplant, the seeker, the guidance loop and the warhead, and we keep it honest by continuously correlating it against telemetry from every real firing, every test-cell run and every stored-round inspection. The model earns its authority instead of asserting it.',
      'What that buys is concrete. Flight regimes too expensive or too dangerous to test (hypersonic glide, terminal manoeuvre at the edge of the envelope, saturation-swarm behaviour) get qualified in simulation with a quantified confidence interval. Stockpile surveillance shifts from calendar-based to condition-based, so a round is replaced when its twin says it has degraded rather than when the shelf-life card expires. And a modification can be assessed against the whole envelope before a single article is cut.',
      'The same twins run inside the training environment, so what an operator rehearses against is the same model the engineers qualify against.',
    ],
  },
  capabilities: [
    {
      title: 'Physics-based fidelity',
      body: 'Aerodynamics, propulsion, structures, seeker and guidance modelled from first principles rather than fitted to a curve.',
    },
    {
      title: 'Flight-data correlation',
      body: 'Every real firing and test run feeds back into the model. Divergence between twin and article is tracked as a first-class metric.',
    },
    {
      title: 'Virtual qualification',
      body: 'Regimes that cannot be affordably or safely flown are qualified in simulation with a stated confidence interval, and physical tests are spent where they carry most information.',
    },
    {
      title: 'Condition-based stockpile management',
      body: 'Per-round twins age with their article, predicting remaining life from real storage history instead of a shelf-life card.',
    },
    {
      title: 'Modification assessment',
      body: 'A proposed change is evaluated across the whole envelope before metal is cut, shortening the modification cycle substantially.',
    },
    {
      title: 'Training fidelity',
      body: 'Operators train against the same validated models engineers qualify against, so rehearsal behaviour matches field behaviour.',
    },
  ],
  specs: [
    { label: 'Twin scope', value: 'Airframe → warhead' },
    { label: 'Validation', value: 'Flight-data correlated' },
    { label: 'Per-article twins', value: 'Supported', note: 'Individual serial-number tracking' },
    { label: 'Coupled domains', value: 'Aero · Structures · Propulsion · Guidance' },
    { label: 'Stockpile mode', value: 'Condition-based' },
    { label: 'Training integration', value: 'Shared models' },
    { label: 'Deployment', value: 'On-premise', note: 'Air-gapped installation supported' },
    { label: 'Grid interface', value: 'Native Valley service' },
  ],
  gallery: [
    {
      label: 'TWIN / STRUCTURAL RESPONSE',
      caption: 'Coupled structural and aerodynamic solution',
      path: '/images/digital-twin/structural.jpg',
      ratio: '4/5',
    },
    {
      label: 'STOCKPILE / CONDITION VIEW',
      caption: 'Per-round remaining-life prediction',
      path: '/images/digital-twin/stockpile.jpg',
      ratio: '4/5',
    },
  ],
  integration:
    'Twins are a Valley service. When the grid pairs an effector to a target it queries the twin for that specific round (its age, its storage history, its predicted performance) rather than assuming a nominal article.',
  related: ['ankosha', 'hypersonics', 'quantum', 'valley'],
};

const quantum: Programme = {
  slug: 'quantum',
  category: 'ai',
  designation: 'QUANTUM',
  name: 'Quantum Technologies',
  tagline: 'Communications, sensing and navigation that survive a contested spectrum',
  domain: ['Quantum', 'Communications', 'Navigation'],
  status: 'In development',
  summary:
    'Quantum key distribution, post-quantum cryptography, quantum inertial sensing and quantum-secured links for the grid, the layer that keeps command and control trustworthy when the spectrum is not.',
  hero: {
    label: 'QUANTUM / ENTANGLEMENT BENCH',
    path: '/images/quantum/hero-bench.jpg',
  },
  overview: {
    heading: 'Assume the adversary is recording everything, and will decrypt it later.',
    body: [
      'Encrypted traffic intercepted today can be stored and broken years from now against a cryptographically relevant quantum computer. For commercial data that is an inconvenience. For strategic communications, force dispositions and weapon telemetry with a thirty-year classification life, it is a present-tense problem that has to be solved before the machine exists, not after.',
      'Our quantum work runs on three fronts. Quantum key distribution establishes keys whose interception is physically detectable rather than merely improbable, protecting the highest-value links between fixed sites and, in time, between ground and orbit. Post-quantum cryptography migrates the rest of the estate to algorithms that hold against quantum attack, unglamorous, essential, and the part most organisations are late on.',
      'The third front is sensing. Quantum inertial sensors offer navigation drift low enough to hold accuracy for extended periods with no satellite fix at all, which matters enormously for a force that has to assume GNSS will be denied. Quantum magnetometry and gravimetry open detection of objects that conventional sensing does not see.',
      'Where this joins the rest of our work is the grid itself. Tasking, target nominations and engagement authority move constantly between nodes an adversary is actively trying to read and to spoof. Quantum-secured channels are what make that traffic trustworthy rather than merely fast.',
    ],
  },
  capabilities: [
    {
      title: 'Quantum key distribution',
      body: 'Key establishment where interception is physically detectable, protecting the highest-value links in the command chain.',
    },
    {
      title: 'Post-quantum cryptography',
      body: 'Migration of the wider estate to quantum-resistant algorithms, on the assumption that today\'s intercepts are tomorrow\'s plaintext.',
    },
    {
      title: 'Quantum inertial navigation',
      body: 'Drift low enough to hold navigation accuracy for extended periods with no satellite fix, for a force that must assume GNSS denial.',
    },
    {
      title: 'Quantum sensing',
      body: 'Magnetometry and gravimetry for detection of objects and structures conventional sensing does not resolve.',
    },
    {
      title: 'Secured command traffic',
      body: 'The trusted channel underneath the grid, carrying tasking and engagement authority between nodes without exposing either to interception.',
    },
    {
      title: 'Ground-to-orbit links',
      body: 'Development toward quantum-secured links between ground stations and national space assets.',
    },
  ],
  specs: [
    { label: 'QKD protocol class', value: 'ON REQUEST' },
    { label: 'PQC posture', value: 'Migration in progress' },
    { label: 'Inertial drift', value: 'CLASSIFIED' },
    { label: 'Sensing modalities', value: 'Magnetometry · Gravimetry' },
    { label: 'Link segments', value: 'Fibre · free-space · space' },
    { label: 'Key rate', value: 'ON REQUEST' },
    { label: 'Integration', value: 'Valley command channel' },
    { label: 'Programme phase', value: 'Development' },
  ],
  gallery: [
    {
      label: 'FREE-SPACE / OPTICAL TERMINAL',
      caption: 'Free-space link terminal under test',
      path: '/images/quantum/optical-terminal.jpg',
      ratio: '4/5',
    },
    {
      label: 'INERTIAL / COLD-ATOM SENSOR',
      caption: 'Quantum inertial sensing bench',
      path: '/images/quantum/inertial-sensor.jpg',
      ratio: '4/5',
    },
  ],
  integration:
    'Quantum-secured links are the backbone of the grid\'s highest-classification traffic, and the channel over which tasking and engagement authority move between nodes.',
  related: ['orbital-systems', 'digital-twin', 'sovereign-model', 'valley'],
};

const aorizon: Programme = {
  slug: 'aorizon',
  category: 'ai',
  designation: 'AORIZON',
  name: 'Aorizon',
  tagline: 'See. Wide-area autonomous sensing and fusion',
  domain: ['ISR', 'Fusion', 'Valley product'],
  status: 'In trials',
  summary:
    'The sensing product of the Valley stack. Aorizon turns every sensor a force owns, and several it does not, into one continuously maintained picture of the battlespace.',
  hero: {
    label: 'AORIZON / FUSED PICTURE',
    path: '/images/products/aorizon-hero.jpg',
  },
  overview: {
    heading: 'Most forces do not have a sensing problem. They have a fusion problem.',
    body: [
      'A brigade already fields more sensors than it can exploit: radars, EO/IR turrets, RF receivers, ground surveillance, UAS feeds, satellite imagery products, and a great deal of human reporting. Almost all of it is processed separately, presented separately, and correlated by an analyst under time pressure, which is where the picture falls apart.',
      'Aorizon is the fusion layer. It ingests heterogeneous sensor feeds without demanding that they be replaced, resolves them into single tracks per real-world object, and maintains custody of those tracks continuously: through sensor handover, through gaps in coverage, and through deliberate deception.',
      'It runs at the edge. A forward node produces a usable local picture with no connectivity at all, and reconciles with the wider grid when a link returns. Nothing about the design assumes a datacentre is reachable.',
    ],
  },
  capabilities: [
    {
      title: 'Sensor-agnostic ingest',
      body: 'Works with the sensors already in service, ours and third parties\', rather than requiring a fleet replacement to deliver value.',
    },
    {
      title: 'Single track per object',
      body: 'Multi-sensor correlation resolving duplicate detections into one track with an explicit confidence and provenance chain.',
    },
    {
      title: 'Continuous custody',
      body: 'Tracks survive sensor handover, coverage gaps and attempted deception, with a maintained history rather than a snapshot.',
    },
    {
      title: 'Edge-first operation',
      body: 'A forward node produces a full local picture disconnected, and reconciles with the grid when a link returns.',
    },
    {
      title: 'Anomaly surfacing',
      body: 'Pattern-of-life modelling that raises what has changed, rather than presenting an operator with everything that is present.',
    },
    {
      title: 'Provenance on every track',
      body: 'Any operator can interrogate which sensors contributed to a track and how confidence was derived. No unexplained assertions.',
    },
  ],
  specs: [
    { label: 'Role', value: 'Sense and fuse' },
    { label: 'Sensor types', value: 'Radar · EO/IR · RF · Acoustic · Imagery' },
    { label: 'Third-party sensors', value: 'Supported' },
    { label: 'Operation', value: 'Edge-first', note: 'Full function disconnected' },
    { label: 'Track provenance', value: 'Always available' },
    { label: 'Deployment', value: 'On-premise / air-gapped' },
    { label: 'Built on', value: 'Valley' },
    { label: 'Concurrent tracks', value: 'ON REQUEST' },
  ],
  gallery: [
    {
      label: 'AORIZON / OPERATOR CONSOLE',
      caption: 'Fused track picture with provenance',
      path: '/images/products/aorizon-console.jpg',
      ratio: '16/9',
    },
    {
      label: 'AORIZON / FORWARD NODE',
      caption: 'Disconnected edge operation',
      path: '/images/products/aorizon-node.jpg',
      ratio: '4/5',
    },
  ],
  integration:
    'Aorizon produces the picture. Talon acts on it and Sentinel defends against what appears in it. All three read and write the same grid state.',
  related: ['talon', 'sentinel', 'valley', 'orbital-systems'],
};

const talon: Programme = {
  slug: 'talon',
  category: 'ai',
  designation: 'TALON',
  name: 'Talon',
  tagline: 'Strike. Effector pairing and engagement management',
  domain: ['Fires', 'Effector pairing', 'Valley product'],
  status: 'In trials',
  summary:
    'The strike product of the Valley stack. Talon takes a target and finds the right effect for it across everything on the grid, under an authority chain that is explicit at every step.',
  hero: {
    label: 'TALON / EFFECTOR PAIRING',
    path: '/images/products/talon-hero.jpg',
  },
  overview: {
    heading: 'The hard part of fires is not the shot. It is the allocation.',
    body: [
      'A commander looking at a target has a genuinely difficult problem: which of the available effects is right for it, given range, timing, collateral constraint, magazine depth, the cost of the round against the value of the target, and everything else being prosecuted at the same time. Historically that is resolved through voice, staff process and experience, at a tempo the modern fight does not allow.',
      'Talon does that allocation as a machine-assisted process with a human at the decision point. Given a target from Aorizon or any other grid source, it proposes candidate effectors across the full inventory (loitering munition, high-speed interceptor, tube artillery, an allied asset) ranked against the constraints that actually apply, with the reasoning shown.',
      'It manages the engagement through completion: commitment, in-flight re-targeting, abort, and battle damage assessment fed back onto the track. Every step carries an identity, a timestamp and an authority reference, which is what makes the record defensible afterwards.',
    ],
  },
  capabilities: [
    {
      title: 'Cross-inventory pairing',
      body: 'Candidate effects proposed across every available effector, including third-party and allied systems on the grid.',
    },
    {
      title: 'Constraint-aware ranking',
      body: 'Range, timing, collateral constraint, magazine depth and cost exchange weighed explicitly, with the reasoning shown to the operator.',
    },
    {
      title: 'Human at the decision point',
      body: 'The system proposes; a person commits. Commitment authority is never delegated to the machine.',
    },
    {
      title: 'Engagement management',
      body: 'In-flight re-targeting, hold and abort, with the operator retaining control right through terminal phase.',
    },
    {
      title: 'Assessment loop closed',
      body: 'Battle damage assessment is written back onto the track, so re-attack decisions are made against evidence.',
    },
    {
      title: 'Defensible record',
      body: 'Identity, timestamp and authority reference on every step, producing a record that stands up to review.',
    },
  ],
  specs: [
    { label: 'Role', value: 'Pair and engage' },
    { label: 'Effector scope', value: 'Full inventory', note: 'Including third-party and allied' },
    { label: 'Commitment', value: 'Human-authorised' },
    { label: 'Re-targeting', value: 'In-flight' },
    { label: 'Abort', value: 'Available to terminal' },
    { label: 'Assessment', value: 'Closed loop' },
    { label: 'Audit record', value: 'Per-step attribution' },
    { label: 'Built on', value: 'Valley' },
  ],
  gallery: [
    {
      label: 'TALON / PAIRING VIEW',
      caption: 'Ranked effector options against a nominated target',
      path: '/images/products/talon-pairing.jpg',
      ratio: '16/9',
    },
    {
      label: 'TALON / ENGAGEMENT TIMELINE',
      caption: 'Authority chain through commitment',
      path: '/images/products/talon-timeline.jpg',
      ratio: '4/5',
    },
  ],
  integration:
    'Talon is the effects face of the grid. It consumes Aorizon tracks, commands Ankosha, Ryder and third-party effectors, and queries digital twins for the actual condition of the round it is about to commit.',
  related: ['aorizon', 'sentinel', 'ankosha', 'valley'],
};

const sentinel: Programme = {
  slug: 'sentinel',
  category: 'ai',
  designation: 'SENTINEL',
  name: 'Sentinel',
  tagline: 'Shield. Installation and force protection',
  domain: ['Protection', 'Air defence', 'Valley product'],
  status: 'In trials',
  summary:
    'The protection product of the Valley stack. Sentinel holds the defensive picture for a base, a convoy or a formation and runs the layered response automatically under standing authority.',
  hero: {
    label: 'SENTINEL / INSTALLATION PICTURE',
    path: '/images/products/sentinel-hero.jpg',
  },
  overview: {
    heading: 'Defence fails on reaction time, not on equipment.',
    body: [
      'An installation under attack rarely lacks the means to defend itself. What it lacks is the seconds between detection and response, the time spent identifying what was seen, deciding whether it matters, finding who has authority, and telling the right effector to act. Against a drone at low altitude that entire chain has to complete in less time than a staff process takes to begin.',
      'Sentinel compresses it. It holds a continuous defensive picture for a defended asset, evaluates threats against rules of engagement that a commander sets in advance, allocates the appropriate layer automatically (soft kill, hard kill, manoeuvre, or an alert to a human) and executes within standing authority while keeping the commander informed rather than in the loop for every event.',
      'It scales down to a single forward position with one radar and one effector, and up to an installation with dozens of sensors and multiple effector types. The same model covers a static base, a moving convoy and a deployed formation.',
    ],
  },
  capabilities: [
    {
      title: 'Continuous defensive picture',
      body: 'A maintained air, ground and RF picture around the defended asset, not a set of separate sensor displays.',
    },
    {
      title: 'Pre-authorised response',
      body: 'Rules of engagement set in advance by the commander, executed inside standing authority at machine speed.',
    },
    {
      title: 'Automatic layer selection',
      body: 'Soft kill, hard kill, manoeuvre or human alert selected against the threat and the magazine available.',
    },
    {
      title: 'Scales both ways',
      body: 'One radar and one effector at a forward position, or dozens of each at a main installation, under the same model.',
    },
    {
      title: 'Mobile protection',
      body: 'Covers convoys and moving formations, not only fixed installations, with the picture travelling with the protected element.',
    },
    {
      title: 'Commander informed, not consumed',
      body: 'The commander sets intent and reviews what happened. They are not required in the loop for every individual event.',
    },
  ],
  specs: [
    { label: 'Role', value: 'Protect' },
    { label: 'Protected asset', value: 'Fixed · mobile · formation' },
    { label: 'Response layers', value: 'Soft kill · hard kill · manoeuvre' },
    { label: 'Authority model', value: 'Pre-authorised ROE' },
    { label: 'Scale', value: '1 to N sensors and effectors' },
    { label: 'Reaction time', value: 'ON REQUEST' },
    { label: 'Third-party effectors', value: 'Supported' },
    { label: 'Built on', value: 'Valley' },
  ],
  gallery: [
    {
      label: 'SENTINEL / DEFENSIVE PICTURE',
      caption: 'Layered protection around a defended asset',
      path: '/images/products/sentinel-picture.jpg',
      ratio: '16/9',
    },
    {
      label: 'SENTINEL / CONVOY MODE',
      caption: 'Protection of a moving formation',
      path: '/images/products/sentinel-convoy.jpg',
      ratio: '4/5',
    },
  ],
  integration:
    'Sentinel is the defensive face of the grid, driving Indrastra and Ryder at a site while remaining one cell of a national picture, handing tracks forward and receiving cueing from sensors it will never own.',
  related: ['counter-uas', 'aorizon', 'talon', 'valley'],
};


const sovereignModel: Programme = {
  slug: 'sovereign-model',
  category: 'ai',
  designation: 'SOVEREIGN MODEL',
  name: 'Sovereign Foundation Model',
  tagline: 'A multi-modal foundation model trained wholly on Indian infrastructure',
  domain: ['Artificial intelligence', 'Sovereign', 'Air-gapped'],
  status: 'In development',
  summary:
    'A sparse Mixture-of-Experts foundation model reasoning natively over text, imagery, audio and sensor telemetry, designed, trained and operated entirely inside national infrastructure and handed over as customer IP.',
  hero: {
    label: 'SOVEREIGN MODEL / REFERENCE STACK',
    path: '/images/sovereign-model/hero-stack.jpg',
  },
  overview: {
    heading: 'The model that cannot be switched off from abroad.',
    body: [
      'Every serious military use of a foundation model runs into the same wall. The capable models are hosted by foreign companies, under foreign law, on foreign compute, and they cannot be taken into an air-gapped enclave or shown classified material. The models that can be self-hosted are smaller, and none of them treat sonar, radar or AIS telemetry as anything more than text to be described.',
      'This programme is our answer. A sparse mixture-of-experts transformer trained on sovereign compute, reading text, imagery, speech and sensor telemetry as first-class modalities fused through cross-attention rather than as captions bolted onto a language model.',
      'It is built for customers who cannot put classified material through a foreign API. Source code, training data, pipelines, model weights and tooling transfer to the customer as exclusive IP, with a structured knowledge-transfer programme so their own people can retrain it.',
    ],
  },
  capabilities: [
    {
      title: 'Sensor telemetry as a modality',
      body: 'A purpose-built 1D-CNN and transformer encoder for sonar, radar and AIS, fused by cross-attention. Genuine sensor-language reasoning rather than caption-style approximation.',
    },
    {
      title: 'Classification-aware retrieval',
      body: 'Vector and lexical indices physically sharded by compartment and gated by user clearance before embedding lookup, which removes the prompt-tag leakage class of attack entirely.',
    },
    {
      title: 'Three hardened profiles',
      body: 'One training pipeline produces a quantised edge build for Jetson-class hardware, a CPU-only workstation build, and a full-precision secure data-centre build. All three are air-gap installable.',
    },
    {
      title: 'Audit-grade interpretability',
      body: 'Sparse autoencoder dictionaries on the production residual stream give monosemantic features for attribution and targeted behaviour steering, so a mission-critical output can be explained after the fact.',
    },
    {
      title: 'Reproducible and attested',
      body: 'Hermetic Nix builds, fixed seeds, Sigstore-signed weights and SLSA L3+ provenance. Three rebuilds produce byte-identical artefacts, which is what makes the supply chain auditable.',
    },
    {
      title: 'Resilient under DDIL',
      body: 'Air-gap native, operating under denied, degraded, intermittent and limited conditions, in English and the major Indian languages.',
    },
  ],
  variants: [
    {
      designation: 'PROFILE A',
      name: 'Edge',
      role: 'Sensor fusion, autonomous platforms, swarm',
      note: 'Distilled students quantised for Jetson-class, ARM and x86 industrial hardware, sized to run inside an airframe or a forward node.',
    },
    {
      designation: 'PROFILE B',
      name: 'Workstation',
      role: 'Staff work, maintenance, damage control, voice',
      note: 'Quantised CPU-only build for staff work, maintenance and voice interaction where no accelerator is available.',
    },
    {
      designation: 'PROFILE C',
      name: 'Secure data centre',
      role: 'Intelligence fusion, mission planning, wargaming',
      note: 'Full-precision build inside trusted execution enclaves for intelligence fusion, mission planning and wargaming.',
    },
  ],
  specs: [
    { label: 'Architecture', value: 'Sparse mixture of experts', note: 'Multi-modal transformer backbone' },
    { label: 'Deployment profiles', value: 'Three', note: 'Edge, workstation and secure data centre' },
    { label: 'Performance envelope', value: 'ON REQUEST' },
    { label: 'Programme schedule', value: 'ON REQUEST' },
    { label: 'Modalities', value: 'Four, native', note: 'Text, imagery, audio, sensor telemetry' },
    { label: 'Sovereignty', value: '100 per cent', note: 'Indian compute, data, weights and lifecycle' },
    { label: 'IP position', value: 'Customer exclusive', note: 'Source, weights, data and pipelines transferred' },
  ],
  gallery: [],
  integration:
    'The sovereign model is the reasoning tier of the Valley grid. Profile A rides the airframes as the autonomy core, Profile B sits at the operator console, and Profile C carries intelligence fusion and mission planning behind the enclave boundary.',
  related: ['aorizon', 'quantum', 'digital-twin', 'valley'],
};

/* ========================================================================= */

export const PROGRAMMES: Programme[] = [
  ankosha,
  counterUas,
  hypersonics,
  orbitalSystems,
  aorizon,
  talon,
  sentinel,
  sovereignModel,
  digitalTwin,
  quantum,
];

export const PROGRAMME_BY_SLUG: Record<string, Programme> = Object.fromEntries(
  PROGRAMMES.map((p) => [p.slug, p]),
);

export function programmesIn(category: Category): Programme[] {
  return PROGRAMMES.filter((p) => p.category === category);
}

/** Resolves a route path for a programme, including the Valley special case. */
export function programmePath(slug: string): string {
  if (slug === 'valley') return '/valley';
  const programme = PROGRAMME_BY_SLUG[slug];
  if (!programme) return '/';
  return `/${programme.category}/${programme.slug}`;
}

export function programmeTitle(slug: string): string {
  if (slug === 'valley') return 'Valley';
  return PROGRAMME_BY_SLUG[slug]?.name ?? slug;
}
