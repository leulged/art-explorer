"use client";

import Image from "next/image";
import Link from "next/link";
import { getOptimizedImageUrl } from "@/lib/image";
import { Artwork, toArtworkCardData } from "@/types/artwork";

type HeroArtworkProps = {
  artwork: Artwork;
};

export function HeroArtwork({ artwork }: HeroArtworkProps) {
  const data = toArtworkCardData(artwork);
  const image = getOptimizedImageUrl(data.image, { width: 1600, quality: 70, format: "webp" });
  const title = data.title;
  const alt = data.alt;

  return (
    <Link
      href={`/artwork/${artwork.objectID}`}
      prefetch
      aria-label={`${title} – ${data.artist}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 rounded-xl"
    >
      <div className="relative w-full overflow-hidden rounded-xl border shadow-sm bg-neutral-50">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
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
              className="object-contain"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-semibold [font-family:var(--font-playfair),serif] leading-tight line-clamp-3">
              {title}
            </h2>
            <p className="text-white/90 text-sm sm:text-base mt-1 line-clamp-2">
              {data.description}
            </p>
            <p className="text-white/80 text-xs sm:text-sm italic line-clamp-1">{data.artist}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HeroArtwork;
