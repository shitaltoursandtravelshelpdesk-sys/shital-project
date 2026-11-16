"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mbarTel, mbarWa } from "@/lib/links";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { BOOKING_PAGES } from "./nav";

/** Mobile quick-action bar (hidden on review & confirmed) */
export function MobileBar() {
  const pathname = usePathname();
  if (BOOKING_PAGES.includes(pathname)) return null;
  return (
    <div className="mbar">
      <a href={mbarTel()}>
        <PhoneIcon size={17} strokeWidth={2} bare />
        Call
      </a>
      <a className="wa" href={mbarWa()} target="_blank" rel="noopener">
        <WhatsAppIcon size={18} />
        WhatsApp
      </a>
      <Link className="bk" href="/book">
        <CalendarIcon size={17} strokeWidth={2} bare />
        Book Now
      </Link>
    </div>
  );
}
