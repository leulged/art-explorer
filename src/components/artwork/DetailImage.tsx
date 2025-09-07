"use client";

import Image from "next/image";
import { useState } from "react";

type DetailImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
};

export default function DetailImage({ src, alt, sizes, priority }: DetailImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='100%25' height='100%25' fill='%23f3f3f3'/%3E%3C/svg%3E"
      onLoad={() => setLoaded(true)}
      className={`object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} motion-reduce:transition-none`}
    />
  );
}
