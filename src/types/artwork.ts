export type Artwork = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  artistDisplayBio?: string;
  objectDate: string;
  medium: string;
  culture: string;
  department: string;
  accessionNumber: string;
  primaryImage: string;
  primaryImageSmall: string;
  objectURL: string;
  isHighlight?: boolean;
  isPublicDomain?: boolean;
  classification?: string;
  additionalImages?: string[];
  creditLine?: string;
  objectName?: string;
  period?: string;
};

export type SearchResponse = {
  total: number;
  objectIDs: number[] | null;
};

export type ArtworkCardData = {
  id: number;
  title: string;
  artist: string;
  description: string;
  image: string;
  alt: string;
};

export function toArtworkCardData(artwork: Artwork): ArtworkCardData {
  const title = artwork.title?.trim() || "Untitled";
  const artist = artwork.artistDisplayName?.trim() || "Unknown Artist";
  const bio = artwork.artistDisplayBio?.trim();
  const fallback1 = [artwork.medium, artwork.objectDate].filter(Boolean).join(" · ");
  const fallback2 = [artwork.culture, artwork.medium].filter(Boolean).join(" · ");
  const description = bio || fallback1 || fallback2 || "Details unknown";
  const image = artwork.primaryImageSmall || artwork.primaryImage || "";
  const alt = `${title} by ${artist}`;

  return {
    id: artwork.objectID,
    title,
    artist,
    description,
    image,
    alt,
  };
}
