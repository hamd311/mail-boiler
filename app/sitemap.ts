import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mailboiler.com";

  const routes: {
    path: string;
    changeFrequency:
      | "weekly"
      | "monthly"
      | "daily"
      | "yearly"
      | "always"
      | "hourly"
      | "never";
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "pricing", changeFrequency: "daily", priority: 0.9 },
    { path: "login", changeFrequency: "monthly", priority: 0.6 },
    { path: "signup", changeFrequency: "monthly", priority: 0.6 },
    { path: "about", changeFrequency: "monthly", priority: 0.8 },
    { path: "contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "privacy-policy", changeFrequency: "yearly", priority: 0.4 },
    { path: "terms-conditions", changeFrequency: "yearly", priority: 0.4 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}/${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
