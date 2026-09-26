import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { fieldNotes } from "@/content/field-notes";

const routes = [
  "/",
  "/platform",
  "/how-it-works",
  "/systems",
  "/use-cases",
  "/grid-events",
  "/integrations",
  "/outcomes",
  "/field-notes",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...routes.map((path) => ({
      url: `${site.url}${path === "/" ? "" : path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : ["/privacy", "/terms", "/accessibility"].includes(path) ? 0.3 : 0.7,
    })),
    ...fieldNotes.map((n) => ({
      url: `${site.url}/field-notes/${n.slug}`,
      lastModified: new Date(`${n.date}T12:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
