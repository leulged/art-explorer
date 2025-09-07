import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Art Explorer – The Met Collection",
    template: "%s – Art Explorer",
  },
  description:
    "Discover highlighted artworks from The Metropolitan Museum of Art with fast, accessible UI.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Art Explorer – The Met Collection",
    description:
      "Discover highlighted artworks from The Metropolitan Museum of Art with fast, accessible UI.",
    images: [
      {
        url: "/og-default.png",
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
    images: ["/og-default.png"],
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
