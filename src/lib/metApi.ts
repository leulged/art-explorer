import { Artwork, SearchResponse } from "@/types/artwork";

const MET_BASE_URL =
  process.env.MET_BASE_URL || "https://collectionapi.metmuseum.org/public/collection/v1";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    // Cache for SSG/ISR; reduces third-party request volume
    next: { revalidate: 3600 },
    headers: {
      accept: "application/json",
      // Some third parties behave better with a UA set on server fetches
      "user-agent": "ArtExplorer/1.0 (+https://vercel.com)",
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return (await response.json()) as T;
}

type SearchOptions = {
  hasImages?: boolean;
  artistOrCulture?: boolean;
  isOnView?: boolean;
  departmentId?: number;
  medium?: string;
  isHighlight?: boolean;
};

export async function searchObjectIds(
  query: string,
  options: SearchOptions = { hasImages: true },
): Promise<number[]> {
  try {
    const params = new URLSearchParams({ q: query });
    const opt = { hasImages: true, ...options };
    if (opt.hasImages !== undefined) params.set("hasImages", String(opt.hasImages));
    if (opt.artistOrCulture !== undefined)
      params.set("artistOrCulture", String(opt.artistOrCulture));
    if (opt.isOnView !== undefined) params.set("isOnView", String(opt.isOnView));
    if (opt.departmentId !== undefined) params.set("departmentId", String(opt.departmentId));
    if (opt.medium) params.set("medium", opt.medium);
    if (opt.isHighlight !== undefined) params.set("isHighlight", String(opt.isHighlight));

    const data = await fetchJson<SearchResponse>(`${MET_BASE_URL}/search?${params.toString()}`);
    return data.objectIDs?.slice(0, 80) ?? [];
  } catch {
    // Fail open: return empty so callers can fallback without throwing
    return [];
  }
}

export async function getArtworkById(objectId: number): Promise<Artwork> {
  return fetchJson<Artwork>(`${MET_BASE_URL}/objects/${objectId}`);
}

export async function getFeaturedArtworks(limit = 10): Promise<Artwork[]> {
  // Helper to fetch many object details but skip any failures
  const getManySafely = async (ids: number[], take: number): Promise<Artwork[]> => {
    const settled = await Promise.allSettled(ids.slice(0, take).map((id) => getArtworkById(id)));
    return settled
      .filter((r): r is PromiseFulfilledResult<Artwork> => r.status === "fulfilled")
      .map((r) => r.value)
      .filter((a) => a && (a.primaryImage || a.primaryImageSmall));
  };

  const curatedFallback = [
    313658, 551786, 729644, 437261, 459027, 436524, 435809, 436839, 459107, 436529,
  ];

  try {
    // Lightweight primary query: highlighted masterpieces with images
    const idsPrimary = await searchObjectIds("masterpiece", { hasImages: true, isHighlight: true });
    let results = await getManySafely(idsPrimary, 60);

    // If insufficient, add a single themed search to diversify
    if (results.length < limit) {
      const idsTheme = await searchObjectIds("European Paintings", { hasImages: true });
      const theme = await getManySafely(idsTheme, 40);
      results = results.concat(theme);
    }

    // If still insufficient or API blocked, use curated fallback ids
    if (results.length < limit) {
      const curated = await getManySafely(curatedFallback, curatedFallback.length);
      results = results.concat(curated);
    }

    // Dedupe and slice
    const byId = new Map<number, Artwork>();
    for (const a of results) {
      if (!byId.has(a.objectID)) byId.set(a.objectID, a);
    }
    return Array.from(byId.values()).slice(0, limit);
  } catch {
    // Final fallback: curated only
    return getManySafely(curatedFallback, limit);
  }
}
