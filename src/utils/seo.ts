import { useEffect } from 'react';

/* ---------------------------------------------------------------------------
 * Per-route metadata.
 *
 * index.html ships one static set of tags, which meant every route claimed
 * https://aminutemantechnologies.com as its canonical URL. That tells a search
 * engine every page on the site is a duplicate of the home page, and is enough
 * on its own to keep the programme pages out of the index.
 *
 * This sets title, description, canonical and the social tags per route.
 * Google executes the page before indexing it, so it sees these. Most social
 * scrapers do not run JavaScript, so link previews still come from index.html
 * until the build prerenders each route to its own HTML file.
 * ------------------------------------------------------------------------- */

export const SITE_URL = 'https://aminutemantechnologies.com';

/** The URL form that actually serves this route's prerendered metadata. */
export function canonicalUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;
}
const SITE_NAME = 'Aminuteman Technologies';
const DEFAULT_IMAGE = `${SITE_URL}/logo-og.png`;

function setMeta(selector: string, attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export interface SeoInput {
  /** Page title, without the company suffix. */
  title: string;
  description: string;
  /** Route path, e.g. "/systems/ankosha". */
  path: string;
  /** Absolute or root-relative image for social cards. */
  image?: string;
}

export function useSeo({ title, description, path, image }: SeoInput) {
  useEffect(() => {
    const full = path === '/' ? `${SITE_NAME}, Shaping the Deterrence` : `${title}, ${SITE_NAME}`;
    // Trailing slash is deliberate. The host serves the prerendered shell for
    // /systems/ankosha/ but its SPA rewrite shadows /systems/ankosha, which
    // would hand a scraper the home page. The slashed form is the one that
    // resolves to this route's own metadata, so it is the one we declare.
    const url = canonicalUrl(path);
    const img = image
      ? image.startsWith('http')
        ? image
        : `${SITE_URL}${image}`
      : DEFAULT_IMAGE;

    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setCanonical(url);

    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:image"]', 'property', 'og:image', img);

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', full);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', img);
  }, [title, description, path, image]);
}
