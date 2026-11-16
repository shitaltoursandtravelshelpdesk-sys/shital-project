"use client";

import type { ReactNode } from "react";
import { BIZ, type BizKey } from "@/lib/config";
import { bizHref, isExternal } from "@/lib/links";

/** Plain business value (replaces <span data-biz="..."></span>) */
export function BizText({ type }: { type: BizKey }) {
  return <span>{BIZ[type]}</span>;
}

/** Clickable link: tel:, wa.me, mailto:, Google Maps */
export function BizLink({ type, children }: { type: BizKey; children?: ReactNode }) {
  const ext = isExternal(type);
  return (
    <a href={bizHref(type)} {...(ext ? { target: "_blank", rel: "noopener" } : {})}>
      {children ?? BIZ[type]}
    </a>
  );
}

/** A contact card (.it) that is fully tappable, like the old data-biz behaviour */
export function BizItem({ type, children }: { type: BizKey; children: ReactNode }) {
  const open = () => {
    const href = bizHref(type);
    if (isExternal(type)) window.open(href, "_blank", "noopener");
    else window.location.href = href;
  };
  return (
    <div className="it tap" onClick={open}>
      {children}
    </div>
  );
}
