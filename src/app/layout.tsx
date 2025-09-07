import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import PageTransition from "@/components/shared/PageTransition";
import SiteFooter from "@/components/shared/SiteFooter";
import SiteHeader from "@/components/shared/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Art Explorer – The Met Collection",
    template: "%s – Art Explorer",
  },
  description:
    "Discover highlighted artworks from The Metropolitan Museum of Art with fast, accessible UI.",
  keywords: ["art", "museum", "paintings", "The Met", "art explorer", "gallery"],
  authors: [{ name: "Art Explorer" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Art Explorer",
    title: "Art Explorer – The Met Collection",
    description:
      "Discover highlighted artworks from The Metropolitan Museum of Art with fast, accessible UI.",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "Art Explorer – The Met Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Explorer – The Met Collection",
    description:
      "Discover highlighted artworks from The Metropolitan Museum of Art with fast, accessible UI.",
    images: ["/next.svg"],
  },
  alternates: { canonical: siteUrl, languages: { en: "/" } },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} antialiased`}
      >
        <link rel="preconnect" href="https://images.metmuseum.org" crossOrigin="anonymous" />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white border rounded px-3 py-1"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div id="content">
          <PageTransition>{children}</PageTransition>
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
