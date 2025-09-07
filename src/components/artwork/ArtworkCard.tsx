import Image from "next/image";
import Link from "next/link";
import { getOptimizedImageUrl } from "@/lib/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Artwork, toArtworkCardData } from "@/types/artwork";

type ArtworkCardProps = {
  artwork: Artwork;
};

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const data = toArtworkCardData(artwork);
  const optimized = getOptimizedImageUrl(data.image, { width: 800, quality: 70, format: "webp" });
  return (
    <Link
      href={`/artwork/${data.id}`}
      prefetch
      aria-label={`${data.title} by ${data.artist}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 rounded-md"
    >
      <Card className="h-full overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50">
          {data.image ? (
            <Image
              src={optimized || data.image}
              alt={data.alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 42vw, (max-width: 1440px) 23vw, 20vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              unoptimized
              placeholder="blur"
              blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='12'%3E%3Crect width='100%25' height='100%25' fill='%23f1f1f1'/%3E%3C/svg%3E"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500 text-sm">
              No image
            </div>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="line-clamp-1 text-base tracking-tight [font-family:var(--font-playfair),serif]">
            {data.title}
          </CardTitle>
          <CardDescription className="line-clamp-1 italic text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            {data.artist}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-300">
            {data.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ArtworkCard;
