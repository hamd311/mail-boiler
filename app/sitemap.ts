import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mailboiler.com";

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
    { path: "login", changeFrequency: "monthly", priority: 0.8 },
    { path: "signup", changeFrequency: "monthly", priority: 0.8 },
    { path: "dashboard", changeFrequency: "daily", priority: 0.9 },
    { path: "payment-success", changeFrequency: "monthly", priority: 0.5 },
    { path: "about", changeFrequency: "monthly", priority: 0.7 },
    { path: "contact", changeFrequency: "monthly", priority: 0.7 },
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
