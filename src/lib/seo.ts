import type { Metadata } from "next";
import { site } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Optional override for the OG image route. Defaults to the site-wide image. */
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Use the title as-is, without the " · GridSync" template suffix. */
  absolute?: boolean;
};

/** Page-specific metadata with canonical URL, Open Graph and Twitter/X card. */
export function pageMetadata({ title, description, path, image, type = "website", noindex, absolute }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: site.name, type, locale: "en_GB", ...(images && { images }) },
    twitter: { card: "summary_large_image", title, description, ...(images && { images: images.map((i) => i.url) }) },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  email: site.email,
  logo: `${site.url}/brand/gridsync-mark.svg`,
  description: site.description,
  sameAs: [site.linkedin],
};
