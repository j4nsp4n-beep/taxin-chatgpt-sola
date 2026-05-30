import type { MetadataRoute } from "next";

const SITE = "https://aisistemi.si";

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/ai-sistem-za-podjetje", priority: 0.9, changeFrequency: "monthly" },
  { path: "/ai-sistem-za-direktorja", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pregled-pripravljenosti", priority: 0.9, changeFrequency: "monthly" },
  { path: "/7-dnevni-ai-audit", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pregled-procesa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/preveri", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rezervacija", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
