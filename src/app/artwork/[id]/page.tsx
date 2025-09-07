import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getArtworkById, searchObjectIds } from "@/lib/metApi";

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

  const imageUrl = art.primaryImageSmall || art.primaryImage || "";
  const alt = `${art.title || "Artwork"} by ${art.artistDisplayName || "Unknown Artist"}`;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/" className="text-sm text-neutral-600 hover:underline">
        ← Back to Home
      </Link>

      <article className="mt-6">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold mb-2 tracking-tight [font-family:var(--font-playfair),serif]">
            {art.title}
          </h1>
          <p className="text-neutral-700">{art.artistDisplayName || "Unknown Artist"}</p>
        </header>

        {imageUrl ? (
          <div className="relative w-full aspect-[4/3] mb-6 rounded-md overflow-hidden">
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              className="object-contain bg-neutral-50"
              priority
            />
          </div>
        ) : null}

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <h2 className="text-lg font-medium mb-2 border-b border-[var(--border)] pb-1">
              Details
            </h2>
            <dl className="space-y-2 text-sm">
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
          </div>
          <div>
            <h2 className="text-lg font-medium mb-2 border-b border-[var(--border)] pb-1">
              Museum
            </h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-neutral-500">Department</dt>
                <dd>{art.department || "—"}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Accession Number</dt>
                <dd>{art.accessionNumber || "—"}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">The Met Page</dt>
                <dd>
                  <a
                    href={art.objectURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View on The Met Website
                  </a>
                </dd>
              </div>
            </dl>
          </div>
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
