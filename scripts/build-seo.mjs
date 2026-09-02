/**
 * Post-build step. Two jobs, both driven off the content model so neither can
 * drift from the site:
 *
 *  1. sitemap.xml, generated from the real route list. The committed one had
 *     gone stale in both directions: it listed /ai/sovereign-model, which no
 *     longer exists, and omitted /systems/legacy-systems.
 *
 *  2. A per-route index.html carrying that route's title, description,
 *     canonical and social tags. Search engines execute the page and pick up
 *     what useSeo sets at runtime, but link scrapers do not run JavaScript, so
 *     without this every share of a programme page previews as the home page.
 *     Static hosts serve dist/systems/ankosha/index.html for that path before
 *     falling back to the SPA rewrite; the app boots and routes as usual.
 */
import { build } from 'esbuild';
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://aminutemantechnologies.com';
const NAME = 'Aminuteman Technologies';

// Bundle the TS content model so this script can read the real data.
const tmp = path.join(ROOT, 'node_modules', '.cache', 'seo-data.mjs');
await mkdir(path.dirname(tmp), { recursive: true });
await build({
  entryPoints: [path.join(ROOT, 'src/data/programmes.ts')],
  outfile: tmp, bundle: true, format: 'esm', platform: 'node', logLevel: 'silent',
});
const { PROGRAMMES, programmePath } = await import(`file://${tmp}?v=${Date.now()}`);

const STATIC = [
  ['/', `${NAME}, Shaping the Deterrence`, 'Autonomous air systems, counter-UAS and loitering strike, hypersonics and orbital programmes, unified by Valley, our defence integration grid. Designed, developed and manufactured in India.', 1.0],
  ['/valley', `Valley, ${NAME}`, 'Valley is the integration grid: every sensor publishes to it, every effector subscribes from it, and the picture it holds is the same at a forward position and at command.', 0.9],
  ['/valley/command-control', `Command & Control, ${NAME}`, 'Decision at the speed of the fight. One picture, the contradictions shown rather than averaged away, and a person at the commit step.', 0.7],
  ['/valley/mission-autonomy', `Mission Autonomy, ${NAME}`, 'Autonomy that holds through disconnection. Loss of link, of an element or of confidence drives a behaviour declared before launch.', 0.7],
  ['/valley/partner-program', `Partner Program, ${NAME}`, 'Bring your platform onto the grid. A published interface, a conformance harness, and disagreements surfaced in a lab.', 0.7],
  ['/systems', `Systems, ${NAME}`, 'Hardware programmes across air, air defence and space. Each one is a grid node before it is a platform.', 0.9],
  ['/ai', `AI, ${NAME}`, 'Deployable products that run on the Valley grid, the sovereign foundation model that reasons for them, and the validated models and secured links that qualify everything we build.', 0.9],
  ['/about', `About, ${NAME}`, 'Aminuteman Technologies is a defence engineering company building autonomous air systems, the effectors that finish an engagement, and the grid that connects every sensor and shooter into a single picture.', 0.8],
  ['/careers', `Careers, ${NAME}`, 'Engineering roles in autonomy, structures, guidance and avionics, for systems that have to work in contested airspace on a schedule India controls.', 0.7],
  ['/contact', `Contact, ${NAME}`, 'Programme briefings, trials, integration and supply enquiries, handled directly by the responsible engineering team.', 0.7],
];

const routes = [
  ...STATIC.map(([p, title, description, priority]) => ({ path: p, title, description, priority, image: null })),
  ...PROGRAMMES.map((p) => ({
    path: programmePath(p.slug),
    title: `${p.name}, ${NAME}`,
    description: p.summary,
    priority: 0.8,
    image: p.hero?.src ?? null,
  })),
];

// ---- sitemap ---------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  `<urlset xmlns="${NS}">`,
  ...routes.map((r) => [
    '  <url>',
    `    <loc>${SITE}${r.path}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <priority>${r.priority.toFixed(1)}</priority>`,
    '  </url>',
  ].join('\n')),
  '</urlset>',
  '',
].join('\n');
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);

// ---- per-route HTML --------------------------------------------------------
const shell = await readFile(path.join(DIST, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let written = 0;
for (const r of routes) {
  if (r.path === '/') continue;
  const url = SITE + r.path;
  const img = r.image ? SITE + r.image : `${SITE}/logo-og.png`;
  const html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(r.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(r.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(r.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(r.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${img}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*" \/>/, `<meta property="og:image:alt" content="${esc(r.title)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(r.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(r.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${img}" />`);
  const dir = path.join(DIST, r.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
  written += 1;
}
await rm(tmp, { force: true });
console.log(`seo: sitemap with ${routes.length} urls, ${written} prerendered route shells`);
