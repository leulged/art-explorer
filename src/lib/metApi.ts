import { Artwork, SearchResponse } from "@/types/artwork";

const MET_BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function searchObjectIds(
  query: string,
  hasImages = true
): Promise<number[]> {
  const params = new URLSearchParams({
    q: query,
    hasImages: String(hasImages),
  });
  const data = await fetchJson<SearchResponse>(
    `${MET_BASE_URL}/search?${params.toString()}`
  );
  return data.objectIDs?.slice(0, 50) ?? [];
}

export async function getArtworkById(objectId: number): Promise<Artwork> {
  return fetchJson<Artwork>(`${MET_BASE_URL}/objects/${objectId}`);
}

export async function getFeaturedArtworks(limit = 10): Promise<Artwork[]> {
  // Seed search to common terms to ensure image availability
  const candidates = [
    "painting",
    "sculpture",
    "landscape",
    "portrait",
    "Egypt",
    "Japan",
  ];
  for (const term of candidates) {
    const ids = await searchObjectIds(term, true);
    if (ids.length > 0) {
      const selected = ids.slice(0, limit);
      const items = await Promise.all(selected.map((id) => getArtworkById(id)));
      return items.filter((a) => a.primaryImageSmall || a.primaryImage);
    }
  }
  return [];
}
