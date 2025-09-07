import type { MetadataRoute } from "next";
import { searchObjectIds } from "@/lib/metApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  try {
    const ids = await searchObjectIds("masterpiece", { hasImages: true });
    const items = ids.slice(0, 50).map((id) => ({
      url: `${siteUrl}/artwork/${id}`,
      lastModified: new Date(),
    }));
    return [{ url: `${siteUrl}/`, lastModified: new Date() }, ...items];
  } catch {
    // Fail open: return minimal sitemap to avoid breaking the build if the API blocks us
    return [{ url: `${siteUrl}/`, lastModified: new Date() }];
  }
}
