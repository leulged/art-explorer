import { Artwork } from "@/types/artwork";
import { ArtworkCard } from "./ArtworkCard";

type ArtworkGridProps = {
  artworks: Artwork[];
};

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
      {artworks.map((art) => (
        <ArtworkCard key={art.objectID} artwork={art} />
      ))}
    </div>
  );
}

export default ArtworkGrid;
