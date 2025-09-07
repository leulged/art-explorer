export type Artwork = {
  objectID: number;
  title: string;
  artistDisplayName: string;
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
  const description = artwork.medium?.trim() || "Medium unknown";
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
