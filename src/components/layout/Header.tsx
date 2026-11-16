"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BIZ } from "@/lib/config";
import { telHref } from "@/lib/links";
import { CalendarIcon, PhoneIcon, UserIcon } from "@/components/icons";
import { Logo } from "./Logo";
import { BOOKING_LINKS, BOOKING_PAGES, SITE_LINKS } from "./nav";

const closeMenu = () => document.body.classList.remove("menu-open");

export function Header() {
  const pathname = usePathname();
  const booking = BOOKING_PAGES.includes(pathname);

  // close the mobile drawer on navigation
  useEffect(() => closeMenu(), [pathname]);

  return (
    <>
      <header className="hdr" id="hdr">
        <div className="wrap">
          <Logo />
          <nav className="nav" id="nav">
            <div className="nav-head">
              <Logo />
              <button className="nav-close" type="button" aria-label="Close menu" onClick={closeMenu}>
                &times;
              </button>
            </div>
            {booking
              ? BOOKING_LINKS.map(([h, t]) => (
                  <Link key={h} href={h} onClick={closeMenu}>
                    {t}
                  </Link>
                ))
              : SITE_LINKS.map(([h, t]) => (
                  <Link key={h} href={h} className={h === pathname ? "on" : undefined} onClick={closeMenu}>
                    {t}
                  </Link>
                ))}
          </nav>
          {booking ? (
            <div className="hdr-right">
              <a className="phone" href={telHref()}>
                <PhoneIcon /> {BIZ.phone}
              </a>
              <Link className="acct" href="/confirmed">
                <i>
                  <UserIcon />
                </i>
                <span>My Bookings &#8964;</span>
              </Link>
            </div>
          ) : (
            <div className="hdr-right">
              <Link className="btn" href="/book">
                <CalendarIcon size={17} strokeWidth={2} bare />
                Book Now
              </Link>
            </div>
          )}
          <button className="burger" aria-label="Menu" onClick={() => document.body.classList.toggle("menu-open")}>
            &#9776;
          </button>
        </div>
      </header>
      <div className="nav-shade" onClick={closeMenu} />
    </>
  );
}
