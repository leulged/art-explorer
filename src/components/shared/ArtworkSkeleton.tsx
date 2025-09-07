import { Skeleton } from "@/components/ui/skeleton";

export function ArtworkSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full aspect-[4/3] animate-pulse motion-reduce:animate-none" />
      <Skeleton className="h-4 w-3/4 animate-pulse motion-reduce:animate-none" />
      <Skeleton className="h-3 w-1/2 animate-pulse motion-reduce:animate-none" />
      <Skeleton className="h-3 w-5/6 animate-pulse motion-reduce:animate-none" />
    </div>
  );
}

export default ArtworkSkeleton;
