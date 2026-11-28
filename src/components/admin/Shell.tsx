"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getList, getObj, useDB } from "@/lib/admin/db";
import { NAV } from "./nav";
import { I, Toaster } from "./ui";

export function Shell({ page, children }: { page: string; children: ReactNode }) {
  useDB();
  const [mounted, setMounted] = useState(false), [side, setSide] = useState(false), [menu, setMenu] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const close = () => setMenu(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  const title = NAV.flatMap((g) => g[1]).find((n) => n[0] === page)?.[1] || "My Profile";
  useEffect(() => { document.title = title + " · Shital Admin"; }, [title]);
  if (!mounted) return <div className="ad-layout" />; // data lives in the browser; render after mount

  const count = getList("bookings").filter((x) => x.status === "New").length + getList("enquiries").filter((x) => x.status === "New").length;
  const prof = getObj("profile") || { name: "Admin" };
  return (
    <div className="ad-layout">
      <aside className={`ad-side${side ? " open" : ""}`}>
        <div className="ad-brand"><img src="/images/logo-round.jpg" alt="" /><div><b>Shital Tours<br />&amp; Travels</b><small>Admin Panel</small></div></div>
        <nav>
          {NAV.map(([g, items]) => (
            <div key={g}>
              <div className="ad-grp">{g}</div>
              {items.map(([h, l, ic]) => (
                <Link key={h} href={`/admin/${h}`} className={h === page ? "on" : ""} onClick={() => setSide(false)}><I n={ic} />{l}</Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      {side && <div className="ad-dbg open ad-sidebg" onClick={() => setSide(false)} />}
      <div className="ad-main">
        <header className="ad-top">
          <button className="ad-ibtn ad-burger" onClick={() => setSide(!side)}><I n="bars" /></button>
          <h1>{title}</h1>
          <Link className="ad-ibtn" href="/admin/bookings" title="New requests"><I n="bell" />{count > 0 && <span className="ad-dot">{count}</span>}</Link>
          <a className="ad-ibtn" href="/" target="_blank" title="View website"><I n="arrow-up-right-from-square" /></a>
          <div className="ad-me" onClick={(e) => { e.stopPropagation(); setMenu(!menu); }}>
            <span className="ad-av">{String(prof.name || "A")[0]}</span>
            <span className="ad-nm"><b>{prof.name}</b><br /><span className="ad-role">Super Admin</span></span>
            <div className={`ad-menu${menu ? " open" : ""}`}>
              <Link href="/admin/profile"><I n="user" /> Profile</Link>
              <Link href="/admin/profile"><I n="key" /> Change password</Link>
              <Link href="/admin/login"><I n="right-from-bracket" /> Logout</Link>
            </div>
          </div>
        </header>
        <main className="ad-content">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
