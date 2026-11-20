import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const PAGES = ["/", "/services", "/packages", "/tours", "/vendor", "/book", "/fleet", "/drive", "/careers", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: new URL(p, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
