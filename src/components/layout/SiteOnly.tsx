"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the public site's header, footer, loader etc. on /admin pages. */
export function SiteOnly({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path?.startsWith("/admin")) return null;
  return <>{children}</>;
}
