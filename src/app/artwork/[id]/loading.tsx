export default function LoadingArtwork() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Loading artwork…</h1>
      <div className="aspect-[4/3] w-full bg-neutral-100 rounded-md animate-pulse" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="h-32 bg-neutral-100 rounded-md animate-pulse" />
        <div className="h-32 bg-neutral-100 rounded-md animate-pulse" />
      </div>
    </main>
  );
}
