import { Artwork, SearchResponse } from "@/types/artwork";

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 3600 } });
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
  const params = new URLSearchParams({ q: query });
  const opt = { hasImages: true, ...options };
  if (opt.hasImages !== undefined) params.set("hasImages", String(opt.hasImages));
  if (opt.artistOrCulture !== undefined) params.set("artistOrCulture", String(opt.artistOrCulture));
  if (opt.isOnView !== undefined) params.set("isOnView", String(opt.isOnView));
  if (opt.departmentId !== undefined) params.set("departmentId", String(opt.departmentId));
  if (opt.medium) params.set("medium", opt.medium);
  if (opt.isHighlight !== undefined) params.set("isHighlight", String(opt.isHighlight));

  const data = await fetchJson<SearchResponse>(`${MET_BASE_URL}/search?${params.toString()}`);
  return data.objectIDs?.slice(0, 80) ?? [];
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

  const scored = (a: Artwork) => (a.isHighlight ? 2 : 0) + (a.isPublicDomain ? 1 : 0);

  try {
    // 1) Strongly bias to famous painters
    const artists = [
      "Vincent van Gogh",
      "Claude Monet",
      "Johannes Vermeer",
      "Rembrandt",
      "J. M. W. Turner",
      "Edgar Degas",
      "Pierre-Auguste Renoir",
      "Paul Cézanne",
      "Sandro Botticelli",
      "Raphael",
    ];

    let results: Artwork[] = [];
    for (const artist of artists) {
      const ids = await searchObjectIds(artist, {
        hasImages: true,
        artistOrCulture: true,
      });
      const items = await getManySafely(ids, 50);
      results.push(
        ...items.filter(
          (a) =>
            (a.classification?.toLowerCase().includes("painting") ?? true) &&
            (a.isPublicDomain ?? true),
        ),
      );
      if (results.length >= limit) break;
    }

    // 2) If still lacking, add highlighted masterpieces
    if (results.length < limit) {
      const ids = await searchObjectIds("masterpiece", {
        hasImages: true,
        isHighlight: true,
      });
      const items = await getManySafely(ids, 80);
      results.push(...items);
    }

    // 3) Curated style fallbacks
    if (results.length < limit) {
      const themes = [
        "Impressionism",
        "European Paintings",
        "Renaissance",
        "landscape",
        "portrait",
      ];
      for (const t of themes) {
        const ids = await searchObjectIds(t, { hasImages: true });
        const items = await getManySafely(ids, 60);
        results.push(...items);
        if (results.length >= limit) break;
      }
    }

    // rank and dedupe
    const byId = new Map<number, Artwork>();
    for (const a of results) {
      if (!byId.has(a.objectID)) byId.set(a.objectID, a);
    }
    const ranked = Array.from(byId.values())
      .filter((a) => a.primaryImage || a.primaryImageSmall)
      .sort((a, b) => scored(b) - scored(a));

    return ranked.slice(0, limit);
  } catch (err) {
    // broad fallback
    const ids = await searchObjectIds("art", { hasImages: true });
    const items = await getManySafely(ids, 50);
    return items.slice(0, limit);
  }
}
