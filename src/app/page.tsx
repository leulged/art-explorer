import { getFeaturedArtworks } from "@/lib/metApi";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import ArtworkSkeleton from "@/components/shared/ArtworkSkeleton";
import ErrorBanner from "@/components/shared/ErrorBanner";

export const revalidate = 3600;

export default async function Home() {
  try {
    const artworks = await getFeaturedArtworks(9);
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">
            Art Explorer – Powered by The Met
          </h1>
          <p className="text-neutral-600">
            Public domain data from The Metropolitan Museum of Art
          </p>
        </header>
        {artworks.length > 0 ? (
          <ArtworkGrid artworks={artworks} />
        ) : (
          <p className="text-neutral-600">No artworks found at the moment.</p>
        )}
        <footer className="mt-10 text-xs text-neutral-500">
          Data & Images © The Metropolitan Museum of Art (Public Domain)
        </footer>
      </main>
    );
  } catch (e) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">
          Art Explorer – Featured Picks
        </h1>
        <ErrorBanner />
      </main>
    );
  }
}
