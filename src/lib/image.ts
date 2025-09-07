export type OptimizeOptions = {
  width?: number;
  quality?: number; // 1-100
  format?: "webp" | "avif";
};

// Returns a proxied URL that serves a resized/compressed copy of the image when a proxy is enabled.
// Supports wsrv.nl and statically.io via NEXT_PUBLIC_IMAGE_PROXY env var.
export function getOptimizedImageUrl(src: string | undefined, opts: OptimizeOptions = {}): string {
  if (!src) return "";
  const proxy = process.env.NEXT_PUBLIC_IMAGE_PROXY?.toLowerCase();
  const url = encodeURIComponent(src);
  const width = opts.width ?? 1200;
  const quality = Math.min(Math.max(opts.quality ?? 70, 1), 100);
  const format = opts.format ?? "webp";

  if (proxy === "wsrv" || proxy === "wsrv.nl") {
    // https://wsrv.nl/?url=<src>&w=<width>&output=<format>&q=<quality>
    return `https://wsrv.nl/?url=${url}&w=${width}&output=${format}&q=${quality}`;
  }
  if (proxy === "statically" || proxy === "statically.io") {
    // https://cdn.statically.io/img/<host>/<path>?w=<width>&f=<format>&q=<quality>
    try {
      const u = new URL(src);
      const path = `${u.host}${u.pathname}`.replace(/^\//, "");
      return `https://cdn.statically.io/img/${path}?w=${width}&f=${format}&q=${quality}`;
    } catch {
      return src;
    }
  }
  // Proxy disabled
  return src;
}
