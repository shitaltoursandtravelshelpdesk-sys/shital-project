"use client";
/* eslint-disable @next/next/no-img-element -- photos may be missing; <img onError> keeps the old fallback behaviour */

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FLEET, photoSrc } from "./data";

function VehicleCard({ i, onOpen }: { i: number; onOpen: (v: number, k: number) => void }) {
  const v = FLEET[i];
  const [k, setK] = useState(0);
  const idx = Array.from({ length: v.photos }, (_, n) => n);

  return (
    <div className="vc" data-i={i}>
      <div>
        <div className="main" onClick={() => onOpen(i, k)}>
          <img key={k} src={photoSrc(v, k)} alt={`${v.name} photo ${k + 1}`} />
          <span className="lbl">{k + 1} / {v.photos}</span>
        </div>
        <div className="thumbs" style={v.photos < 2 ? { display: "none" } : undefined}>
          {idx.map((n) => (
            <button key={n} type="button" className={n === k ? "on" : ""} onClick={() => setK(n)}>
              <img src={photoSrc(v, n)} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="b">
        <h3>{v.name}</h3>
        <div className="tags">
          {v.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <ul>
          {v.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
        <div className="foot">
          <div className="pr">
            <small>Starting from</small>
            {v.price ? (
              <>
                <b>{v.price}</b> / day
              </>
            ) : (
              <b>On request</b>
            )}
          </div>
          <Link className="btn" href={v.book}>
            Book now &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FleetGallery() {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState<{ v: number; k: number }>({ v: 0, k: 0 });

  const step = useCallback((d: number) => {
    setCur((c) => {
      const n = FLEET[c.v].photos;
      return { ...c, k: (c.k + d + n) % n };
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  const v = FLEET[cur.v];

  return (
    <>
      <div className="vlist" id="vlist">
        {FLEET.map((veh, i) => (
          <VehicleCard
            key={veh.id}
            i={i}
            onOpen={(vi, k) => {
              setCur({ v: vi, k });
              setOpen(true);
            }}
          />
        ))}
      </div>
      <div
        className={open ? "lb on" : "lb"}
        id="lb"
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t === e.currentTarget || t.classList.contains("x")) setOpen(false);
        }}
      >
        <button className="x" type="button" aria-label="Close">
          &times;
        </button>
        <button
          className="pv"
          type="button"
          aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
        >
          &lsaquo;
        </button>
        {open ? <img src={photoSrc(v, cur.k)} alt="" /> : <img alt="" />}
        <button
          className="nx"
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
        >
          &rsaquo;
        </button>
        <div className="cap">{open ? `${v.name} — ${cur.k + 1} / ${v.photos}` : ""}</div>
      </div>
    </>
  );
}
