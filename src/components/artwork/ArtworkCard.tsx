"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Artwork, toArtworkCardData } from "@/types/artwork";

type ArtworkCardProps = {
  artwork: Artwork;
};

export function ArtworkCard({ artwork }: ArtworkCardProps) {
  const data = toArtworkCardData(artwork);
  return (
    <Link
      href={`/artwork/${data.id}`}
      aria-label={`${data.title} by ${data.artist}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 rounded-md"
    >
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50">
          {data.image ? (
            <Image
              src={data.image}
              alt={data.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500 text-sm">
              No image
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1 text-base tracking-tight">{data.title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {data.artist}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="line-clamp-2 text-sm text-neutral-600">
            {data.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ArtworkCard;
