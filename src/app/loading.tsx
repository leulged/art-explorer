import ArtworkSkeleton from "@/components/shared/ArtworkSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Art Explorer – Loading</h1>
        <p className="text-neutral-600">Fetching featured artworks…</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <ArtworkSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
