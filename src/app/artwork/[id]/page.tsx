import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getArtworkById, searchObjectIds } from "@/lib/metApi";
import DetailImage from "@/components/artwork/DetailImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const ids = await searchObjectIds("masterpiece", { hasImages: true });
  return ids.slice(0, 20).map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  try {
    const art = await getArtworkById(numericId);
    const title = `${art.title || "Artwork"} – ${art.artistDisplayName || "Unknown Artist"}`;
    const description = [art.medium, art.objectDate].filter(Boolean).join(" · ");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const canonical = `${siteUrl}/artwork/${numericId}`;
    const ogImage = art.primaryImageSmall || art.primaryImage || "/next.svg";

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
    };
  } catch {
    return { title: "Artwork – Art Explorer" };
  }
}

export default async function ArtworkPage({ params }: PageProps) {
  const { id } = await params;
  const art = await getArtworkById(Number(id));
  if (!art || (!art.title && !art.objectID)) {
    notFound();
  }

  const imageUrl = art.primaryImageSmall || art.primaryImage || "";
  const alt = `${art.title || "Artwork"} by ${art.artistDisplayName || "Unknown Artist"}`;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link prefetch href="/" className="text-sm text-neutral-600 hover:underline">
        ← Back to Home
      </Link>

      <article className="mt-6">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-1 tracking-tight [font-family:var(--font-playfair),serif]">
            {art.title}
          </h1>
          <p className="text-neutral-700">{art.artistDisplayName || "Unknown Artist"}</p>
        </header>

        {imageUrl ? (
          <div className="mb-8 rounded-xl border bg-neutral-50 overflow-hidden shadow-sm">
            {/* Preload hero when available for LCP */}
            <link rel="preload" as="image" href={imageUrl} />
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <DetailImage
                src={imageUrl}
                alt={alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                priority
              />
            </div>
          </div>
        ) : null}

        <section className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8 space-y-6">
            <h2 className="text-lg font-medium border-b border-[var(--border)] pb-2">Overview</h2>
            <p className="text-neutral-700 text-sm md:text-base">
              {[art.artistDisplayBio, art.creditLine, art.objectName]
                .filter(Boolean)
                .slice(0, 1)
                .join(" ") || [art.medium, art.objectDate].filter(Boolean).join(" · ")}
            </p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">Artist</dt>
                <dd>{art.artistDisplayName || "Unknown Artist"}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Date</dt>
                <dd>{art.objectDate || "—"}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Medium</dt>
                <dd>{art.medium || "—"}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Culture</dt>
                <dd>{art.culture || "—"}</dd>
              </div>
            </dl>
            {art.artistDisplayBio ? (
              <div className="pt-2">
                <h3 className="text-base font-medium mb-1">About the artist</h3>
                <p className="text-neutral-700 text-sm md:text-base line-clamp-4">
                  {art.artistDisplayBio}
                </p>
              </div>
            ) : null}
          </div>
          <aside className="md:col-span-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">At The Met</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Department</span>
                  <span>{art.department || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Accession</span>
                  <span>{art.accessionNumber || "—"}</span>
                </div>
                {art.objectURL ? (
                  <a
                    href={art.objectURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-[var(--primary)] text-white px-3 py-2 text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--ring)]"
                  >
                    View on The Met Website
                  </a>
                ) : null}
              </CardContent>
            </Card>
          </aside>
        </section>

        {/* Global footer already includes credit */}
      </article>

      {/* JSON-LD for SEO */}
      <Script
        id="jsonld-artwork"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: art.title,
            creator: art.artistDisplayName || "Unknown",
            dateCreated: art.objectDate || undefined,
            material: art.medium || undefined,
            inLanguage: "en",
            image: imageUrl || undefined,
            url: art.objectURL || undefined,
          }),
        }}
      />
    </main>
  );
}
