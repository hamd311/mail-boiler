import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  //const baseUrl = "https://www.mailboiler.com";

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.mailboiler.com").replace(
    /\/$/,
    "",
  );

  const now = new Date();

  //const routes: {
  //  path: string;
  //  changeFrequency:
  //    | "weekly"
  //    | "monthly"
  //    | "daily"
  //    | "yearly"
  //    | "always"
  //    | "hourly"
  //    | "never";
  //  priority: number;
  //}[] = [
  //  { path: "", changeFrequency: "weekly", priority: 1 },
  //  { path: "pricing", changeFrequency: "daily", priority: 0.9 },
  //  { path: "login", changeFrequency: "monthly", priority: 0.6 },
  //  { path: "signup", changeFrequency: "monthly", priority: 0.6 },
  //  { path: "about", changeFrequency: "monthly", priority: 0.8 },
  //  { path: "contact", changeFrequency: "monthly", priority: 0.8 },
  //  { path: "privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  //  { path: "terms-conditions", changeFrequency: "yearly", priority: 0.4 },
  //];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
