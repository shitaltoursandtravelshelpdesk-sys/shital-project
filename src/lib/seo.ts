import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./config";

/** Per-page metadata: exact old <title>, description and Open Graph */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: new URL(path, SITE_URL).toString(),
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [{ url: "/images/logo.png", width: 1562, height: 914, alt: SITE_NAME }],
    },
  };
}
