import type { Metadata } from "next";
import { getFeaturedArtworks } from "@/lib/metApi";
import { ArtworkGrid } from "@/components/artwork/ArtworkGrid";
import ArtworkSkeleton from "@/components/shared/ArtworkSkeleton";
import ErrorBanner from "@/components/shared/ErrorBanner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Art Explorer – Powered by The Met",
  description:
    "Browse highlighted artworks from The Metropolitan Museum of Art. Optimized images, fast loads, and accessible UI.",
};

export const dynamic = "force-static";

export default async function Home() {
  try {
    const artworks = await getFeaturedArtworks(9);
    return (
      <main className="relative mx-auto max-w-6xl px-4 py-12 sm:py-14 before:content-[''] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] before:bg-[length:24px_24px] motion-reduce:before:bg-none space-y-8">
        <header>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            Art Explorer – Powered by The Met
          </h1>
          <p className="text-neutral-600">
            Public domain data from The Metropolitan Museum of Art
          </p>
        </header>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: artworks.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `/artwork/${a.objectID}`,
                name: a.title,
              })),
            }),
          }}
        />
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
