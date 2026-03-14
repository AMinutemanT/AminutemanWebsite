/**
 * Route-to-hero-asset map for prefetching on navbar hover.
 * When a user hovers a nav link, we preload the hero image/video
 * for that route so it's already cached when they navigate.
 */

interface RouteAsset {
  type: "image" | "video";
  src: string;
}

const routeAssetMap: Record<string, RouteAsset[]> = {
  "/valley/command-control": [
    { type: "image", src: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&q=80&w=1920" },
    { type: "image", src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1024" },
  ],
  "/valley/mission-autonomy": [
    { type: "image", src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920" },
    { type: "image", src: "/images/model.jpg" },
  ],
  "/valley/partner-program": [
    { type: "image", src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920" },
    { type: "image", src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1024" },
  ],
  "/kamikaze": [
    { type: "image", src: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1920" },
    { type: "image", src: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1024" },
  ],
  "/jet-engines/ankosa-b": [
    { type: "image", src: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=1920" },
    { type: "video", src: "/videos/Kamikaze.mp4" },
  ],
};

const preloadedUrls = new Set<string>();

function preloadImage(src: string): void {
  if (preloadedUrls.has(src)) return;
  preloadedUrls.add(src);

  // Use both <link rel="preload"> for browser priority and new Image() for caching
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);

  const img = new Image();
  img.src = src;
}

function preloadVideo(src: string): void {
  if (preloadedUrls.has(src)) return;
  preloadedUrls.add(src);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "video";
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Preload all hero assets for a given route.
 * Call this on mouseenter/touchstart of nav links.
 */
export function prefetchRouteAssets(route: string): void {
  const assets = routeAssetMap[route];
  if (!assets) return;

  for (const asset of assets) {
    if (asset.type === "image") {
      preloadImage(asset.src);
    } else {
      preloadVideo(asset.src);
    }
  }
}
