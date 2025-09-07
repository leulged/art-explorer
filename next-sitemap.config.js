/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/performance"],
};
