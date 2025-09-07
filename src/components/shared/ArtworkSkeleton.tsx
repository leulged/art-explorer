import { Skeleton } from "@/components/ui/skeleton";

export function ArtworkSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full aspect-[4/3]" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  );
}

export default ArtworkSkeleton;
