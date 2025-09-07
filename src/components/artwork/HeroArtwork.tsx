"use client";

import Image from "next/image";
import Link from "next/link";
import { getOptimizedImageUrl } from "@/lib/image";
import { Artwork } from "@/types/artwork";

type HeroArtworkProps = {
  artwork: Artwork;
};

export function HeroArtwork({ artwork }: HeroArtworkProps) {
  const title = artwork.title?.trim() || "Untitled";
  const artist = artwork.artistDisplayName?.trim() || "Unknown Artist";
  const raw = artwork.primaryImageSmall || artwork.primaryImage || "";
  const image = getOptimizedImageUrl(raw, { width: 1600, quality: 70, format: "webp" });
  const alt = `${title} by ${artist}`;

  return (
    <Link
      href={`/artwork/${artwork.objectID}`}
      prefetch
      aria-label={`${title} – ${artist}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 rounded-xl"
    >
      <div className="relative w-full overflow-hidden rounded-xl border shadow-sm bg-neutral-50">
        <div className="relative aspect-[21/9] w-full">
          {image && (
            <Image
              src={image}
              alt={alt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              unoptimized
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='100%25' height='100%25' fill='%23f3f3f3'/%3E%3C/svg%3E"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <h2 className="text-xl md:text-2xl font-semibold [font-family:var(--font-playfair),serif] line-clamp-2">
              {title}
            </h2>
            <p className="text-white/90 text-sm md:text-base line-clamp-1">{artist}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HeroArtwork;
