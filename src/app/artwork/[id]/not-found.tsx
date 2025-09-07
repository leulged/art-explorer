import Link from "next/link";

export default function ArtworkNotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-semibold mb-2">Artwork not found</h1>
      <p className="text-neutral-600 mb-6">This artwork may be unavailable or removed.</p>
      <Link
        href="/"
        className="inline-block px-4 py-2 rounded border bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)]"
      >
        Back to Home
      </Link>
    </main>
  );
}


