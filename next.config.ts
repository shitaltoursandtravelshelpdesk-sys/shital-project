import type { NextConfig } from "next";

const OLD_PAGES = ["book", "review", "confirmed", "fleet", "packages", "drive", "careers", "contact"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...OLD_PAGES.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
    ];
  },
};

export default nextConfig;
